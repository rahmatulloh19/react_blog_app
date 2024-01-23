import { Route, Routes } from "react-router-dom";
import { SignUp } from "../pages/Public/SingUp/";
import { SignIn } from "../pages/Public/SignIn";

export const PublicApp = () => {
	return (
		<>
			<Routes>
				<Route path="/" element={<SignIn />} />
				<Route path="/sign_up" element={<SignUp />} />
			</Routes>
		</>
	);
};
