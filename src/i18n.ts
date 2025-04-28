import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import Backend from "i18next-http-backend";
import LanguageDetector from "i18next-browser-languagedetector";

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    // resources: {
    //   en: {
    //     translation: {
    //       title: "Tic Tac Toe",
    //     },
    //   },
    //   pt_BR: {
    //     translation: {
    //       title: "Jogo da Velha",
    //     },
    //   },
    // },
    // lng: "en", // if you're using a language detector, do not define the lng option
    debug: true,
    fallbackLng: "en",

    interpolation: {
      escapeValue: false, // react already safes from xss => https://www.i18next.com/translation-function/interpolation#unescape
    },
  });
