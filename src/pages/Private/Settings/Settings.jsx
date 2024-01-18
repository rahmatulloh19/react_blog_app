import { useRef, useState } from "react";
import { Modal } from "../../../components/Modal/Modal";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const Settings = ({ me, setMe, setToken }) => {
	const [modal, setModal] = useState(false);
	const navigate = useNavigate();

	const firstName = useRef(null);
	const lastName = useRef(null);
	const email = useRef(null);
	const password = useRef(null);

	const handleSubmit = (evt) => {
		evt.preventDefault();
		axios
			.put("http://localhost:8080/users/" + me.id, {
				first_name: firstName.current.value.trim(),
				last_name: lastName.current.value.trim(),
				email: email.current.value.trim(),
				password: password.current.value.trim(),
			})
			.then((res) => {
				if (res.status === 200) {
					setModal(false);
					setMe(res.data);
					localStorage.setItem("me", JSON.stringify(res.data));
				}
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

	return (
		<div className="p-5 d-flex align-items-center justify-content-center h-100">
			<div className="bg-light d-flex flex-column align-items-center border rounded p-4 gap-2">
				<img
					className="rounded-circle flex-grow-0 mb-4"
					width={70}
					height={70}
					src="https://picsum.photos/70/70"
					alt=""
				/>
				<h2 className="mb-0">{`${me.first_name} ${me.last_name}`}</h2>
				<p className="mb-0">{me.email}</p>
				<button
					className="btn btn-warning align-self-end"
					type="button"
					onClick={() => {
						setModal(true);
					}}>
					Edit
				</button>

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
			</div>
		</div>
	);
};
