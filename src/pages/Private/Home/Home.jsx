import { useEffect, useState } from "react";
import { Item } from "../../../components/Item";
import axios from "axios";

export const Home = () => {
	const [lastPosts, setLastPosts] = useState([]);

	useEffect(() => {
		axios("http://localhost:8080/posts")
			.then((res) => {
				// for rendering last posts
				setLastPosts(res.data.reverse().slice(0, 5));
			})
			.catch((err) => {
				console.log(err);
			});
	}, []);

	return (
		<div className="px-5 pt-5">
			<div className="w-75">
				<h1 className="fs-3 text-dark">
					Discover the latest insights and trends with our cutting-edge blog app, providing a
					seamless and interactive platform for staying informed and engaged in your areas of
					interest.
				</h1>
			</div>
			<h2 className="fs-4 text-end my-5 text-success fw-bolder">There you can see last 5 posts</h2>

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
