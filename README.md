# FURIA CS Fans Bot

Este é um bot para o **Telegram** dedicado aos fãs da **FURIA** no cenário de **Counter-Strike (CS)**. O bot permite acompanhar o lineup oficial, consultar resultados recentes, visualizar estatísticas de jogadores, conferir rankings atualizados e acessar as últimas notícias do time de maneira interativa e fácil de usar diretamente no chat.

---

## 📋 Funcionalidades

O bot oferece uma série de funcionalidades interativas para os fãs da FURIA:

1. **Line-up Oficial da FURIA**: Consulte a formação atual da equipe, incluindo jogadores titulares, reservas e coaches.
2. **Informações do Time**: Obtenha informações detalhadas sobre a FURIA Esports, incluindo o ranking atual, país, Instagram e dados sobre os jogadores.
3. **Últimas Notícias**: Receba as últimas atualizações sobre a FURIA e o cenário do CS.
4. **Resultados Recentes**: Veja os resultados mais recentes das partidas da FURIA no CS.
5. **WhatsApp FURIA**: Acesse o assistente virtual da FURIA via WhatsApp para mais informações e interações.

---

## 🚀 Como Usar

### 🧑‍💻 Iniciando o Bot

1. **Comando `/start`**: Quando você iniciar o bot no Telegram, o comando `/start` enviará uma mensagem de boas-vindas com informações sobre o bot e opções de interação.

2. **Comandos Interativos**:

   * **📋 Line-up**: Veja a formação atual da equipe FURIA, incluindo jogadores titulares, reservas e coach.
   * **🧠 Sobre a FURIA**: Conheça a FURIA Esports, sua história e principais informações.
   * **📊 Resultados**: Veja os últimos resultados da FURIA nas competições de CS.
   * **🤖 WhatsApp FURIA**: Fale diretamente com o assistente virtual da FURIA via WhatsApp.
   * **🏅 Info do Time**: Receba dados detalhados sobre o time FURIA, incluindo o ranking, país e mais.
   * **📰 Últimas Notícias**: Confira as últimas notícias da FURIA no cenário de CS.

3. **Outros Comandos**:

   * O bot também aceita comandos por barra como `/start`,`/lineup`, `/sobre`, `/resultados`, `/whatsapp`, `/infotime`, `/noticias` para obter as mesmas informações diretamente.

---

## 💻 Tecnologias Usadas

O bot foi desenvolvido com as seguintes tecnologias e bibliotecas:

* **Node.js**: Plataforma para execução do código JavaScript no backend.
* **node-fetch**: Biblioteca para realizar requisições HTTP.
* **cheerio**: Utilizada para scraping de dados de páginas HTML.
* **node-telegram-bot-api**: Biblioteca para integração com a API do Telegram e envio de mensagens.
* **HLTV API**: Usada para acessar estatísticas e informações do time FURIA no CS.
* **dotenv**: Gerencia variáveis de ambiente para o bot, como o token do Telegram.

---

## ⚙️ Configuração

O bot já está configurado e pronto para uso. Não é necessário criar um token ou configurar variáveis de ambiente.

### Deploy no Railway

O bot já está em produção e rodando no [Railway](https://railway.app/), uma plataforma de deploy simplificada. A seguir, explico brevemente como o deploy foi realizado para que você entenda o processo:

1. **Conta Railway**: O deploy foi realizado em uma conta do Railway. Se quiser replicar, basta criar uma conta e vincular seu repositório no GitHub.
2. **Configuração de Variáveis de Ambiente**: O token do bot foi configurado como uma variável de ambiente no painel do Railway. Isso permite que o bot funcione sem necessidade de configuração manual pelo usuário.
3. **Hospedagem Automática**: Uma vez o projeto criado, o Railway cuida de todo o processo de build e deploy. O bot agora está funcionando de forma contínua.

### Deploy do Front-end via GitHub Pages

O front-end do projeto foi hospedado no **GitHub Pages**. O processo de deploy foi feito diretamente a partir do repositório do GitHub, e o front-end agora pode ser acessado diretamente pela URL gerada pelo GitHub Pages.

* **GitHub Pages**: Através da funcionalidade de páginas estáticas do GitHub, o código do front-end foi publicado automaticamente e está acessível através do link gerado na aba de *Pages* do repositório.

O deploy do front-end é 100% gratuito e pode ser acessado a qualquer momento, sem a necessidade de configurar servidores ou outros serviços.

---

## 📝 Como foi o Processo de Criação

A seguir, compartilho um resumo do meu processo de criação e deploy do bot e do front-end.

1. **Criação do Bot**:

   * A primeira etapa foi criar um bot no Telegram usando o [BotFather](https://telegram.me/BotFather).
   * Após a criação do bot, usei a biblioteca **node-telegram-bot-api** para facilitar a comunicação com a API do Telegram.
   * A partir disso, implementei funções para coletar dados sobre o time FURIA, como lineup, estatísticas de jogadores e resultados de jogos, utilizando a API do **HLTV** e fazendo scraping de páginas HTML com **cheerio**.

2. **Desenvolvimento e Deploy**:

   * O bot foi desenvolvido em **Node.js** e configurado com variáveis de ambiente, como o token do bot.
   * Para o deploy do backend, usei o **Railway**, que permite um processo de deploy simples e sem necessidade de configuração adicional do servidor.
   * A interface do bot foi projetada de forma que o usuário pode interagir diretamente com os comandos via Telegram, utilizando botões e mensagens automáticas.

3. **Deploy do Front-end**:

   * O front-end foi desenvolvido para ser uma interface simples e acessível, hospedada gratuitamente no **GitHub Pages**.
   * O código está disponível no repositório do GitHub, onde o deploy é feito automaticamente sempre que há atualizações no código.

---

## 🚀 Próximos Passos

Este projeto tem grande potencial para ser expandido, com mais funcionalidades e integrações, tais como:

* **Adicionar mais funcionalidades de estatísticas**: Integrar com outras fontes de dados para estatísticas mais detalhadas.
* **Notificações em tempo real**: Adicionar notificações para eventos ao vivo, como resultados de jogos.
* **Suporte a outros jogos**: Expandir o bot para suportar outros jogos que a FURIA compete, como **Valorant**, **LoL**, etc.

---

## 📞 Contato

Para dúvidas ou sugestões, entre em contato comigo [thialymedeiros@gmail.com](mailto:thialymedeiros@gmail.com).

---

## 📄 Licença

Este projeto está licenciado sob a [MIT License](LICENSE).

---

**Obrigado por usar o FURIA CS Fans Bot!** 🚀🐈‍⬛

---
