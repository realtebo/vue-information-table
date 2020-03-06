import * as functions from "firebase-functions";
import { MIRKO } from "./constants";
import { sendTo } from "./send-to";

export const telegram_callback = async (
  req: functions.Request,
  res: functions.Response
): Promise<void> => {
  sendTo(MIRKO, "Ciao !!!!");
  res.send(`ok ${MIRKO}`);
  return;
};
