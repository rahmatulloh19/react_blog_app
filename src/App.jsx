import { useState } from "react";
import { PrivateApp, PublicApp } from "./apps/";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";

function App() {
	const [token, setToken] = useState(localStorage.getItem("token") || "");
	const [me, setMe] = useState(JSON.parse(localStorage.getItem("me")) || {});

	if (!token) {
		return <PublicApp setToken={setToken} setMe={setMe} />;
	}

	return <PrivateApp setToken={setToken} setMe={setMe} me={me} />;
}

export default App;
