import axios from "axios";
import { useEffect, useState } from "react";
import { Item } from "../../../components/Item";
import ReactPaginate from "react-paginate";
import { Loading } from "../../../components/Loading";
import { Bounce, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const Posts = () => {
	const [moment, setMoment] = useState({
		isLoading: true,
		isError: false,
	});
	const [error, setError] = useState("Error");

	const [posts, setPosts] = useState([]);
	const [pageCount, setPageCount] = useState(0);

	const handlePageClick = ({ selected }) => {
		axios(`http://localhost:8080/posts?_page=${selected + 1}`)
			.then((res) => {
				const reversedData = res.data.reverse();
				setPosts(reversedData);

				setMoment({
					isLoading: false,
					isError: false,
				});
			})
			.catch((err) => {
				setError(err.message);
				setMoment({
					isLoading: false,
					isError: true,
				});
				toast.error("Cannot get data", {
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

	useEffect(() => {
		axios("http://localhost:8080/posts")
			.then((res) => {
				setPageCount(Math.ceil(res.data.length / 10));
			})
			.catch((err) => {
				toast.error("Cannot get data", {
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

		!pageCount &&
			axios("http://localhost:8080/posts?_page=1")
				.then((res) => {
					const reversedData = res.data.reverse();
					setPosts(reversedData);
					setMoment({
						isLoading: false,
						isError: false,
					});
				})
				.catch((err) => {
					toast.error("Cannot get data", {
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
					setError(err.message);
					setMoment({
						isLoading: false,
						isError: true,
					});
				});
	}, []);

	return (
		<div className="px-5 pt-5 d-flex flex-column flex-grow-1">
			<h1 className="">Posts</h1>

			{/* in this moment handling loading moment */}
			{moment.isLoading && <Loading />}
			{/* in this moment handling error moment */}
			{moment.isError && <h2>{error}</h2>}
			{/* in this moment no error but users there aren't */}
			{moment.isLoading === false && moment.isError === false && posts.length === 0 ? (
				<h2>Posts not found</h2>
			) : (
				//  in this moment rerendering isError moment don't handle then our component is not rendering
				!moment.isError &&
				!moment.isLoading && (
					<>
						<ul className="mt-5 d-grid my_posts-list flex-grow-1 align-items-start">
							{posts.map((item) => {
								return (
									<Item
										title={item.post_title}
										user_id={item.user_id}
										body={item.post_body}
										key={item.id}
										created_at={item.created_at}
									/>
								);
							})}
						</ul>
						<ReactPaginate
							nextLabel="next >"
							onPageChange={handlePageClick}
							pageRangeDisplayed={3}
							marginPagesDisplayed={2}
							pageCount={pageCount}
							previousLabel="< previous"
							pageClassName="page-item"
							pageLinkClassName="page-link"
							previousClassName="page-item"
							previousLinkClassName="page-link"
							nextClassName="page-item"
							nextLinkClassName="page-link"
							breakLabel="..."
							breakClassName="page-item"
							breakLinkClassName="page-link"
							containerClassName="pagination justify-content-center"
							activeClassName="active"
							renderOnZeroPageCount={null}
						/>
					</>
				)
			)}
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
		</div>
	);
};
