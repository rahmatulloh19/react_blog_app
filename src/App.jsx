import { PrivateApp, PublicApp } from "./apps/";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import "./i18n";
import { useSelector } from "react-redux";

function App() {
  const { token } = useSelector((state) => state.token);

  if (!token) {
    return <PublicApp />;
  }

  return <PrivateApp />;
}

export default App;
