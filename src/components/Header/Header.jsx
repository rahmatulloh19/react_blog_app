import { Link, NavLink, useNavigate } from "react-router-dom";
import { CiLogout, CiSettings, CiSignpostR1, CiSignpostDuo1 } from "react-icons/ci";
import { FaRegCircleUser } from "react-icons/fa6";
import { FiHome } from "react-icons/fi";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { meSlice } from "../../store/me/meSlice";
import { tokenSlice } from "../../store/token/tokenSlice";

export const Header = () => {
  const dispatch = useDispatch();
  const { me } = useSelector((state) => state.me);

  const { t, i18n } = useTranslation();

  const navigate = useNavigate();

  const handleChangeSelect = (evt) => {
    localStorage.setItem("lang", evt.target.value);
    i18n.changeLanguage(evt.target.value);
  };

  return (
    <header className="w-25 shadow position-fixed h-100 z-3">
      <div className="wrapper d-flex flex-column h-100 bg-light p-3">
        <Link className="text-decoration-none fs-2 fw-bolder" to="/">
          {t("header.title")}
        </Link>

        <nav className="navbar flex-grow-1 fw-medium navbar-expand-lg navbar-light p-0">
          <div className="collapse navbar-collapse h-100" id="navbarSupportedContent">
            <ul className="navbar-nav mb-2 mb-lg-0 flex-column pt-3 h-100 w-100 gap-2 fs-5">
              <li className="nav-item mb-2 ">
                <NavLink to="/" className={({ isActive }) => [isActive ? "link-active" : "", "nav-link border-start d-flex align-items-center gap-1  rounded-3"].join(" ")} href="#">
                  <FiHome />
                  {t("header.home")}
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className={({ isActive }) => [isActive ? "link-active" : "", "nav-link border-start d-flex align-items-center gap-1 rounded-3"].join(" ")} to="/posts">
                  <CiSignpostDuo1 />
                  {t("header.posts")}
                </NavLink>
              </li>
              <li className="nav-item">
                <select className="form-select" onChange={handleChangeSelect} defaultValue={localStorage.getItem("lang") || "en"}>
                  <option value="en">en</option>
                  <option value="ru">ru</option>
                  <option value="uz">uz</option>
                </select>
              </li>
              <li className="nav-item dropup mt-auto">
                <div className="p-2 dropdown-toggle d-flex align-items-center gap-1 fs-6" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  {me.img ? (
                    <img className="me-2 rounded-circle" src={me.img} width={25} height={25} alt={me.first_name + " " + me.last_name + "'s image"} />
                  ) : (
                    <FaRegCircleUser className="me-2" style={{ width: "25px", height: "25px" }} />
                  )}
                  {me.first_name + " " + me.last_name}
                </div>
                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                  <li>
                    <Link className="dropdown-item  d-flex align-items-center gap-2" to="/user_settings">
                      <CiSettings />
                      {t("header.settings")}
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item d-flex align-items-center gap-2" to="/user_posts">
                      <CiSignpostR1 />
                      {t("header.myPosts")}
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
                        dispatch(tokenSlice.actions.setToken(""));
                        dispatch(meSlice.actions.setMe({}));
                        navigate("/");
                      }}
                      className="dropdown-item text-danger d-flex align-items-center gap-2"
                      href="#"
                    >
                      <CiLogout />
                      {t("header.logOut")}
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
