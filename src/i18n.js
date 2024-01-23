import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import { lang } from "./lang";

i18next.use(initReactI18next).init({
	resources: {
		en: {
			translation: { ...lang.en },
		},
		ru: {
			translation: { ...lang.ru },
		},
		uz: {
			translation: { ...lang.uz },
		},
	},
	debug: true,
	fallbackLng: ["en", "ru", "uz"],
	lng: localStorage.getItem("lang") || "en",

	interpolation: {
		escapeValue: false,
	},
});
