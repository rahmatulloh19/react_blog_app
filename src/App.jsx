import { PrivateApp, PublicApp } from "./apps/";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import { tokenContext } from "./context/tokenContext";
import { useContext } from "react";

function App() {
	const { token } = useContext(tokenContext);

	if (!token) {
		return <PublicApp />;
	}

	return <PrivateApp />;
}

export default App;
