import axios from "axios";
import { useContext, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import image from "../../../assets/38-736x681.jpg";
import { tokenContext } from "../../../context/tokenContext";
import { meContext } from "../../../context/meContext";
import { useTranslation } from "react-i18next";

export const SignUp = () => {
	const { t, i18n } = useTranslation();

	const { setToken } = useContext(tokenContext);
	const { setMe } = useContext(meContext);

	const userFirstName = useRef(null);
	const userLastName = useRef(null);
	const userEmail = useRef(null);
	const userPassword = useRef(null);
	const userImg = useRef(null);
	const navigate = useNavigate();

	const [firstNameError, setFirstNameError] = useState(t("signUp.firstNameRequired"));
	const [lastNameError, setLastNameError] = useState(t("signUp.lastNameRequired"));
	const [emailError, setEmailError] = useState(t("signUp.emailRequired"));
	const [passwordError, setPasswordError] = useState(t("signUp.passwordRequired"));

	const [firstNameTouched, setFirstNameTouched] = useState(false);
	const [lastNameTouched, setLastNameTouched] = useState(false);
	const [emailTouched, setEmailTouched] = useState(false);
	const [passwordTouched, setPasswordTouched] = useState(false);
	const [imgTouched, setImgTouched] = useState(false);

	const [statusForm, setStatusForm] = useState(false);

	const handleFirstNameValue = (evt) => {
		if (evt.target.value.length <= 1 || evt.target.value.length > 20) {
			setFirstNameError(t("signUp.firstNameNotValid"));
		} else {
			setFirstNameError("");
		}
	};

	const handleLastNameValue = (evt) => {
		if (evt.target.value.length <= 1 || evt.target.value.length > 20) {
			setLastNameError(t("signUp.lastNameNotValid"));
		} else {
			setLastNameError("");
		}
	};

	const EMAIL_REG_EX = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/;

	const handleEmailValue = (evt) => {
		if (!EMAIL_REG_EX.test(evt.target.value)) {
			setEmailError(t("signUp.emailNotValid"));
		} else {
			setEmailError("");
		}
	};

	const handlePasswordValue = (evt) => {
		if (evt.target.value.length <= 3 || evt.target.value.length > 8) {
			setPasswordError(t("signUp.passwordNotValid"));
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

	const handleChangeSelect = (evt) => {
		localStorage.setItem("lang", evt.target.value);
		i18n.changeLanguage(evt.target.value);
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
			<div className="d-flex align-items-center position-relative">
				<img className="w-50" src={image} alt="" />
				<div
					className=" flex-grow-1 d-flex flex-column align-items-center h-100 "
					style={{ paddingTop: "60px" }}>
					<select
						className="position-absolute form-select"
						style={{ right: "15px", top: "15px", width: "90px" }}
						onChange={handleChangeSelect}
						defaultValue={localStorage.getItem("lang") || "en"}>
						<option value="en">en</option>
						<option value="uz">uz</option>
						<option value="ru">ru</option>
					</select>
					<div className="inner shadow p-3 py-4 w-50">
						<h1 className="text-center fs-2 text-success fw-bolder mb-3">{t("signUp.title")}</h1>

						<form className="w-100 d-flex flex-column gap-3" onSubmit={handleSubmit}>
							<label>
								<input
									className={`form-control px-3 py-2 ${
										firstNameTouched && firstNameError && "is-invalid"
									} ${!firstNameError && "is-valid"}`}
									type="text"
									placeholder={t("signUp.firstNameHolder")}
									ref={userFirstName}
									required
									onBlur={() => setFirstNameTouched(true)}
									onChange={(evt) => handleFirstNameValue(evt)}
								/>
								<span className={`${firstNameError ? "invalid-feedback" : "valid-feedback"}`}>
									{firstNameError ? firstNameError : t("signUp.valid")}
								</span>
							</label>
							<label>
								<input
									className={`form-control px-3 py-2 ${
										lastNameTouched && lastNameError && "is-invalid"
									} ${!lastNameError && "is-valid"}`}
									type="text"
									placeholder={t("signUp.lastNameHolder")}
									ref={userLastName}
									required
									onChange={(evt) => handleLastNameValue(evt)}
									onBlur={() => setLastNameTouched(true)}
								/>
								<span className={`${lastNameError ? "invalid-feedback" : "valid-feedback"}`}>
									{lastNameError ? lastNameError : t("signUp.valid")}
								</span>
							</label>
							<label>
								<input
									className={`form-control px-3 py-2 ${
										emailTouched && emailError && "is-invalid"
									} ${!emailError && "is-valid"}`}
									type="email"
									placeholder={t("signUp.emailHolder")}
									ref={userEmail}
									required
									onChange={(evt) => handleEmailValue(evt)}
									onBlur={() => setEmailTouched(true)}
								/>
								<span className={`${emailError ? "invalid-feedback" : "valid-feedback"}`}>
									{emailError ? emailError : t("signUp.valid")}
								</span>
							</label>
							<label>
								<input
									className={`form-control px-3 py-2 ${
										passwordTouched && passwordError && "is-invalid"
									} ${!passwordError && "is-valid"}`}
									type="password"
									placeholder={t("signUp.passwordHolder")}
									ref={userPassword}
									required
									onChange={(evt) => handlePasswordValue(evt)}
									onBlur={() => setPasswordTouched(true)}
								/>
								<span className={`${passwordError ? "invalid-feedback" : "valid-feedback"}`}>
									{passwordError ? passwordError : t("signUp.valid")}
								</span>
							</label>
							<label>
								<input
									className="form-control px-3 py-2"
									type="url"
									placeholder={t("signUp.imgHolder")}
									ref={userImg}
									onBlur={() => setImgTouched(true)}
								/>
								<span>{imgTouched && t("signUp.imgFeedBack")}</span>
							</label>

							<button
								className={`btn btn-success mb-1 ms-auto ${!statusForm ? "disabled" : ""}`}
								type="submit">
								{t("signUp.btn")}
							</button>
							<Link className="d-block ms-auto text-center text-primary" to="/">
								{t("signUp.goSignIn")}
							</Link>
						</form>
					</div>
				</div>
			</div>
		</>
	);
};
