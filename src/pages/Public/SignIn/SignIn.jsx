import axios from "axios";
import { useContext, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Bounce, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import image from "../../../assets/50-736x681.jpg";
import { tokenContext } from "../../../context/tokenContext";
import { meContext } from "../../../context/meContext";

export const SignIn = () => {
	const { setToken } = useContext(tokenContext);
	const { setMe } = useContext(meContext);

	const userEmail = useRef(null);
	const userPassword = useRef(null);

	const [emailError, setEmailError] = useState("Email is required");
	const [passwordError, setPasswordError] = useState("Password is required");

	const [emailTouched, setEmailTouched] = useState(false);
	const [passwordTouched, setPasswordTouched] = useState(false);

	const [statusForm, setStatusForm] = useState(false);

	const handleSubmit = (evt) => {
		evt.preventDefault();

		axios
			.post("http://localhost:8080/login", {
				email: userEmail.current.value,
				password: userPassword.current.value,
			})
			.then((res) => {
				if (res.status === 200) {
					setToken(res.data.accessToken);
					setMe(res.data.user);

					localStorage.setItem("token", res.data.accessToken);
					localStorage.setItem("me", JSON.stringify(res.data.user));
					toast.success("Successfully created account", {
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
					position: "top-center",
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

	const EMAIL_REG_EX = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/;

	const handleEmailValue = (evt) => {
		if (!EMAIL_REG_EX.test(evt.target.value)) {
			setEmailError("Email is not valid");
		} else {
			setEmailError("");
		}
	};

	const handlePasswordValue = (evt) => {
		if (evt.target.value.length <= 3 || evt.target.value.length > 8) {
			setPasswordError("Length of password must be 4-8");
		} else {
			setPasswordError("");
		}
	};

	useEffect(() => {
		if (!emailError.length && !passwordError.length) {
			setStatusForm(true);
		} else [setStatusForm(false)];
	}, [emailError, passwordError]);

	return (
		<>
			<div className="d-flex align-items-center overflow-hidden">
				<img className="w-50" src={image} alt="" />
				<div
					className="flex-grow-1 d-flex flex-column align-items-center h-100"
					style={{ paddingTop: "150px" }}>
					<div className="inner w-50 shadow p-3 py-4">
						<h1 className="d-block text-center fs-2 text-primary fw-bolder mb-3">Sign in</h1>

						<form className="w-100 d-flex flex-column gap-3" onSubmit={handleSubmit}>
							<label>
								<input
									className={`form-control px-3 py-2 ${
										emailTouched && emailError && "is-invalid"
									} ${!emailError && "is-valid"}`}
									type="email"
									placeholder="Enter your email"
									ref={userEmail}
									required
									onBlur={() => setEmailTouched(true)}
									onChange={(evt) => handleEmailValue(evt)}
								/>
								<span className={`${emailError ? "invalid-feedback" : "valid-feedback"}`}>
									{emailError ? emailError : "Looks good!"}
								</span>
							</label>
							<label>
								<input
									className={`form-control px-3 py-2 ${
										passwordTouched && passwordError && "is-invalid"
									} ${!passwordError && "is-valid"}`}
									type="password"
									placeholder="Enter your password"
									ref={userPassword}
									required
									onBlur={() => setPasswordTouched(true)}
									onChange={(evt) => handlePasswordValue(evt)}
								/>
								<span className={`${passwordError ? "invalid-feedback" : "valid-feedback"}`}>
									{passwordError ? passwordError : "Looks good!"}
								</span>
							</label>

							<button
								className={`btn btn-primary mb-1 w-25 ms-auto ${!statusForm ? "disabled" : ""}`}
								type="submit">
								Enter
							</button>
							<Link className="d-block ms-auto w-25 text-center text-success" to="/sign_up">
								Sign up
							</Link>
						</form>
					</div>
				</div>
			</div>
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
		</>
	);
};
