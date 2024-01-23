import { createContext, useState } from "react";

export const langContext = createContext();

export const LangContext = ({ children }) => {
	const [langValue, setLangValue] = useState(localStorage.getItem("lang") || "en");
	return (
		<langContext.Provider value={{ langValue, setLangValue }}>{children}</langContext.Provider>
	);
};
