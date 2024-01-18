import { MdOutlineDeleteSweep } from "react-icons/md";
import { PiNewspaper } from "react-icons/pi";
import { useEffect, useRef, useState } from "react";
import { MdOutlinePostAdd } from "react-icons/md";
import { Modal } from "../../../components/Modal";
import axios from "axios";
import { Item } from "../../../components/Item";
import { Loading } from "../../../components/Loading";
import { Bounce, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const UserPosts = ({ me }) => {
	const [moment, setMoment] = useState({
		isLoading: true,
		isError: false,
	});
	const [error, setError] = useState("Error");

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
			.then((res) => {
				if (res.status === 201) {
					setEditPostModal(false);
					toast.success("Successfully Added", {
						position: "top-right",
						autoClose: 5000,
						hideProgressBar: false,
						closeOnClick: true,
						pauseOnHover: true,
						draggable: true,
						progress: undefined,
						theme: "light",
						transition: Bounce,
					});
				}
			})
			.catch((err) => {
				setEditPostModal(false);
				toast.error(err.message, {
					position: "top-right",
					autoClose: 5000,
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true,
					progress: undefined,
					theme: "light",
					transition: Bounce,
				});
			});
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
			.then((res) => {
				if (res.status === 200) {
					setEditPostModal(false);
					toast.success("Successfully Edited", {
						position: "top-right",
						autoClose: 5000,
						hideProgressBar: false,
						closeOnClick: true,
						pauseOnHover: true,
						draggable: true,
						progress: undefined,
						theme: "light",
						transition: Bounce,
					});
				}
			})
			.catch((err) => {
				setEditPostModal(false);
				toast.error(err.message, {
					position: "top-right",
					autoClose: 5000,
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true,
					progress: undefined,
					theme: "light",
					transition: Bounce,
				});
			});
		document.body.removeAttribute("style");
	}

	function deletePost() {
		id &&
			axios
				.delete("http://localhost:8080/posts/" + id, {})
				.then((res) => {
					if (res.status === 200) {
						setEditPostModal(false);
						toast.success("Successfully Deleted", {
							position: "top-right",
							autoClose: 5000,
							hideProgressBar: false,
							closeOnClick: true,
							pauseOnHover: true,
							draggable: true,
							progress: undefined,
							theme: "light",
							transition: Bounce,
						});
					}
				})
				.catch((err) => {
					setEditPostModal(false);
					toast.error(err.message, {
						position: "top-right",
						autoClose: 5000,
						hideProgressBar: false,
						closeOnClick: true,
						pauseOnHover: true,
						draggable: true,
						progress: undefined,
						theme: "light",
						transition: Bounce,
					});
				});
		setEditPostModal(false);
	}

	useEffect(() => {
		axios("http://localhost:8080/posts?user_id=" + me.id)
			.then(({ data }) => {
				setMyPosts(data);
				setMoment({
					isLoading: false,
					isError: false,
				});
			})
			.catch((err) => {
				setError(err.message);
				setMoment({
					isLoading: false,
					isError: true,
				});
			});

		setEditPost({
			post_title: "",
			post_body: "",
		});

		return () => {
			axios("http://localhost:8080/posts?user_id=" + me.id)
				.then(({ data }) => {
					setMyPosts(data);
					setMoment({
						isLoading: false,
						isError: false,
					});
				})
				.catch((err) => {
					setError(err.message);
					setMoment({
						isLoading: false,
						isError: true,
					});
				});
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

			{moment.isLoading && <Loading />}
			{moment.isError && <h2>{error}</h2>}
			{moment.isLoading === false && moment.isError === false && myPosts.length === 0 ? (
				<h2>Posts not found</h2>
			) : (
				!moment.isError && (
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
				)
			)}
			{}

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
			<ToastContainer
				position="top-right"
				autoClose={5000}
				limit={3}
				hideProgressBar={false}
				newestOnTop
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover
				theme="light"
				transition:Bounce
			/>
		</div>
	);
};
