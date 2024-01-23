import axios from "axios";
import { useContext, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import image from "../../../assets/38-736x681.jpg";
import { tokenContext } from "../../../context/tokenContext";
import { meContext } from "../../../context/meContext";

export const SignUp = () => {
	const { setToken } = useContext(tokenContext);
	const { setMe } = useContext(meContext);

	const userFirstName = useRef(null);
	const userLastName = useRef(null);
	const userEmail = useRef(null);
	const userPassword = useRef(null);
	const userImg = useRef(null);
	const navigate = useNavigate();

	const [emailError, setEmailError] = useState("Email is required");
	const [passwordError, setPasswordError] = useState("Password is required");
	const [lastNameError, setLastNameError] = useState("Last Name is required");
	const [firstNameError, setFirstNameError] = useState("First Name is required");

	const [emailTouched, setEmailTouched] = useState(false);
	const [passwordTouched, setPasswordTouched] = useState(false);
	const [lastNameTouched, setLastNameTouched] = useState(false);
	const [firstNameTouched, setFirstNameTouched] = useState(false);
	const [imgTouched, setImgTouched] = useState(false);

	const [statusForm, setStatusForm] = useState(false);

	const EMAIL_REG_EX = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/;

	const handleEmailValue = (evt) => {
		if (!EMAIL_REG_EX.test(evt.target.value)) {
			setEmailError("Email is not valid");
		} else {
			setEmailError("");
		}
	};

	const handleFirstNameValue = (evt) => {
		if (evt.target.value.length <= 1 || evt.target.value.length > 20) {
			setFirstNameError("Length of password must be 2-20");
		} else {
			setFirstNameError("");
		}
	};

	const handleLastNameValue = (evt) => {
		if (evt.target.value.length <= 1 || evt.target.value.length > 20) {
			setLastNameError("Length of password must be 2-20");
		} else {
			setLastNameError("");
		}
	};

	const handlePasswordValue = (evt) => {
		if (evt.target.value.length <= 3 || evt.target.value.length > 8) {
			setPasswordError("Length of password must be 4-8");
		} else {
			setPasswordError("");
		}
	};

	const handleSubmit = (evt) => {
		evt.preventDefault();

		axios
			.post("http://localhost:8080/register", {
				first_name: userFirstName.current.value.trim(),
				last_name: userLastName.current.value.trim(),
				email: userEmail.current.value.trim(),
				password: userPassword.current.value.trim(),
				img: userImg.current.value,
			})
			.then((res) => {
				if (res.status === 201) {
					setToken(res.data.accessToken);
					setMe(res.data.user);
					localStorage.setItem("token", res.data.accessToken);
					localStorage.setItem("me", JSON.stringify(res.data.user));
					navigate("/");
				}
			});
	};

	useEffect(() => {
		if (
			!emailError.length &&
			!passwordError.length &&
			!lastNameError.length &&
			!firstNameError.length
		) {
			setStatusForm(true);
		} else {
			setStatusForm(false);
		}
	}, [emailError, passwordError, lastNameError, firstNameError]);

	return (
		<>
			<div className="d-flex align-items-center">
				<img className="w-50" src={image} alt="" />
				<div
					className=" flex-grow-1 d-flex flex-column align-items-center h-100 "
					style={{ paddingTop: "60px" }}>
					<div className="inner shadow p-3 py-4 w-50">
						<h1 className="text-center fs-2 text-success fw-bolder mb-3">Sign Up</h1>

						<form className="w-100 d-flex flex-column gap-3" onSubmit={handleSubmit}>
							<label>
								<input
									className={`form-control px-3 py-2 ${
										firstNameTouched && firstNameError && "is-invalid"
									} ${!firstNameError && "is-valid"}`}
									type="text"
									placeholder="Enter your first name"
									ref={userFirstName}
									required
									onBlur={() => setFirstNameTouched(true)}
									onChange={(evt) => handleFirstNameValue(evt)}
								/>
								<span className={`${firstNameError ? "invalid-feedback" : "valid-feedback"}`}>
									{firstNameError ? firstNameError : "Looks good!"}
								</span>
							</label>
							<label>
								<input
									className={`form-control px-3 py-2 ${
										lastNameTouched && lastNameError && "is-invalid"
									} ${!lastNameError && "is-valid"}`}
									type="text"
									placeholder="Enter your last name"
									ref={userLastName}
									required
									onChange={(evt) => handleLastNameValue(evt)}
									onBlur={() => setLastNameTouched(true)}
								/>
								<span className={`${lastNameError ? "invalid-feedback" : "valid-feedback"}`}>
									{lastNameError ? lastNameError : "Looks good!"}
								</span>
							</label>
							<label>
								<input
									className={`form-control px-3 py-2 ${
										emailTouched && emailError && "is-invalid"
									} ${!emailError && "is-valid"}`}
									type="email"
									placeholder="Enter your email"
									ref={userEmail}
									required
									onChange={(evt) => handleEmailValue(evt)}
									onBlur={() => setEmailTouched(true)}
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
									onChange={(evt) => handlePasswordValue(evt)}
									onBlur={() => setPasswordTouched(true)}
								/>
								<span className={`${passwordError ? "invalid-feedback" : "valid-feedback"}`}>
									{passwordError ? passwordError : "Looks good!"}
								</span>
							</label>
							<label>
								<input
									className="form-control px-3 py-2"
									type="url"
									placeholder="Enter your img url"
									ref={userImg}
									onBlur={() => setImgTouched(true)}
								/>
								<span>{imgTouched && "Optional"}</span>
							</label>

							<button
								className={`btn btn-success mb-1 ms-auto ${!statusForm ? "disabled" : ""}`}
								type="submit">
								Create Account
							</button>
							<Link className="d-block ms-auto w-25 text-center text-primary" to="/">
								Sign in
							</Link>
						</form>
					</div>
				</div>
			</div>
		</>
	);
};
