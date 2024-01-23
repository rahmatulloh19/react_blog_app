import { useContext, useEffect, useRef, useState } from "react";
import { FaRegCircleUser } from "react-icons/fa6";
import { Modal } from "../../../components/Modal/Modal";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Bounce, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { meContext } from "../../../context/meContext";
import { tokenContext } from "../../../context/tokenContext";
import { useTranslation } from "react-i18next";

export const Settings = () => {
	const { t } = useTranslation();

	const { me, setMe } = useContext(meContext);
	const { setToken } = useContext(tokenContext);

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
				toast.error(t("settings.errorStatus"), {
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
					{t("settings.btnEdit")}
				</button>
			</div>
			{modal && (
				<Modal closeModal={setModal} title={t("settings.modalTitle")}>
					<form className="d-flex flex-column" onSubmit={handleSubmit}>
						<label className="mb-3">
							{t("settings.modalFirstName")}
							<input
								className="form-control mt-2"
								type="text"
								placeholder={t("settings.firstNameHolder")}
								ref={firstName}
								defaultValue={me.first_name ? me.first_name : ""}
							/>
						</label>
						<label className="mb-3">
							{t("settings.modalLastName")}
							<input
								className="form-control mt-2"
								type="text"
								placeholder={t("settings.lastNameHolder")}
								defaultValue={me.last_name ? me.last_name : ""}
								ref={lastName}
							/>
						</label>
						<label className="mb-3">
							{t("settings.modalEmail")}
							<input
								className="form-control mt-2"
								type="text"
								placeholder={t("settings.emailHolder")}
								defaultValue={me.email ? me.email : ""}
								ref={email}
								required
							/>
						</label>
						<label className="mb-3">
							{t("settings.modalPassword")}
							<input
								className="form-control mt-2"
								type="text"
								placeholder={t("settings.passwordHolder")}
								ref={password}
								required
							/>
						</label>
						<label className="mb-3">
							{t("settings.modalImage")}
							<input
								className="form-control mt-2"
								type="url"
								placeholder={t("settings.imgHolder")}
								ref={image}
							/>
						</label>
						<div className="d-flex gap-2">
							<button
								className="btn btn-outline-danger flex-grow-1"
								type="button"
								onClick={handleDelete}>
								{t("settings.modalDelete")}
							</button>
							<button className="btn btn-outline-success flex-grow-1" type="submit">
								{t("settings.modalSubmit")}
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
