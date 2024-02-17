import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";
import HttpApi from "i18next-http-backend";
i18n
  .use(initReactI18next)
  .use(LanguageDetector)
  .use(HttpApi)
  .init({
    fallbackLng: "en",
    interpolation: {
      escapeValue: false,
    },
    order: ["localstorage"],
    backend: {
      loadPath: "/locales/{{lng}}/{{ns}}.json",
    }
  });
