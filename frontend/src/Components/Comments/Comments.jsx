import React, { useEffect, useState } from "react";
import ErrorBox from "../ErrorBox/ErrorBox";
import DetailModal from ".././DetailsModal/DetailsModal";
import DeleteModal from "../DeleteModal/DeleteModal";
import EditModal from "../EditModal/EditModal";

import "./Comments.css";

export default function Comments() {
  const [allComments, setAllComments] = useState([]);
  // comment body for button "دیدن کامنت"
  const [mainCommentBody, setMainCommentBody] = useState("");
  // close modals
  const [isShowDetailModal, setIsShowDetailModal] = useState(false);
  const [isShowDeleteModal, setIsShowDeleteModal] = useState(false);
  const [isShowAcceptModal, setIsShowAcceptModal] = useState(false);
  const [isShowEditModal, setIsShowEditModal] = useState(false);
  // set ID for delete & edit comment
  const [commentId, setCommentId] = useState(null);
  //Start // get all comments (fetching)
  useEffect(() => {
    getAllComments();
  }, []);
  function getAllComments() {
    fetch("http://localhost:4000/api/comments")
      .then((res) => res.json())
      .then((comments) => setAllComments(comments));
  }
  //End // get all comments (fetching)

  const closeDetailModal = () => setIsShowDetailModal(false);
  const closeDeleteModal = () => setIsShowDeleteModal(false);
  const closeEditModal = () => setIsShowEditModal(false);
  const closeAcceptModal = () => setIsShowAcceptModal(false);

  // deleting comment
  const deleteComment = () => {
    fetch(`http://localhost:4000/api/comments/${commentId}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        closeDeleteModal();
        getAllComments();
      });
  };

  // Editing comment
  const editComment = (event) => {
    event.preventDefault();
    fetch(`http://localhost:4000/api/comments/${commentId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        body: mainCommentBody,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        closeEditModal();
        getAllComments();
      });
  };

  // accepting comment
  const acceptComment = (event) => {
    event.preventDefault();
    closeAcceptModal()
    // console.log("comment accepted");
    // fetch(`http://localhost:4000/api/comments/accept/${commentId}`, {
    //   method: "POST",
    // })
    //   .then((res) => res.json())
    //   .then((result) => {
    //     console.log(result);
    //     closeAcceptModal();
    //     getAllComments();
    //   })
    //   .catch((error) => console.log(error));
  };
  
  return (
    <div className="cms-main">
      <h1 className="cms-title">لیست کامنت ها</h1>
      {allComments.length ? (
        <table className="cms-table">
          <thead>
            <tr style={{ fontSize: "1.2rem" }}>
              <th>اسم کاربر</th>
              <th>محصول</th>
              <th>کامنت</th>
              <th>تاریخ</th>
              <th>ساعت</th>
            </tr>
          </thead>

          <tbody>
            {allComments.map((comment) => {
              return (
                <tr key={comment.id}>
                  <td>{comment.userID}</td>
                  <td>{comment.productID}</td>
                  <td>
                    <button
                      onClick={() => {
                        setIsShowDetailModal(true);
                        setMainCommentBody(comment.body);
                      }}
                    >
                      دیدن کامنت
                    </button>
                  </td>
                  <td>{comment.date}</td>
                  <td>{comment.hour}</td>
                  <td>
                    <button
                      onClick={() => {
                        setCommentId(comment.id);
                        setIsShowDeleteModal(true);
                      }}
                    >
                      حذف
                    </button>
                    <button
                      onClick={() => {
                        setIsShowEditModal(true);
                        setCommentId(comment.id);
                        setMainCommentBody(comment.body);
                      }}
                    >
                      ویرایش
                    </button>
                    {/* {comment.isAccept === 0 ? (
                      <button
                        onClick={() => {
                          setIsShowAcceptModal(true);
                          setCommentId(comment.id);
                        }}
                      >
                        تایید
                      </button>
                    ) : (
                      <button
                        style={{ backgroundColor: "greenyellow" }}
                        disabled
                      >
                        تایید شده
                      </button>
                    )} */}
                    <button
                      onClick={() => {
                        setIsShowAcceptModal(true);
                      }}
                    >
                      پاسخ
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      ) : (
        <ErrorBox msg="هیج کامنتی یافت نشد" />
      )}

      {isShowDetailModal && (
        <DetailModal onHide={closeDetailModal}>
          <p className="text-modal">{mainCommentBody}</p>
        </DetailModal>
      )}

      {isShowDeleteModal && (
        <DeleteModal
          title="آیا از حذف اطمینان دارید؟"
          cancelAction={closeDeleteModal}
          submitAction={deleteComment}
        />
      )}

      {isShowEditModal && (
        <EditModal onClose={closeEditModal} onSubmit={editComment}>
          <textarea
            className="edit-product-input"
            style={{ textWrap: "wrap", width: "90%", height: "100%" }}
            type="text"
            value={mainCommentBody}
            onChange={(event) => {
              setMainCommentBody(event.target.value);
            }}
          />
        </EditModal>
      )}

      {isShowAcceptModal && (
        <EditModal
          title="به کامنت پاسخ دهید:"
          onClose={closeAcceptModal}
          onSubmit={acceptComment}
        >
          <textarea
          className="edit-product-input"
            style={{ textWrap: "wrap", width: "90%", height: "100%", backgroundColor: "#ebe6e6" }}
            type="text"
            placeholder="پاسخ دهید..."
          />
        </EditModal>
      )}
    </div>
  );
}
