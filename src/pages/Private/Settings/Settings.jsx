import { useEffect, useRef, useState } from "react";
import { FaRegCircleUser } from "react-icons/fa6";
import { Modal } from "../../../components/Modal/Modal";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Bounce, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const Settings = ({ me, setMe, setToken }) => {
	const [modal, setModal] = useState(false);
	const navigate = useNavigate();

	const firstName = useRef(null);
	const lastName = useRef(null);
	const email = useRef(null);
	const password = useRef(null);
	const image = useRef(null);

	const handleSubmit = (evt) => {
		evt.preventDefault();
		axios
			.put("http://localhost:8080/users/" + me.id, {
				first_name: firstName.current.value.trim(),
				last_name: lastName.current.value.trim(),
				email: email.current.value.trim(),
				password: password.current.value.trim(),
				img: image.current.value,
			})
			.then((res) => {
				if (res.status === 200) {
					setModal(false);
					console.log(res);
					setMe(res.data);
					localStorage.setItem("me", JSON.stringify(res.data));
					toast.success("Successfully edited user info", {
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
	};

	const handleDelete = () => {
		axios.delete("http://localhost:8080/users/" + me.id).then((res) => {
			if (res.status === 200) {
				setModal(false);
				setMe(res.data);
				setToken("");
				localStorage.removeItem("me");
				localStorage.removeItem("token");
				navigate("/");
			}
		});
	};

	useEffect(() => {
		return () => {};
	}, [me]);

	return (
		<div className="p-5 d-flex align-items-center justify-content-center h-100">
			<div className="bg-light position-relative d-flex flex-column align-items-center border rounded p-4 gap-2">
				{me.img ? (
					<img
						className="rounded-circle flex-grow-0 position-absolute user__img"
						width={70}
						height={70}
						src={me.img}
						alt=""
					/>
				) : (
					<FaRegCircleUser
						className="rounded-circle flex-grow-0 position-absolute user__img bg-white"
						style={{ width: "70px", height: "70px" }}
					/>
				)}
				<h2 className="mb-0 mt-5">{`${me.first_name} ${me.last_name}`}</h2>
				<p className="mb-0">{me.email}</p>
				<button
					className="btn btn-warning align-self-end"
					type="button"
					onClick={() => {
						setModal(true);
					}}>
					Edit
				</button>
			</div>
			{modal && (
				<Modal closeModal={setModal} title="Edit user info">
					<form className="d-flex flex-column" onSubmit={handleSubmit}>
						<label className="mb-3">
							User first name:
							<input
								className="form-control mt-2"
								type="text"
								placeholder="Enter new first name"
								ref={firstName}
								defaultValue={me.first_name ? me.first_name : ""}
							/>
						</label>
						<label className="mb-3">
							User last name:
							<input
								className="form-control mt-2"
								type="text"
								placeholder="Enter new last name"
								defaultValue={me.last_name ? me.last_name : ""}
								ref={lastName}
							/>
						</label>
						<label className="mb-3">
							User email:
							<input
								className="form-control mt-2"
								type="text"
								placeholder="Enter new email"
								defaultValue={me.email ? me.email : ""}
								ref={email}
								required
							/>
						</label>
						<label className="mb-3">
							User password:
							<input
								className="form-control mt-2"
								type="text"
								placeholder="Enter new password"
								ref={password}
								required
							/>
						</label>
						<label className="mb-3">
							User Image:
							<input
								className="form-control mt-2"
								type="url"
								placeholder="Enter new image url"
								ref={image}
							/>
						</label>
						<div className="d-flex gap-2">
							<button
								className="btn btn-outline-danger flex-grow-1"
								type="button"
								onClick={handleDelete}>
								Delete
							</button>
							<button className="btn btn-outline-success flex-grow-1" type="submit">
								Edit & Save
							</button>
						</div>
					</form>
				</Modal>
			)}
			<ToastContainer
				position="top-center"
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
