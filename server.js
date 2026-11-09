/* =====================================================================
 *  Barbearia Vintage & Cut · server.js
 *  Servidor Backend em Express integrado à API do Google Gemini
 *  Disciplina: Desenvolvimento Web para IA
 * ===================================================================== */

// =====================================================================
//  server.js — A PONTE ENTRE O FRONT-END E O GEMINI
// ---------------------------------------------------------------------
//  [Navegador / Chat] --fetch--> [ESTE SERVIDOR] --SDK--> [Gemini]
//          ^                          (tem a chave 🔑)          |
//          +----------------- resposta <-----------------------+
// =====================================================================

// ---------------------------------------------------------------------
// 0) IMPORTAÇÕES
// ---------------------------------------------------------------------
import express from "express";                    // Servidor web HTTP
import dotenv from "dotenv";                      // Leitor do arquivo .env
import fs from "fs";                              // Leitor/escritor de arquivos locais
import { GoogleGenAI, Type } from "@google/genai"; // SDK oficial do Gemini
import { PERSONA, CONHECIMENTO, REGRAS } from "./persona.js"; // Persona e regras

// Carrega as variáveis de ambiente do .env
dotenv.config({ quiet: true });

// ---------------------------------------------------------------------
// 1) CONFIGURAÇÕES DO SERVIDOR E MODELO
// ---------------------------------------------------------------------
const PORTA = 3000; // O site abrirá em http://localhost:3000

// Modelo Gemini utilizado
const MODELO = "gemini-3.8-flash";

if (!process.env.GEMINI_API_KEY) {
  console.warn(
    "\n⚠️  GEMINI_API_KEY não encontrada!\n" +
      "   Crie o arquivo .env (na raiz do projeto) com a linha:\n" +
      "   GEMINI_API_KEY=sua_chave_aqui\n"
  );
}

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
const app = express();

app.use(express.json());           // Interpreta requisições com corpo JSON
app.use(express.static("public")); // Entrega os arquivos estáticos da pasta public

// ---------------------------------------------------------------------
// 2) SYSTEM INSTRUCTION (Instrução de Sistema com a Persona)
// ---------------------------------------------------------------------
const INSTRUCAO_DE_SISTEMA = `
Você é ${PERSONA.nome}, atendente virtual da ${PERSONA.empresa} (${PERSONA.ramo}).
Seu objetivo: ${PERSONA.objetivo}.
Seu tom: ${PERSONA.tom}

=== CONHECIMENTO DA EMPRESA ===
${CONHECIMENTO}

=== REGRAS ===
${REGRAS.map((regra, i) => `${i + 1}. ${regra}`).join("\n")}

Escreva em texto simples, limpo e direto, sem tabelas ou formatações excessivas de markdown.
`;

// ---------------------------------------------------------------------
// 3) HISTÓRICO DE CONVERSAS (Memória de curto prazo por sessão)
// ---------------------------------------------------------------------
const historicos = new Map();

function pegarHistorico(sessionId) {
  if (!historicos.has(sessionId)) historicos.set(sessionId, []);
  return historicos.get(sessionId);
}

// ---------------------------------------------------------------------
// 4) FUNCTION CALLING: Ferramenta registrar_pedido
// ---------------------------------------------------------------------
const FERRAMENTAS = [
  {
    name: "registrar_pedido",
    description:
      "Registra uma solicitação de agendamento na barbearia quando o cliente informa nome, telefone/WhatsApp e o serviço desejado com data ou horário.",
    parameters: {
      type: Type.OBJECT,
      properties: {
        nome: { type: Type.STRING, description: "Nome completo do cliente." },
        telefone: { type: Type.STRING, description: "Telefone ou WhatsApp do cliente." },
        pedido: { type: Type.STRING, description: "Serviço solicitado, com data e horário preferencial se informados." },
      },
      required: ["nome", "telefone", "pedido"],
    },
  },
];

const ARQUIVO_PEDIDOS = "pedidos.json";

function executarFerramenta(chamada) {
  if (chamada.name === "registrar_pedido") {
    let pedidos = [];
    try {
      pedidos = JSON.parse(fs.readFileSync(ARQUIVO_PEDIDOS, "utf-8"));
    } catch (e) {
      pedidos = [];
    }

    const novo = { ...chamada.args, dataRegistro: new Date().toLocaleString("pt-BR") };
    pedidos.push(novo);

    try {
      fs.writeFileSync(ARQUIVO_PEDIDOS, JSON.stringify(pedidos, null, 2));
      console.log("✂️ NOVO AGENDAMENTO SALVO:", novo);
    } catch (fsErr) {
      console.warn("⚠️ Aviso: Ambiente sem permissão de escrita em disco (serverless):", fsErr.message);
    }

    return { sucesso: true, numero_do_pedido: pedidos.length };
  }

  return { sucesso: false, aviso: `Ferramenta inexistente: ${chamada.name}` };
}

// ---------------------------------------------------------------------
// 5) ROTA POST /api/chat
// ---------------------------------------------------------------------
app.post("/api/chat", async (req, res) => {
  const { mensagem, sessionId } = req.body;

  if (!mensagem?.trim()) {
    return res.status(400).json({ erro: "Mensagem vazia." });
  }
  if (!process.env.GEMINI_API_KEY) {
    return res.status(500).json({ erro: "A chave do Gemini não está configurada no .env." });
  }

  console.log(`\n💬 Mensagem recebida: "${mensagem}"`);
  console.log(`⏳ Consultando Gemini (${MODELO})...`);

  const historico = pegarHistorico(sessionId || "anonimo");
  const tamanhoAntes = historico.length;
  historico.push({ role: "user", parts: [{ text: mensagem }] });

  try {
    let textoFinal = "";

    // Ciclo de processamento da resposta e possíveis chamadas de ferramentas
    for (let volta = 1; volta <= 3; volta++) {
      const resposta = await ai.models.generateContent({
        model: MODELO,
        contents: historico,
        config: {
          systemInstruction: INSTRUCAO_DE_SISTEMA,
          tools: [{ functionDeclarations: FERRAMENTAS }],
        },
      });

      const conteudo = resposta.candidates?.[0]?.content;
      if (conteudo) historico.push(conteudo);

      const chamadas = resposta.functionCalls;
      if (!chamadas || chamadas.length === 0) {
        textoFinal = resposta.text ?? "";
        break;
      }

      // Executa a ferramenta e devolve o resultado para a IA finalizar a resposta
      const resultados = chamadas.map((chamada) => ({
        functionResponse: {
          id: chamada.id,
          name: chamada.name,
          response: executarFerramenta(chamada),
        },
      }));
      historico.push({ role: "user", parts: resultados });
    }

    console.log(`🤖 Mestre Vicente respondeu:\n   "${textoFinal.substring(0, 80)}..."`);

    return res.json({
      resposta: textoFinal || "Como posso lhe ajudar hoje na Vintage & Cut?",
    });
  } catch (erro) {
    console.error("❌ Erro ao comunicar com o Gemini:", erro);
    historico.length = tamanhoAntes;
    return res.status(500).json({ erro: erro?.message || "Falha ao processar resposta com a IA." });
  }
});

// ---------------------------------------------------------------------
// 6) INICIALIZAÇÃO DO SERVIDOR
// ---------------------------------------------------------------------
const servidor = app.listen(PORTA, () => {
  console.log(`💈 ${PERSONA.empresa} no ar: http://localhost:${PORTA}`);
  console.log(`🤖 Atendente virtual: ${PERSONA.nome}`);
});

export default app;
