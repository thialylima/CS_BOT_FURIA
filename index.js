import fetch from "node-fetch";
import * as cheerio from "cheerio";
import TelegramBot from "node-telegram-bot-api";
import { HLTV } from "hltv";
import "dotenv/config";

const bot = new TelegramBot(process.env.BOT_TOKEN, { polling: true });

const url = "https://draft5.gg/equipe/330-FURIA";

async function getLineup() {
  const res = await fetch(url);
  const html = await res.text();
  const $ = cheerio.load(html);

  const lineupData = {
    titulares: [],
    reservas: [],
    coach: [],
  };

  function extractPlayers($container) {
    const players = [];
    $container
      .find(".PlayerCard__PlayerCardContainer-sc-1u0zx4y-0")
      .each((_, el) => {
        const name = $(el)
          .find(".PlayerCard__PlayerNickName-sc-1u0zx4y-4")
          .text()
          .trim();
        const flag = $(el).find("img").attr("alt") || "";
        if (name) players.push({ name, flag });
      });
    return players;
  }

  $("h2").each((_, el) => {
    const title = $(el).text().trim().toLowerCase();
    const $section = $(el).next();

    if (title.includes("titular")) {
      lineupData.titulares = extractPlayers($section);
    } else if (title.includes("reserva")) {
      lineupData.reservas = extractPlayers($section);
    } else if (title.includes("coach")) {
      lineupData.coach = extractPlayers($section);
    }
  });

  let out = "🧩 *Titulares:*\n";
  out +=
    lineupData.titulares.map((p) => `👤 ${p.name} (${p.flag})`).join("\n") ||
    "_Nenhum_";

  out += "\n\n🪑 *Reservas:*\n";
  out +=
    lineupData.reservas.map((p) => `👤 ${p.name} (${p.flag})`).join("\n") ||
    "_Nenhum_";

  out += "\n\n🎓 *Coach(es):*\n";
  out +=
    lineupData.coach.map((p) => `👤 ${p.name} (${p.flag})`).join("\n") ||
    "_Nenhum_";

  return out;
}

async function getTeamInfo() {
  try {
    const team = await HLTV.getTeam({ id: 8297 }); // ID fixo pra FURIA

    let message = `🐈‍⬛ *Informações do time FURIA* 🖤\n\n`;
    message += `🏆 *Rank:* ${team.rank || "N/A"}\n`;
    message += `🌍 *País:* ${team.country.name} (${team.country.code})\n`;
    message += `📸 *Instagram:* ${team.instagram || "Não disponível"}\n`;
    message += `\n👥 *Jogadores:*\n`;

    team.players.forEach((player) => {
      message += `👤 *${player.name}* (${player.type})\n`;
      message += `⏰ Tempo no time: ${player.timeOnTeam}\n`;
      message += `🗺️ Maps jogados: ${player.mapsPlayed}\n\n`;
    });

    return message;
  } catch (error) {
    console.error("Erro ao buscar informações do time:", error);
    return "❌ Ocorreu um erro ao buscar as informações do time.";
  }
}

async function getLatestNews() {
  try {
    const team = await HLTV.getTeam({ id: 8297 }); // ID fixo pra FURIA

    if (!team.news || team.news.length === 0) {
      return "❌ Nenhuma notícia recente encontrada.";
    }

    const latestNews = team.news.slice(0, 4); // Pega as 4 primeiras

    let message = `📰 *Últimas notícias da FURIA no CS:*\n\n`;

    latestNews.forEach((item, index) => {
      message += `*${index + 1}. ${item.name}*\n`;
      message += `🔗 [Ler notícia](https://www.hltv.org${item.link})\n\n`;
    });

    return message;
  } catch (error) {
    console.error("Erro ao buscar as últimas notícias:", error);
    return "❌ Ocorreu um erro ao buscar as últimas notícias.";
  }
}

// START com teclado interativo
bot.onText(/\/start/, (msg) => {
  const welcome = `🔥 *SEJA BEM-VINDO(A) AO BOT DA FURIA!* 🐈‍⬛🖤

Você pode usar os botões abaixo *ou* comandos por barra como:

/start = Ver a lista de comandos novamente e entender como interagir com o bot.
/lineup = Consultar o line-up atual da equipe FURIA (jogadores titulares, reservas e coach).
/sobre = Obter informações gerais sobre a FURIA Esports.
/resultados = Ver os resultados mais recentes dos jogos da FURIA no CS.
/whatsapp = Falar diretamente com o assistente virtual da FURIA via WhatsApp.
/infotime = Receber informações detalhadas sobre a equipe FURIA.
/noticias = Ficar por dentro das últimas notícias sobre a FURIA e o cenário do CS.`;

  bot.sendMessage(msg.chat.id, welcome, {
    parse_mode: "Markdown",
    reply_markup: {
      keyboard: [
        ["📋 Line-up", "🧠 Sobre a FURIA"],
        ["📊 Resultados", "🤖 WhatsApp FURIA"],
        ["🏅 Info do Time", "📰 Últimas Notícias"],
      ],
      resize_keyboard: true,
      one_time_keyboard: false,
    },
  });
});

// Resposta aos botões
bot.on("message", async (msg) => {
  const text = msg.text.trim().toLowerCase();
  const chatId = msg.chat.id;

  if (text === "📋 line-up" || text === "/lineup") {
    const lineupText = await getLineup();
    bot.sendMessage(chatId, `📋 *Line-up atual da FURIA:*\n\n${lineupText}`, {
      parse_mode: "Markdown",
    });
  } else if (text === "🧠 sobre a furia" || text === "/sobre") {
    const info = `🐈‍⬛🖤 *FURIA Esports*

🌍 Local: São Paulo, Brasil  
📆 Fundada em: 2017  
🎯 Compete em: CS:GO, Valorant, Rocket League, LoL e mais.  
🌐 Site: https://furia.gg`;
    bot.sendMessage(chatId, info, { parse_mode: "Markdown" });
  } else if (text === "📊 resultados" || text === "/resultados") {
    const urlResultados = "https://draft5.gg/equipe/330-FURIA/resultados";
    const mensagem = `📊 *Últimos resultados da FURIA:*\n\n👉 [Clique aqui para ver no site](${urlResultados})`;
    bot.sendMessage(chatId, mensagem, { parse_mode: "Markdown" });
  } else if (text === "🤖 whatsapp furia" || text === "/whatsapp") {
    const mensagem = `🤖 *Contato Inteligente da FURIA (Beta)*

Fale diretamente com o assistente virtual da FURIA via WhatsApp:

🔗 [Clique aqui para abrir o WhatsApp](https://wa.me/5511993404466)

💡 O atendimento está em fase *closed beta*, portanto recursos podem ser limitados.`;
    bot.sendMessage(chatId, mensagem, { parse_mode: "Markdown" });
  } else if (text === "🏅 info do time" || text === "/infotime") {
    const info = await getTeamInfo();
    bot.sendMessage(chatId, info, { parse_mode: "Markdown" });
  } else if (text === "📰 últimas notícias" || text === "/noticias") {
    const news = await getLatestNews();
    bot.sendMessage(chatId, news, { parse_mode: "Markdown" });
  } else if (
    text.startsWith("/") &&
    ![
      "/lineup",
      "/start",
      "/sobre",
      "/resultados",
      "/whatsapp",
      "/infotime",
      "/noticias",
    ].includes(text)
  ) {
    bot.sendMessage(
      chatId,
      `❌ *Comando não reconhecido: ${text}*\n\n📋 *Use os botões abaixo ou comandos por barra!*

/start = Ver a lista de comandos novamente e entender como interagir com o bot.
/lineup = Consultar o line-up atual da equipe FURIA (jogadores titulares, reservas e coach).
/sobre = Obter informações gerais sobre a FURIA Esports.
/resultados = Ver os resultados mais recentes dos jogos da FURIA no CS.
/whatsapp = Falar diretamente com o assistente virtual da FURIA via WhatsApp.
/infotime = Receber informações detalhadas sobre a equipe FURIA.
/noticias = Ficar por dentro das últimas notícias sobre a FURIA e o cenário do CS.`,
      {
        parse_mode: "Markdown",
      }
    );
  }
});
