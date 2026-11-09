# 💈 Barbearia Vintage & Cut — Sistema Web com Assistente de IA

> **3ª Avaliação (AV3 — Parte 1): Projeto e Entrega do Código**  
> **Disciplina:** Desenvolvimento Web para IA  
> **Curso:** Superior de Tecnologia em Inteligência Artificial — 2º Período, Turno Noite  
> **Instituição:** Faculdade Estadual Piauí — Instituto de Tecnologia (PIT)  
> **Prazo:** 08/11/2026 até às 23h59

---

## 📌 Sumário
1. [Sobre o Projeto](#-sobre-o-projeto)
2. [Público-Alvo](#-público-alvo)
3. [Integrantes do Grupo](#-integrantes-do-grupo)
4. [Tecnologias Utilizadas](#-tecnologias-utilizadas)
5. [Estrutura do Projeto](#-estrutura-do-projeto)
6. [Principais Funcionalidades](#-principais-funcionalidades)
7. [Integração com Inteligência Artificial (Gemini)](#-integração-com-inteligência-artificial-gemini)
   - [A Persona: Mestre Vicente](#a-persona-mestre-vicente)
   - [Regras de Comportamento e Guardrails](#regras-de-comportamento-e-guardrails)
   - [Chamada de Ferramenta (Function Calling)](#chamada-de-ferramenta-function-calling)
8. [Instruções de Instalação e Execução](#-instruções-de-instalação-e-execução)
9. [Deploy na Vercel](#-deploy-na-vercel)
10. [Histórico de Commits e Controle de Versão](#-histórico-de-commits-e-controle-de-versão)
11. [Licença e Observações Acadêmicas](#-licença-e-observações-acadêmicas)

---

## 📖 Sobre o Projeto

A **Barbearia Vintage & Cut** é uma aplicação web completa desenvolvida com foco na apresentação e contratação de serviços de estética e cuidados masculinos (cortes clássicos, visagismo, barboterapia com toalha quente e pigmentação). 

O projeto une as melhores práticas de **desenvolvimento front-end responsivo** com um **backend moderno em Node.js/Express**, integrando diretamente o modelo de inteligência artificial de última geração **Google Gemini (gemini-3.8-flash)**. Através do atendente virtual com persona própria — o **Mestre Vicente** —, o visitante pode tirar dúvidas sobre serviços, horários, valores e até mesmo solicitar agendamentos de forma natural, que são persistidos no sistema via *Function Calling*.

---

## 🎯 Público-Alvo

- Homens que valorizam o autocuidado, elegância e a tradição das barbearias clássicas;
- Clientes que buscam praticidade para consultar tabela de preços, serviços e horários sem filas;
- Usuários que preferem atendimento interativo, com recomendações personalizadas de estilo e facilidade para agendamento direto pelo chat ou formulário web integrado ao WhatsApp.

---

## 👥 Integrantes do Grupo

| Avatar | Nome Completo | Matrícula | Perfil GitHub |
| :---: | :--- | :---: | :---: |
| 👨‍💻 | Isaac Silva | `[Matrícula]` | [@cybercerberox](https://github.com/cybercerberox) |
| 👨‍💻 | Rogério do Monte | `[Matrícula]` | [@Rogério206](https://github.com/Rogério206) |
| 👨‍💻 | José Gustavo | `[Matrícula]` | [@gt](https://github.com/gt) |

---

## 🛠️ Tecnologias Utilizadas

### Front-end
- **HTML5 Semântico:** Estruturação em seções com cabeçalho fixo, top bar de status, galeria de cards, área de agendamento e rodapé completo.
- **CSS3 Moderno:** Layout responsivo construído com **CSS Grid** e **Flexbox**, paleta de cores clássica/vintage, tipografia refinada (*Oswald* e *Poppins* via Google Fonts) e ícones via FontAwesome 6.
- **JavaScript Moderno (ES6+ Client-side):** Lógica assíncrona com `fetch` para comunicação com o backend, verificação automática de horário de funcionamento em tempo real, preenchimento dinâmico de serviços no formulário e widget de chat interativo.

### Back-end & Inteligência Artificial
- **Node.js (ES Modules):** Ambiente de execução Javascript assíncrono.
- **Express.js (v5.3.0):** Servidor HTTP para entrega dos arquivos estáticos e disponibilização do endpoint de conversação (`POST /api/chat`).
- **Google Gen AI SDK (`@google/genai` v2.28.0):** SDK oficial para integração de alto desempenho com os modelos Gemini.
- **Google Gemini 3.8 Flash:** Modelo de linguagem rápida e precisa, configurado com instruções de sistema estritas e chamada de funções (*Function Calling*).
- **Dotenv (v18.0.0):** Gerenciamento seguro de variáveis de ambiente (`.env`).
- **Persistência de Dados (JSON / FS):** Armazenamento estruturado de solicitações e reservas no arquivo `pedidos.json`.

---

## 📂 Estrutura do Projeto

```plaintext
vintage_cut/
│
├── .env                      # Chaves e variáveis de ambiente (GEMINI_API_KEY)
├── .gitignore                # Arquivos ignorados pelo Git (node_modules, .env, etc.)
├── package.json              # Metadados, dependências e scripts do projeto
├── persona.js                # Ficha de contratação, tom, conhecimento e guardrails da IA
├── server.js                 # Servidor Express, rota da API e integração com Gemini SDK
├── vercel.json               # Configuração oficial da Vercel para Node Express
├── pedidos.json              # Base de dados JSON de agendamentos gerados via Function Calling
│
├── public/                   # Arquivos públicos entregues pelo servidor Express
│   ├── index.html            # Estrutura HTML5 com menus, cards, formulário e modal
│   ├── style.css             # Estilização completa, Grid, Flexbox e media queries
│   └── script.js             # Lógica front-end, comunicação com API e manipulação do DOM
│
└── README.md                 # Documentação técnica completa da avaliação
```

---

## ⚙️ Principais Funcionalidades

1. **Top Bar Dinâmica com Status em Tempo Real:**
   - Detecta automaticamente o dia e a hora local do cliente, informando visualmente com badge colorido se a barbearia está aberta ou fechada no momento.
2. **Navegação Funcional Completa (5 Menus):**
   - **Início (`#home`):** Hero section com chamada de ação e visual clássico.
   - **Sobre (`#sobre`):** Apresentação da tradição da barbearia, biossegurança e diferenciais em cards.
   - **Serviços (`#servicos`):** Cards responsivos (`display: grid`) contendo ícones, descrições, preços e botão de seleção rápida com preenchimento automático.
   - **Agendamento (`#agendamento`):** Formulário interativo com seleção de data, horários comerciais, serviço e observações, com modal de resumo e envio direto para WhatsApp.
   - **Contato (`#contato`):** Rodapé informativo com horários de funcionamento, canais de comunicação, redes sociais e localização em Teresina - PI.
3. **Cards com CSS Grid / Flexbox:**
   - Destaque especial para o serviço mais pedido (*Combo Master Vintage*), com badge visual de coroa e borda iluminada.
4. **Modal de Confirmação:**
   - Ao enviar o formulário, exibe uma janela modal acessível com o resumo da reserva e opção para notificar a equipe via link dinâmico da API do WhatsApp.
5. **Widget de Chatbot Flutuante:**
   - Botão retrátil com animação de tesoura, janela de conversa, histórico mantido na sessão e indicador de respostas em tempo real.

---

## 🤖 Integração com Inteligência Artificial (Gemini)

### A Persona: Mestre Vicente
O atendente virtual não é um chatbot genérico, possuindo perfil e identidade altamente alinhados ao conceito da barbearia:
- **Nome:** Mestre Vicente
- **Empresa:** Barbearia Vintage & Cut (fundada em 2018)
- **Ramo:** Barbearia clássica tradicional masculina e barboterapia
- **Tom de Voz:** Elegante, clássico, acolhedor e atencioso. Trata cordialmente o cliente como *"cavalheiro"* ou *"meu caro"*, emitindo respostas objetivas de até 3 ou 4 frases.

### Regras de Comportamento e Guardrails
O arquivo [`persona.js`](persona.js) atua como a diretriz de sistema (*System Instruction*) do modelo, impondo limites rígidos:
1. **Base de Conhecimento Estrita:** O assistente responde apenas sobre os serviços, preços e horários cadastrados (ex: Corte Masculino a R$ 45, Barboterapia a R$ 35, Combo Master a R$ 70, Pigmentação a R$ 30).
2. **Sem Fuga de Contexto:** Caso o usuário pergunte sobre política, esportes, religião ou programação, o Mestre Vicente redireciona a conversa com polidez de volta à barbearia.
3. **Respeito aos Horários de Funcionamento:** Informa que a barbearia não abre aos domingos e feriados, recusando educadamente agendamentos nessas datas.

### Chamada de Ferramenta (Function Calling)
O backend implementa a ferramenta `registrar_pedido` por meio das capacidades nativas de Tools do SDK do Gemini:
- Quando o usuário expressa o desejo de agendar pelo próprio chat e informa nome, telefone/WhatsApp e horário, a IA aciona a função `registrar_pedido`.
- O servidor intercepta os argumentos da ferramenta, adiciona o carimbo de data/hora atual e salva o agendamento em [`pedidos.json`](pedidos.json).
- Em seguida, devolve o resultado para a IA confirmar o sucesso do agendamento de forma humanizada.

---

## 🚀 Instruções de Instalação e Execução

### Pré-requisitos
- **Node.js** (versão 18.x ou superior recomendada);
- Gerenciador de pacotes **npm** (incluso com o Node.js);
- Chave de API do **Google Gemini** ([Google AI Studio](https://aistudio.google.com/)).

### Passo a Passo

1. **Clonar o Repositório do GitHub:**
   ```bash
   git clone https://github.com/dev-squadRoiz/vintage_cut.git
   cd vintage_cut
   ```

2. **Instalar as Dependências:**
   ```bash
   npm install
   ```

3. **Configurar as Variáveis de Ambiente:**
   Crie um arquivo `.env` na raiz do projeto (caso não exista) e adicione sua chave de API:
   ```env
   GEMINI_API_KEY=sua_chave_do_google_gemini_aqui
   ```

4. **Iniciar o Servidor:**
   ```bash
   npm start
   ```

5. **Acessar a Aplicação:**
   Abra seu navegador em: `http://localhost:3000`

---

## ☁️ Deploy na Vercel

1. Certifique-se de que o repositório no GitHub está atualizado:
   ```bash
   git add .
   git commit -m "fix: Correcao do vercel.json e atualizacao do README"
   git push origin main
   ```
2. No painel da [Vercel](https://vercel.com), acesse o projeto.
3. Vá em **Settings** > **Environment Variables** e adicione:
   - **Key:** `GEMINI_API_KEY`
   - **Value:** Cole sua chave da API do Gemini.
4. Vá em **Deployments** e faça o **Redeploy**.

---

## 📈 Histórico de Commits e Controle de Versão

Conforme exigido nas diretrizes da AV3:
- O desenvolvimento do repositório foi distribuído entre os 3 integrantes do grupo (**Isaac Silva**, **Rogério do Monte**, **José Gustavo**).
- Os commits refletem contribuições nas etapas de criação da estrutura HTML/CSS, estilização responsiva, criação da persona e regras da IA, desenvolvimento do backend em Express e integração do chat via API com Function Calling.
- Mensagens de commit padronizadas e claras para facilitar o rastreamento individual pelo corpo docente.

---

## 📄 Licença e Observações Acadêmicas

Projeto desenvolvido para fins educacionais e de avaliação acadêmica para a disciplina de **Desenvolvimento Web para IA** do **Instituto de Tecnologia – PIT (Faculdade Estadual Piauí)**.
