# 💈 Barbearia Vintage & Cut — Assistente Virtual com IA

Projeto de Landing Page e Sistema de Atendimento Inteligente para a **Barbearia Vintage & Cut**, desenvolvido para a disciplina de **Desenvolvimento Web para IA**. O sistema conta com integração oficial à API do **Google Gemini** através de um backend Node.js seguro, provendo um atendente virtual com persona própria (**Mestre Vicente**), base de conhecimento fundamentada e guardrails estritos.

---

## ✂️ Sobre o Projeto

A **Vintage & Cut** é uma barbearia com foco na tradição e sofisticação do cuidado masculino clássico (visagismo, navalhas afiadas, toalhas quentes e barboterapia). 

O objetivo da solução é aliar a experiência visual clássica à conveniência moderna:
1. **Landing Page Responsiva:** Apresentação da barbearia, catálogo de serviços e horários.
2. **Formulário de Agendamento:** Reserva direta com cálculo de data mínima, máscara telefônica e integração com WhatsApp.
3. **Assistente Virtual de IA (Mestre Vicente):** Atendimento humanizado em tempo real para tirar dúvidas sobre serviços, valores, horários e orientar o cliente no agendamento.

---

## 🤖 A Persona: Mestre Vicente

Diferente de chatbots genéricos baseados em regras rígidas de *if/else*, o assistente possui uma identidade contextualizada:

* **Nome:** Mestre Vicente
* **Perfil:** Barbeiro sênior experiente, tradicional, acolhedor e educado. Trata cordialmente o cliente como *"cavalheiro"* ou *"meu caro"*.
* **Objetivo:** Esclarecer dúvidas sobre serviços, cortes, barboterapia e guiar o cliente até a reserva de horário.
* **Grounding (Base de Conhecimento):** Conhece com precisão a tabela de serviços da barbearia:
  * *Corte Masculino Clássico* (R$ 45,00)
  * *Barboterapia Completa* (R$ 35,00)
  * *Combo Master Vintage* (R$ 70,00)
  * *Pigmentação & Camuflagem* (R$ 30,00)
  * Horários (Seg a Sáb, 09h às 20h; Domingos fechado) e endereço em Teresina - PI.
* **Guardrails (Limites Éticos e de Nicho):**
  * A IA só responde sobre o escopo da barbearia. Perguntas sobre futebol, política ou outros temas são gentilmente redirecionadas.
  * Não inventa preços nem serviços inexistentes.
  * Alerta educadamente que a barbearia não abre aos domingos ou feriados.

---

## 🏛️ Arquitetura do Sistema e Conceitos Implementados

```
[ Navegador (Cliente) ]
       │
       │ fetch('/api/chat', POST)
       ▼
[ Servidor Express (server.js) ] ──── lê ────► [ persona.js ] (Persona + Conhecimento + Regras)
       │                                     [ .env ]       (Chave secreta GEMINI_API_KEY)
       │ SDK @google/genai
       ▼
[ Google Gemini API (gemini-3.8-flash) ]
       │
       ▼ (Se houver intenção de agendar)
[ Function Calling: registrar_pedido ] ──► Salva em [ pedidos.json ]
```

### Principais Conceitos Aplicados:
1. **Arquitetura Cliente-Servidor & Segurança:** A chave `GEMINI_API_KEY` nunca é exposta no navegador do usuário. Todas as requisições passam pelo backend Express via variáveis de ambiente (`dotenv`).
2. **Engenharia de Prompt (System Instruction):** A persona, as regras e o conhecimento são organizados de forma modular em `persona.js` e injetados na chamada do Gemini.
3. **Memória de Sessão (Context Window):** O cliente gera um `sessionId` único que permite ao modelo lembrar o contexto anterior do diálogo durante a conversa.
4. **Chamada de Ferramentas (Function Calling):** Caso o cliente solicite agendamento informando seus dados, o Gemini aciona a função `registrar_pedido`, gravando a solicitação na base.

---

## 🛠️ Tecnologias Utilizadas

* **Front-end:** HTML5 semântico, CSS3 com variáveis personalizadas, JavaScript Moderno (ES6+), Font Awesome e Google Fonts.
* **Back-end:** Node.js, Express.js.
* **Inteligência Artificial:** SDK Oficial `@google/genai` (Modelo `gemini-3.8-flash`).
* **Segurança e Variáveis:** `dotenv`.

---

## 📂 Estrutura de Pastas

```text
├── public/                 # Arquivos públicos entregues pelo servidor
│   ├── index.html          # Interface principal e widget do chat
│   ├── script.js           # Lógica do site e comunicação via fetch()
│   └── style.css           # Estilos e paleta vintage (preto e dourado)
│
├── .env.exemplo            # Modelo de configuração da chave de API
├── .gitignore              # Ignora node_modules, .env e pedidos.json
├── package.json            # Metadados e dependências do projeto
├── persona.js              # Persona, Base de Conhecimento e Regras
├── server.js               # Servidor Express com rota /api/chat e Gemini
└── vercel.json             # Configuração de rotas para deploy na Vercel
```

---

## 🚀 Como Executar Localmente

### Pré-requisitos
* [Node.js](https://nodejs.org/) instalado (versão 18 ou superior).
* Chave gratuita da API do Gemini gerada no [Google AI Studio](https://aistudio.google.com/).

### Passo a Passo

1. **Clone o repositório:**
   ```bash
   git clone https://github.com/dev-squadRoiz/vintage_cut.git
   cd vintage_cut
   ```

2. **Instale as dependências:**
   ```bash
   npm install
   ```

3. **Configure as Variáveis de Ambiente:**
   Crie um arquivo `.env` na raiz do projeto com o seguinte conteúdo:
   ```env
   GEMINI_API_KEY=sua_chave_do_google_aqui
   ```

4. **Inicie o servidor:**
   ```bash
   node server.js
   # ou: npm start
   ```

5. **Acesse a aplicação:**
   Abra seu navegador em: **`http://localhost:3000`**

---

## ☁️ Como Fazer o Deploy na Vercel

1. Suba o projeto atualizado para o seu repositório no GitHub:
   ```bash
   git add .
   git commit -m "feat: Integracao de IA com Persona Mestre Vicente e configuracao Vercel"
   git push origin main
   ```
2. Acesse [vercel.com](https://vercel.com/) e conecte com o GitHub.
3. Importe o repositório `vintage_cut`.
4. **MUITO IMPORTANTE:** Na etapa de configuração do projeto na Vercel, abra a seção **Environment Variables** e adicione:
   * **Key:** `GEMINI_API_KEY`
   * **Value:** *(Cole aqui a sua chave do Google AI Studio)*
5. Clique em **Deploy**. A Vercel utilizará o arquivo `vercel.json` para rotear o front-end e o back-end automaticamente!

---

## 👥 Equipe / Autores

* **Projeto:** Barbearia Vintage & Cut
* **Curso:** Desenvolvimento Web para IA
