import { Route, Routes } from "react-router-dom";
import { SignUp } from "../pages/Public/SingUp/";
import { SignIn } from "../pages/Public/SignIn";

export const PublicApp = ({ setToken, setMe }) => {
	return (
		<>
			<Routes>
				<Route path="/" element={<SignIn setToken={setToken} setMe={setMe} />} />
				<Route path="/sign_up" element={<SignUp setToken={setToken} setMe={setMe} />} />
			</Routes>
		</>
	);
};
