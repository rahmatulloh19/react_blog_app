import { Route, Routes } from "react-router-dom";
import { Header } from "../components/Header";

import { Home, Posts, Settings, UserPosts } from "../pages/Private";

export const PrivateApp = ({ setToken, setMe, me }) => {
	return (
		<div className="my-display h-100">
			<Header setToken={setToken} setMe={setMe} me={me} />
			<div className="my-display-layout d-flex flex-column">
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/posts" element={<Posts />} />
					<Route
						path="/user_settings"
						element={<Settings me={me} setMe={setMe} setToken={setToken} />}
					/>
					<Route path="/user_posts" element={<UserPosts me={me} />} />
				</Routes>
			</div>
		</div>
	);
};
