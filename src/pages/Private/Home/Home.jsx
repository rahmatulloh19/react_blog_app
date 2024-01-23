import { useEffect, useState } from "react";
import { Item } from "../../../components/Item";
import axios from "axios";
import { useTranslation } from "react-i18next";

export const Home = () => {
	const { t } = useTranslation();

	const [lastPosts, setLastPosts] = useState([]);

	useEffect(() => {
		axios("http://localhost:8080/posts")
			.then((res) => {
				// for rendering last posts
				setLastPosts(res.data.reverse().slice(0, 5));
			})
			.catch((err) => {});
	}, []);

	return (
		<div className="px-5 pt-5">
			<div className="w-75">
				<h1 className="fs-3 text-dark">{t("homePage.title")}</h1>
			</div>
			<h2 className="fs-4 text-end my-5 text-success fw-bolder">{t("homePage.subTitle")}</h2>

			<ul className="list-group">
				{lastPosts &&
					lastPosts.map((item) => {
						return (
							<Item
								created_at={item.created_at}
								title={item.post_title}
								body={item.post_body}
								user_id={item.user_id}
								key={item.id}
							/>
						);
					})}
			</ul>
		</div>
	);
};
