import { createContext, useState } from "react";

export const meContext = createContext();

export const MeProvider = ({ children }) => {
	const [me, setMe] = useState(JSON.parse(localStorage.getItem("me")) || {});
	return <meContext.Provider value={{ me, setMe }}>{children}</meContext.Provider>;
};
