import * as functions from "firebase-functions";
import { MIRKO } from "./constants";
import { sendTo } from "./send-to";

export const telegram_callback = async (
  req: functions.Request,
  res: functions.Response
): Promise<void> => {
  const body = req.body;

  // Check struttura del messaggio ricevuto via Telegram
  if (typeof body.message === "undefined") {
    console.log("Body message undefined - This is the body", body);
    res.status(200).send("Body message undefined");
    return;
  }

  const message = body.message;
  if (typeof message.entities !== "object") {
    console.log("Entities sconosciute [1]", message.entities);
    res.status(200).send("Entities sconosciute [1]");
    return;
  }

  const entities = message.entities;
  if (typeof entities[0] !== "object") {
    console.log("Entities sconosciute [2]", entities);
    res.status(200).send("Entities sconosciute [2]");
    return;
  }

  const entity = entities[0];
  if (typeof entity.type === "undefined") {
    console.log("Entity sconosciuta [1]", entity);
    res.status(200).send("Entitiy sconosciuta [1]");
    return;
  }

  if (entity.type !== "bot_command") {
    console.log("Il messaggio non è un comando", message);
    res.status(200).send("Il messaggio non è un comando");
    return;
  }

  // Se arrivo qua è di sicuro un comando bot
  const text = message.text;
  const sender = message.from;
  const { id, first_name, last_name, username, language_code } = sender;
  let message_to_dev = "";
  switch (text) {
    // Sia /start che /id mandano lo stesso messaggio"
    case "/start":
    case "/id":
      message_to_dev =
        "Messaggio riservato al DEV: \n" +
        "Ricevuto comando '" +
        text +
        '" da ' +
        first_name +
        " " +
        last_name +
        " (@" +
        username +
        ")";
      sendTo(MIRKO, message_to_dev).catch(e => console.error(e));

      let reply_to_sender = "";
      switch (language_code) {
        case "it":
          reply_to_sender =
            "Ciao " +
            first_name +
            " " +
            last_name +
            "!\n" +
            "Il tuo ID Telegram è " +
            id +
            "." +
            'Comunica il tuo Id di Telegram all\'amministratore della tua congregazione su "Jw Information Table".\n' +
            "Il tuo admin ti abiliterà a ricevere le notifiche riguardanti i tuoi incarichi di congregazione.";
          break;
        default:
          reply_to_sender =
            "Hello " +
            first_name +
            " " +
            last_name +
            "!\n" +
            "Your Telegram ID is " +
            id +
            "." +
            'Notify your Telegram Id to your congregation administrator on "Jw Information Table".' +
            "You admin will enable your to receive notifications regarding your congregation's assignments.";
      }

      sendTo(id, reply_to_sender).catch(e => console.error(e));
      break;
    default:
      message_to_dev =
        "Messaggio riservato al DEV: \n" +
        "Ricevuto comando sconosciuto '" +
        text +
        '" da ' +
        first_name +
        " " +
        last_name +
        " (@" +
        username +
        ")";
      sendTo(MIRKO, message_to_dev).catch(e => console.error(e));
  }
  res.status(200).send("OK");
  return;
};
