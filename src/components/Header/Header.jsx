import { Link, NavLink, useNavigate } from "react-router-dom";
import { CiLogout, CiSettings, CiSignpostR1, CiSignpostDuo1 } from "react-icons/ci";
import { FaRegCircleUser } from "react-icons/fa6";
import { FiHome } from "react-icons/fi";
import { useContext } from "react";
import { tokenContext } from "../../context/tokenContext";
import { meContext } from "../../context/meContext";

export const Header = () => {
	const { me, setMe } = useContext(meContext);
	const { setToken } = useContext(tokenContext);

	const navigate = useNavigate();

	return (
		<header className="w-25 shadow position-fixed h-100 z-3">
			<div className="wrapper d-flex flex-column h-100 bg-light p-3">
				<Link className="text-decoration-none fs-2 fw-bolder" to="/">
					Blog App
				</Link>

				<nav className="navbar flex-grow-1 fw-medium navbar-expand-lg navbar-light p-0">
					<div className="collapse navbar-collapse h-100" id="navbarSupportedContent">
						<ul className="navbar-nav mb-2 mb-lg-0 flex-column pt-3 h-100 w-100 gap-2 fs-5">
							<li className="nav-item mb-2 ">
								<NavLink
									to="/"
									className={({ isActive }) =>
										[
											isActive ? "link-active" : "",
											"nav-link border-start d-flex align-items-center gap-1  rounded-3",
										].join(" ")
									}
									href="#">
									<FiHome />
									Home
								</NavLink>
							</li>
							<li className="nav-item">
								<NavLink
									className={({ isActive }) =>
										[
											isActive ? "link-active" : "",
											"nav-link border-start d-flex align-items-center gap-1 rounded-3",
										].join(" ")
									}
									to="/posts">
									<CiSignpostDuo1 />
									Posts
								</NavLink>
							</li>
							<li className="nav-item dropup mt-auto">
								<div
									className="p-2 dropdown-toggle d-flex align-items-center gap-1 fs-6"
									id="navbarDropdown"
									role="button"
									data-bs-toggle="dropdown"
									aria-expanded="false">
									{me.img ? (
										<img
											className="me-2 rounded-circle"
											src={me.img}
											width={25}
											height={25}
											alt={me.first_name + " " + me.last_name + "'s image"}
										/>
									) : (
										<FaRegCircleUser className="me-2" style={{ width: "25px", height: "25px" }} />
									)}
									{me.first_name + " " + me.last_name}
								</div>
								<ul className="dropdown-menu" aria-labelledby="navbarDropdown">
									<li>
										<Link
											className="dropdown-item  d-flex align-items-center gap-2"
											to="/user_settings">
											<CiSettings />
											Settings
										</Link>
									</li>
									<li>
										<Link
											className="dropdown-item d-flex align-items-center gap-2"
											to="/user_posts">
											<CiSignpostR1 />
											My Posts
										</Link>
									</li>
									<li>
										<hr className="dropdown-divider" />
									</li>
									<li>
										<button
											type="button"
											onClick={() => {
												localStorage.removeItem("token");
												localStorage.removeItem("me");
												setToken("");
												setMe({});
												navigate("/");
											}}
											className="dropdown-item text-danger d-flex align-items-center gap-2"
											href="#">
											<CiLogout />
											Log out
										</button>
									</li>
								</ul>
							</li>
						</ul>
					</div>
				</nav>
			</div>
		</header>
	);
};
