import { createContext, useState } from "react";

export const tokenContext = createContext();

export const TokenProvider = ({ children }) => {
	const [token, setToken] = useState(localStorage.getItem("token") || "");

	return <tokenContext.Provider value={{ token, setToken }}>{children}</tokenContext.Provider>;
};
