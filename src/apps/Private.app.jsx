import { Route, Routes } from "react-router-dom";
import { Header } from "../components/Header";

import { Home, Posts, Settings, UserPosts } from "../pages/Private";

export const PrivateApp = () => {
	return (
		<div className="my-display h-100">
			<Header />
			<div className="my-display-layout d-flex flex-column">
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/posts" element={<Posts />} />
					<Route path="/user_settings" element={<Settings />} />
					<Route path="/user_posts" element={<UserPosts />} />
				</Routes>
			</div>
		</div>
	);
};
