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
    ns: [
      "about",
      "basket",
      "checkout",
      "contact",
      "faq",
      "favourites",
      "footer",
      "header",
      "home",
      "login-register",
      "notFound",
      "productDetails",
      "products",
      "terms"
    ],
    defaultNS: "home",
    interpolation: {
      escapeValue: false,
    },
    order: ["localStorage"],
    backend: {
      loadPath: "/locales/{{lng}}/{{ns}}.json",
    },
  });

