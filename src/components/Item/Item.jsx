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
	const [user, setUser] = useState({});

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
		<li type="button" className="d-flex flex-column border rounded p-3 bg-light position-relative">
			<h3 className="fs-4">{title}</h3>
			<p className="m-0">{body}</p>
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
			{user.first_name && (
				<p className="text-end fw-bold mt-auto">{user.first_name + " " + user.last_name}</p>
			)}
			<p className="text-end fst-italic mt-auto">{created_at}</p>
		</li>
	);
};
