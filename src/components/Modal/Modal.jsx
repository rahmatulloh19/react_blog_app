import { IoMdClose } from "react-icons/io";

export const Modal = ({ title, children, closeModal }) => {
	document.body.style.overflow = "hidden";

	return (
		<div
			className="overlay"
			onClick={(evt) => {
				if (evt.target.className === "overlay") {
					closeModal(false);
					document.body.removeAttribute("style");
				}
			}}>
			<div className="my-modal">
				<h3 className="mb-3 text-danger">{title}</h3>
				<button
					className="closeBtn btn position-absolute btn-outline-secondary"
					type="button"
					onClick={() => {
						closeModal(false);
						document.body.removeAttribute("style");
					}}>
					<IoMdClose />
				</button>
				<div className="modalContent">{children}</div>
			</div>
		</div>
	);
};
