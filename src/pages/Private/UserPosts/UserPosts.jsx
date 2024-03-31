import { MdOutlineDeleteSweep } from "react-icons/md";
import { PiNewspaper } from "react-icons/pi";
import { useEffect, useRef, useState } from "react";
import { MdOutlinePostAdd } from "react-icons/md";
import { Modal } from "../../../components/Modal";
import axios from "axios";
import { Item } from "../../../components/Item";
import { Loading } from "../../../components/Loading";
import { Bounce, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

const toastSettings = {
  position: "top-right",
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: "light",
  transition: Bounce,
};

export const UserPosts = () => {
  const { t } = useTranslation();

  const { me } = useSelector((state) => state.me);

  const [moment, setMoment] = useState({
    isLoading: true,
    isError: false,
  });

  const [error, setError] = useState(t("myPosts.errorStatus"));

  const [modal, setModal] = useState(false);
  const [editPostModal, setEditPostModal] = useState(false);

  const [myPosts, setMyPosts] = useState([]);
  const [id, setId] = useState(undefined);

  const [editPost, setEditPost] = useState({
    post_title: "",
    post_body: "",
  });

  const title = useRef(null);
  const body = useRef(null);
  const titleEdit = useRef(null);
  const bodyEdit = useRef(null);

  function getTime() {
    const date = new Date();

    return `${date.toLocaleTimeString().slice(0, 5)} ${date.toLocaleDateString()}`;
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    axios
      .post("http://localhost:8080/posts", {
        post_title: title.current.value.trim(),
        post_body: body.current.value.trim(),
        user_id: me.id,
        created_at: getTime(),
      })
      .then((res) => {
        if (res.status === 201) {
          setEditPostModal(false);
          toast.success(t("myPosts.successAdd"), toastSettings);
        }
      })
      .catch(() => {
        setEditPostModal(false);
        toast.error(t("myPosts.errorAdd"), toastSettings);
      });
    setModal(false);
    document.body.removeAttribute("style");
  }

  async function handleEditSubmit(evt) {
    evt.preventDefault();

    const created_at = await axios("http://localhost:8080/posts/" + id).then(({ data }) => {
      return data.created_at;
    });

    axios
      .put("http://localhost:8080/posts/" + id, {
        post_title: titleEdit.current.value.trim(),
        post_body: bodyEdit.current.value.trim(),
        user_id: me.id,
        created_at: created_at,
        last_edited_at: getTime(),
      })
      .then((res) => {
        if (res.status === 200) {
          setEditPostModal(false);
          toast.success(t("myPosts.successEdit"), toastSettings);
        }
      })
      .catch(() => {
        setEditPostModal(false);
        toast.error(t("myPosts.errorEdit"), toastSettings);
      });
    document.body.removeAttribute("style");
  }

  function deletePost() {
    id &&
      axios
        .delete("http://localhost:8080/posts/" + id, {})
        .then((res) => {
          if (res.status === 200) {
            setEditPostModal(false);
            toast.success(t("myPosts.successDelete"), toastSettings);
          }
        })
        .catch(() => {
          setEditPostModal(false);
          toast.error(t("myPosts.errorDelete"), toastSettings);
        });
    setEditPostModal(false);
  }

  useEffect(() => {
    axios("http://localhost:8080/posts?user_id=" + me.id)
      .then(({ data }) => {
        setMyPosts(data);
        setMoment({
          isLoading: false,
          isError: false,
        });
      })
      .catch(() => {
        setError(t("myPosts.errorGetting"));
        setMoment({
          isLoading: false,
          isError: true,
        });
      });

    // on opened modal staying prevues value
    setEditPost({
      post_title: "",
      post_body: "",
    });

    return () => {
      axios("http://localhost:8080/posts?user_id=" + me.id)
        .then(({ data }) => {
          setMyPosts(data);
          setMoment({
            isLoading: false,
            isError: false,
          });
        })
        .catch(() => {
          setError(t("myPosts.errorGetting"));
          setMoment({
            isLoading: false,
            isError: true,
          });
        });
    };
  }, [modal, editPostModal]);

  return (
    <div className="p-5">
      <h1 className="fs-2 mb-4">{t("myPosts.title")}</h1>
      <button className="btn btn-success d-flex align-items-center gap-2 mb-3" type="button" onClick={() => setModal(true)}>
        <MdOutlinePostAdd />
        {t("myPosts.btnAdd")}
      </button>

      {moment.isLoading && <Loading />}
      {moment.isError && <h2>{error}</h2>}
      {moment.isLoading === false && moment.isError === false && myPosts.length === 0 ? (
        <h2>{t("myPosts.subTitle")}</h2>
      ) : (
        !moment.isError && (
          <div className="my__posts-wrapper mt-5">
            <ul className="d-grid my_posts-list pt-3">
              {myPosts.map((item) => {
                return (
                  <Item
                    key={item.id}
                    id={item.id}
                    title={item.post_title}
                    body={item.post_body}
                    created_at={item.created_at}
                    canEdit={true}
                    setEditPostModal={setEditPostModal}
                    setId={setId}
                    setEditPost={setEditPost}
                    user_id={me?.id}
                  />
                );
              })}
            </ul>
          </div>
        )
      )}
      {}

      {modal && (
        <Modal title={t("myPosts.modalAddTitle")} closeModal={setModal}>
          <form className="mx-auto mt-3" id="addPost" onSubmit={handleSubmit}>
            <input className="form-control mb-3" type="text" placeholder={t("myPosts.modalAddPostName")} aria-label={t("myPosts.modalAddPostName")} ref={title} required />
            <textarea className="form-control mb-3 textarea" placeholder={t("myPosts.modalAddPostBody")} ref={body} required></textarea>
            <div className="btnWrapper d-flex justify-content-end">
              <button form="addPost" className="btn btn-outline-success d-flex align-items-center gap-2" type="submit">
                {t("myPosts.modalAddBtn")} <PiNewspaper />
              </button>
            </div>
          </form>
        </Modal>
      )}

      {editPostModal && (
        <Modal title={t("myPosts.modalEditTitle")} closeModal={setEditPostModal}>
          <form className="mx-auto mt-3" onSubmit={handleEditSubmit}>
            <input
              className="form-control mb-3"
              type="text"
              placeholder={t("myPosts.modalEditPostName")}
              aria-label={t("myPosts.modalEditPostName")}
              ref={titleEdit}
              defaultValue={editPost.post_title && editPost.post_title}
              required
            />
            <textarea
              className="form-control mb-3 textarea"
              placeholder={t("myPosts.modalEditPostBody")}
              aria-label={t("myPosts.modalEditPostBody")}
              ref={bodyEdit}
              defaultValue={editPost.post_body && editPost.post_body}
              required
            ></textarea>
            <div className="btnWrapper d-flex justify-content-end">
              <button
                className="btn btn-outline-danger me-2 d-flex align-items-center gap-2"
                type="button"
                onClick={(evt) => {
                  deletePost(evt);
                  document.body.removeAttribute("style");
                }}
              >
                {t("myPosts.modalEditPostDeleteBtn")} <MdOutlineDeleteSweep />
              </button>
              <button className="btn btn-outline-success d-flex align-items-center gap-2" type="submit">
                {t("myPosts.modalEditPostEditBtn")} <PiNewspaper />
              </button>
            </div>
          </form>
        </Modal>
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
