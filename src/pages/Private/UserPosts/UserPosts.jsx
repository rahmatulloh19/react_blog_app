import { MdOutlineDeleteSweep } from "react-icons/md";
import { PiNewspaper } from "react-icons/pi";
import { useEffect, useRef, useState } from "react";
import { MdOutlinePostAdd } from "react-icons/md";
import { Modal } from "../../../components/Modal/Modal";
import axios from "axios";
import { Item } from "../../../components/Item";

export const UserPosts = ({ me }) => {
	const [modal, setModal] = useState(false);
	const [editPostModal, setEditPostModal] = useState(false);
	const [myPosts, setMyPosts] = useState([]);
	const [id, setId] = useState(undefined);
	const [editPost, setEditPost] = useState({
		post_title: "",
		post_body: "",
	});

	const title = useRef(null);
	const body = useRef(null);
	const titleEdit = useRef(null);
	const bodyEdit = useRef(null);

	function getTime() {
		const date = new Date();

		return `${date.toLocaleTimeString().slice(0, 5)} ${date.toLocaleDateString()}`;
	}

	function handleSubmit(evt) {
		evt.preventDefault();
		axios
			.post("http://localhost:8080/posts", {
				post_title: title.current.value.trim(),
				post_body: body.current.value.trim(),
				user_id: me.id,
				created_at: getTime(),
			})
			.then((res) => console.log(res))
			.catch((err) => console.log(err));
		setModal(false);
		document.body.removeAttribute("style");
	}

	async function handleEditSubmit(evt) {
		evt.preventDefault();

		const created_at = await axios("http://localhost:8080/posts/" + id).then(({ data }) => {
			return data.created_at;
		});

		axios
			.put("http://localhost:8080/posts/" + id, {
				post_title: titleEdit.current.value.trim(),
				post_body: bodyEdit.current.value.trim(),
				user_id: me.id,
				created_at: created_at,
				last_edited_at: getTime(),
			})
			.then((res) => console.log(res))
			.catch((err) => console.log(err));
		setEditPostModal(false);
		document.body.removeAttribute("style");
	}

	function deletePost() {
		id &&
			axios
				.delete("http://localhost:8080/posts/" + id, {})
				.then((res) => console.log(res))
				.catch((err) => {
					console.log(err);
				});
		setEditPostModal(false);
	}

	useEffect(() => {
		axios("http://localhost:8080/posts?user_id=" + me.id)
			.then(({ data }) =>
				setTimeout(() => {
					setMyPosts(data);
				}, 500)
			)
			.catch((err) => console.log(err));
		setEditPost({
			post_title: "",
			post_body: "",
		});

		return () => {
			axios("http://localhost:8080/posts?user_id=" + me.id)
				.then(({ data }) =>
					setTimeout(() => {
						setMyPosts(data);
					}, 500)
				)
				.catch((err) => console.log(err));
		};
	}, [modal, editPostModal]);

	return (
		<div className="p-5">
			<h1 className="fs-2 mb-4">In this page you can add your posts</h1>
			<button
				className="btn btn-success d-flex align-items-center gap-2"
				type="button"
				onClick={() => setModal(true)}>
				<MdOutlinePostAdd />
				Add post
			</button>

			<div className="my__posts-wrapper mt-5">
				<ul className="d-grid my_posts-list mt-3">
					{myPosts.map((item) => {
						return (
							<Item
								key={item.id}
								id={item.id}
								title={item.post_title}
								body={item.post_body}
								created_at={item.created_at}
								canEdit={true}
								setEditPostModal={setEditPostModal}
								setId={setId}
								setEditPost={setEditPost}
							/>
						);
					})}
				</ul>
			</div>

			{modal && (
				<Modal title="Create new post" closeModal={setModal}>
					<form className="mx-auto mt-3" id="addPost" onSubmit={handleSubmit}>
						<input
							className="form-control mb-3"
							type="text"
							placeholder="Enter new post name"
							aria-label="Enter new post name"
							ref={title}
						/>
						<textarea
							className="form-control mb-3 textarea"
							placeholder="Enter new post body"
							ref={body}></textarea>
						<div className="btnWrapper d-flex justify-content-end">
							<button
								form="addPost"
								className="btn btn-outline-success d-flex align-items-center gap-2"
								type="submit">
								Create Post <PiNewspaper />
							</button>
						</div>
					</form>
				</Modal>
			)}

			{editPostModal && (
				<Modal title="Create new post" closeModal={setEditPostModal}>
					<form className="mx-auto mt-3" onSubmit={handleEditSubmit}>
						<input
							className="form-control mb-3"
							type="text"
							placeholder="Enter a new name"
							aria-label="Enter a new name"
							ref={titleEdit}
							defaultValue={editPost.post_title && editPost.post_title}
						/>
						<textarea
							className="form-control mb-3 textarea"
							placeholder="Enter a new body"
							aria-label="Enter a new body"
							ref={bodyEdit}
							defaultValue={editPost.post_body && editPost.post_body}></textarea>
						<div className="btnWrapper d-flex justify-content-end">
							<button
								className="btn btn-outline-danger me-2 d-flex align-items-center gap-2"
								type="button"
								onClick={(evt) => {
									deletePost(evt);
									document.body.removeAttribute("style");
								}}>
								Delete this post <MdOutlineDeleteSweep />
							</button>
							<button
								className="btn btn-outline-success d-flex align-items-center gap-2"
								type="submit">
								Edit this Post <PiNewspaper />
							</button>
						</div>
					</form>
				</Modal>
			)}
		</div>
	);
};
