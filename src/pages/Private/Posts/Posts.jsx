import axios from "axios";
import { useEffect, useState } from "react";
import { Item } from "../../../components/Item";

export const Posts = () => {
	const [posts, setPosts] = useState([]);

	useEffect(() => {
		axios("http://localhost:8080/posts")
			.then((res) => {
				setPosts(res.data.reverse());
			})
			.catch((err) => {
				console.log(err);
			});
	}, []);

	return (
		<div className="px-5 pt-5">
			<h1 className="">Posts</h1>

			<ul className="mt-5 d-grid my_posts-list">
				{posts.map((item) => {
					return (
						<Item
							title={item.post_title}
							user_id={item.user_id}
							body={item.post_body}
							key={item.id}
							created_at={item.created_at}
						/>
					);
				})}
			</ul>
		</div>
	);
};
