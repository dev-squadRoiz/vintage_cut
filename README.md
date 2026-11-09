# 💈 Barbearia Vintage Cut — Plataforma Web & Assistente Inteligente

> Projeto desenvolvido para a **3ª Avaliação (AV3 — Parte 1)** da disciplina de **Desenvolvimento Web para IA**  
> **Curso:** Superior de Tecnologia em Inteligência Artificial — 2º Período, Turno Noite  
> **Instituição:** Faculdade Estadual Piauí — Instituto de Tecnologia (PIT)

---

## 📌 Sumário
- [Sobre o Projeto](#-sobre-o-projeto)
- [Público-Alvo](#-público-alvo)
- [Integrantes do Grupo](#-integrantes-do-grupo)
- [Tecnologias Utilizadas](#-tecnologias-utilizadas)
- [Principais Funcionalidades](#-principais-funcionalidades)
- [Integração com Inteligência Artificial e Persona](#-integração-com-inteligência-artificial-e-persona)
- [Estrutura de Pastas e Arquivos](#-estrutura-de-pastas-e-arquivos)
- [Instruções de Instalação e Execução](#-instruções-de-instalação-e-execução)
- [Histórico de Commits e Colaboração](#-histórico-de-commits-e-colaboração)
- [Licença](#-licença)

---

## 📖 Sobre o Projeto

A **Vintage Cut** é uma plataforma web moderna e responsiva voltada para uma barbearia premium, combinando agendamento de serviços, apresentação e venda de produtos físicos de estética e cuidados masculinos (pomadas modeladoras, óleos para barba, shampoos especiais e kits de barbear).

O sistema conta com identidade visual clássica e elegante, navegação fluida em seção única (landing page estruturada), catálogo de produtos/serviços construído com cards modernos e um **assistente virtual inteligente integrado via API**, capaz de tirar dúvidas, indicar os melhores produtos para cada tipo de cabelo/barba e auxiliar no agendamento.

---

## 🎯 Público-Alvo

- Homens  que valorizam o autocuidado, estilo e estética da barba e do cabelo;
- Clientes que buscam praticidade para conhecer e adquirir produtos para cuidados em casa;
- Usuários que desejam recomendações personalizadas de cortes, barba e cosméticos através de um consultor interativo.

---

## 👥 Integrantes do Grupo

JOSÉ GUSTAVO 
ISAAC BARBOSA
ROGÉRIO DO MONTE
---

## 🛠️ Tecnologias Utilizadas

- **HTML5 Semântico:** Estruturação acessível com cabeçalho (`<header>`), seções temáticas (`<section>`), formulários e rodapé (`<footer>`).
- **CSS3 Moderno:**
  - Layout flexível e responsivo utilizando **CSS Grid** e **Flexbox**;
  - Media queries para adaptação completa a dispositivos móveis, tablets e desktops;
  - Variáveis CSS para padronização de paleta de cores, tipografia e espaçamentos.
- **JavaScript (ES6+):** Manipulação dinâmica do DOM, validação de formulário, animações de scroll e requisições assíncronas (`fetch`).
- **Inteligência Artificial (LLM API):** Integração com a API do **Google Gemini** (ou OpenAI GPT) para o chatbot interativo.

---

## ⚙️ Principais Funcionalidades

1. **Navegação Funcional e Completa (4+ Menus):**
   - **Início:** Banner principal com chamada para ação (CTA) e identidade visual.
   - **Sobre Nós:** História da barbearia, ambiente e proposta de valor.
   - **Produtos & Serviços:** Catálogo em cards responsivos (`display: grid`/`flex`) exibindo cortes, barboterapia e produtos físicos à venda (com preços, fotos e descrições).
   - **Contato & Agendamento:** Formulário com validação de dados para contato, reservas e pedidos.
2. **Design Responsivo & Acessível:** Layout otimizado para celulares, tablets e computadores, com transições suaves e contraste visual adequado.
3. **Formulário Interativo:** Campos para nome, e-mail, telefone, serviço/produto desejado e mensagem.
4. **Chatbot com Persona Especializada:** Janela flutuante de atendimento em tempo real.

---

## 🤖 Integração com Inteligência Artificial e Persona

### Persona da IA: *"Mestre Navalha"*
- **Nome:** Mestre Navalha (Consultor e Barbeiro Virtual da Vintage Cut)
- **Papel:** Especialista em visagismo masculino, cortes clássicos e contemporâneos, tratamento de pele e produtos para barba.
- **Tom de Voz:** Cordial, profissional, descontraído e focado na experiência do cliente.
- **Diretrizes e Regras de Contexto (System Prompt):**
  - Auxilia nas dúvidas sobre os produtos (ex: diferença entre pomada matte e efeito brilho, óleos para hidratação);
  - Sugere estilos e cuidados de acordo com a preferência informada pelo usuário;
  - Explica os serviços oferecidos e orienta o cliente a preencher o formulário para agendar seu horário;
  - **Foco estrito no tema:** Caso o usuário pergunte sobre assuntos alheios à barbearia, produtos ou estilo masculino, a IA redireciona gentilmente a conversa para os serviços e produtos da Vintage Cut.

### Detalhes Técnicos da Conexão
- Chamadas assíncronas via `fetch` para os endpoints da API de IA (`Gemini 1.5 Flash` ou similar);
- Histórico de mensagens mantido em memória durante a sessão para diálogo contextualizado;
- Tratamento de erros e feedback visual de carregamento (indicador "digitando...").

---

## 📂 Estrutura de Pastas e Arquivos

```plaintext
vintage_cut/
├── index.html              # Página principal (estrutura semântica do site)
├── README.md               # Documentação técnica e acadêmica do projeto
│
├── css/
│   ├── style.css           # Estilos globais, reset e layout principal
│   └── responsive.css      # Regras de responsividade e media queries
│
├── js/
│   ├── main.js             # Lógica de navegação, scroll e validação do formulário
│   └── chatbot.js          # Lógica do chatbot e integração com a API de IA
│
└── assets/
    ├── img/                # Logomarca, fotos dos produtos e cortes
    └── icons/              # Ícones decorativos e redes sociais
```

---

## 🚀 Instruções de Instalação e Execução

### Pré-requisitos
- Um navegador web atualizado (Google Chrome, Mozilla Firefox, Microsoft Edge, etc.);
- Extensão **Live Server** no VS Code (ou servidor local simples com Python/Node.js);
- Chave de API de IA válida (ex: [Google AI Studio](https://aistudio.google.com/)).

### Passo a Passo

1. **Clonar o Repositório:**
   ```bash
   git clone https://github.com/[seu-usuario]/[seu-repositorio].git
   ```

2. **Acessar a Pasta do Projeto:**
   ```bash
   cd vintage_cut
   ```

3. **Configurar a Chave da API:**
   Abra o arquivo `js/chatbot.js` e insira sua chave no local indicado:
   ```javascript
   const API_KEY = "SUA_CHAVE_AQUI";
   ```
   *(Recomenda-se não expor chaves sensíveis publicamente em repositórios abertos).*

4. **Executar o Projeto:**
   - **Opção A (VS Code):** Clique com o botão direito no arquivo `index.html` e selecione **"Open with Live Server"**.
   - **Opção B (Python):**
     ```bash
     python -m http.server 3000
     ```
     Acesse no navegador: `http://localhost:3000`

---

## 📈 Histórico de Commits e Colaboração

O repositório foi construído de forma colaborativa pelo trio ao longo do período de desenvolvimento, garantindo:
- Commits distribuídos e bem documentados;
- Divisão equilibrada de tarefas entre HTML semântico, estilização com CSS/Flexbox/Grid, formulários, integração com API e elaboração da persona da IA;
- Histórico transparente de versionamento conforme as orientações da AV3.

---

## 📄 Licença

Este projeto foi desenvolvido estritamente para fins educacionais como parte da avaliação da disciplina de **Desenvolvimento Web para IA** da **Faculdade Estadual Piauí — PIT**.
