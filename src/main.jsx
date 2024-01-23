import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { TokenProvider } from "./context/tokenContext.jsx";
import { MeProvider } from "./context/meContext.jsx";
import { LangContext } from "./context/langContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
	<BrowserRouter>
		<TokenProvider>
			<MeProvider>
				<LangContext>
					<App />
				</LangContext>
			</MeProvider>
		</TokenProvider>
	</BrowserRouter>
);
