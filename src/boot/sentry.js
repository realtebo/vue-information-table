import Vue from "vue";
import * as Sentry from "@sentry/browser";
import * as Integrations from "@sentry/integrations";

Sentry.init({
  dsn: "https://d0dbe9c8d83b4a25a592825de6f9168d@sentry.io/3275054",
  integrations: [new Integrations.Vue({ Vue, attachProps: true })],
  // se false, vue logga solo su sentry e non sulla console
  logErrors: true
});
