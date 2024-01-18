import axios from "axios";
import { useEffect, useState } from "react";
import { Item } from "../../../components/Item";
import ReactPaginate from "react-paginate";

export const Posts = () => {
	const [posts, setPosts] = useState([]);
	const [pageCount, setPageCount] = useState(0);

	const handlePageClick = ({ selected }) => {
		axios(`http://localhost:8080/posts?_page=${selected + 1}`)
			.then((res) => {
				const reversedData = res.data.reverse();
				setPosts(reversedData);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	useEffect(() => {
		axios("http://localhost:8080/posts")
			.then((res) => {
				setPageCount(Math.ceil(res.data.length / 10));
			})
			.catch((err) => {
				console.log(err);
			});

		!pageCount &&
			axios("http://localhost:8080/posts?_page=1")
				.then((res) => {
					const reversedData = res.data.reverse();
					setPosts(reversedData);
				})
				.catch((err) => {
					console.log(err);
				});
	}, []);

	return (
		<div className="px-5 pt-5">
			<h1 className="">Posts</h1>

			<ul className="mt-5 d-grid my_posts-list">
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
		</div>
	);
};
