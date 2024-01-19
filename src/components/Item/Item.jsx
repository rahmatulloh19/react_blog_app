import axios from "axios";
import { useEffect, useState } from "react";
import { FiEdit } from "react-icons/fi";

export const Item = ({
	title,
	body,
	canEdit,
	setEditPostModal,
	id,
	setId,
	user_id,
	created_at,
	setEditPost,
}) => {
	const [user, setUser] = useState("");

	user_id &&
		useEffect(() => {
			axios("http://localhost:8080/users/" + user_id)
				.then((res) => {
					if (res.status === 200) {
						setUser(res.data);
					}
				})
				.catch(() => {});
		}, []);

	return (
		user.email && (
			<li
				type="button"
				className="d-flex flex-column border rounded p-3 bg-light position-relative">
				{user.first_name && (
					<div className="d-flex align-items-center gap-2 mb-3">
						<img className="rounded-circle" src={user.img} width={30} alt="" />
						<p className="text-end fw-bold mb-0">{user.first_name + " " + user.last_name}</p>
					</div>
				)}
				<h3 className="fs-4">{title}</h3>
				<p className="flex-grow-1">{body}</p>
				{canEdit && (
					<button
						className="btn__item btn btn-warning position-absolute"
						type="button"
						onClick={() => {
							setEditPostModal(true);
							setId(id);
							axios(`http://localhost:8080/posts/${id}`).then(({ data }) => setEditPost(data));
						}}>
						<FiEdit data-id={id} />
					</button>
				)}

				<p className="text-end fst-italic mb-0">{created_at}</p>
			</li>
		)
	);
};
