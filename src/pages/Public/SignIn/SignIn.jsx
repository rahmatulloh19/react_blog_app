import axios from "axios";
import { useRef } from "react";
import { Link } from "react-router-dom";

export const SignIn = ({ setMe, setToken }) => {
	const userEmail = useRef(null);
	const userPassword = useRef(null);

	const handelSubmit = (evt) => {
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
					console.log(res.data);

					localStorage.setItem("token", res.data.accessToken);
					localStorage.setItem("me", JSON.stringify(res.data.user));
				}
			});
	};

	return (
		<>
			<div className="d-flex align-items-center overflow-hidden">
				<img className="w-50" src={"https://picsum.photos/id/50/736/681"} alt="" />
				<div
					className="flex-grow-1 d-flex flex-column align-items-center h-100"
					style={{ paddingTop: "150px" }}>
					<div className="inner w-50 shadow p-3 py-4">
						<h1 className="d-block text-center fs-2 text-primary fw-bolder mb-3">Sign in</h1>

						<form className="w-100 d-flex flex-column" onSubmit={handelSubmit}>
							<input
								className="form-control mb-4 px-3 py-2"
								type="text"
								placeholder="Enter your email"
								ref={userEmail}
							/>
							<input
								className="form-control mb-4 px-3 py-2"
								type="password"
								placeholder="Enter your password"
								ref={userPassword}
							/>

							<button className="btn btn-primary mb-1 w-25 ms-auto px-4" type="submit">
								Enter
							</button>
							<Link className="d-block ms-auto w-25 text-center text-success" to="/sign_up">
								Sign up
							</Link>
						</form>
					</div>
				</div>
			</div>
		</>
	);
};