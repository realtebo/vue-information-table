import * as functions from "firebase-functions";
import { telegram_callback } from "./telegram-callback";

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
export const helloWorld = functions.https.onRequest(telegram_callback);
