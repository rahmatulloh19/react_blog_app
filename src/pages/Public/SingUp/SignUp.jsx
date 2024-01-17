import axios from "axios";
import { useRef } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export const SignUp = ({ setMe, setToken }) => {
	const userFirstName = useRef(null);
	const userLastName = useRef(null);
	const userEmail = useRef(null);
	const userPassword = useRef(null);
	const navigate = useNavigate();

	const handelSubmit = (evt) => {
		evt.preventDefault();

		axios
			.post("http://localhost:8080/register", {
				first_name: userFirstName.current.value,
				last_name: userLastName.current.value,
				email: userEmail.current.value,
				password: userPassword.current.value,
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

	return (
		<>
			<div className="d-flex align-items-center">
				<img className="w-50" src={"https://picsum.photos/id/38/736/681"} alt="" />
				<div
					className=" flex-grow-1 d-flex flex-column align-items-center h-100 "
					style={{ paddingTop: "150px" }}>
					<div className="inner shadow p-3 py-4 w-50">
						<h1 className="text-center fs-2 text-success fw-bolder mb-3">Sign Up</h1>

						<form className="w-100 d-flex flex-column" onSubmit={handelSubmit}>
							<input
								className="form-control mb-4 px-3 py-2"
								type="text"
								placeholder="Enter your first name"
								ref={userFirstName}
							/>
							<input
								className="form-control mb-4 px-3 py-2"
								type="text"
								placeholder="Enter your last name"
								ref={userLastName}
							/>
							<input
								className="form-control mb-4 px-3 py-2"
								type="email"
								placeholder="Enter your email"
								ref={userEmail}
							/>
							<input
								className="form-control mb-4 px-3 py-2"
								type="password"
								placeholder="Enter your password"
								ref={userPassword}
							/>

							<button className="btn btn-success mb-1 ms-auto" type="submit">
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
