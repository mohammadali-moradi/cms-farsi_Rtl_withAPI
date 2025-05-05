import React, { useEffect, useState } from "react";
import ErrorBox from "../ErrorBox/ErrorBox";
import DeleteModal from "../DeleteModal/DeleteModal";
import EditModal from "../EditModal/EditModal";
import DetailsModal from '../DetailsModal/DetailsModal';

import "./Users.css";
import { AiOutlineDollarCircle } from "react-icons/ai";

export default function Users() {
  // state for getting users from rest api
  const [users, setUsers] = useState([]);

  // state for saving main user id
  const [mainUserID, setMainUserID] = useState(null);

  // state for saving detail to show in detail modal
  const [MainUserInfos, setMainUserInfos] = useState({})

  // state for show modals
  const [isShowDeleteModal, setIsShowDeleteModal] = useState(false);
  const [isShowEditModal, setIsShowEditModal] = useState(false);
  const [isShowDetailModal, setIsShowDetailModal] = useState(false);

  // state for saving main user detail // for edit modal
  const [firsname, setFirsname] = useState("");
  const [lastname, setLastname] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [score, setScore] = useState("");
  const [buy, setBuy] = useState("");

  // close modals funcs
  const closeDeleteModal = () => setIsShowDeleteModal(false);
  const closeEditeModal = () => setIsShowEditModal(false);
  const closeDetailModal = () => setIsShowDetailModal(false)

  // loading start
  useEffect(() => {
    getAllUsers();
  }, []);

  // get user
  const getAllUsers = () => {
    fetch("http://localhost:4000/api/users/", {
      method: "GET",
    })
      .then((res) => res.json())
      .then((userData) => {
        console.log(userData);
        setUsers(userData);
      });
  };

  // delete user
  const deleteUser = () => {
    fetch(`http://localhost:4000/api/users/${mainUserID}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        getAllUsers();
        closeDeleteModal();
      });
  };

  // update/edit user details
  const updateUserInfos = (event) => {
    event.preventDefault();
    const userNewInfos = {
      firsname: firsname,
      lastname: lastname,
      username: username,
      password: password,
      phone: phone,
      city: city,
      email: email,
      address: address,
      score: score,
      buy: buy,
    };

    fetch(`http://localhost:4000/api/users/${mainUserID}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userNewInfos),
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        getAllUsers();
        closeEditeModal();
      });
  };

  return (
    <div className="cms-main">
      {users.length ? (
        <>
          <h1 className="cms-title">لیست کاربران</h1>
          <table className="cms-table">
            <thead>
              <tr>
                <th>نام و نام خانوادگی</th>
                <th>نام کاربری</th>
                <th>رمز عبور</th>
                <th>شماره تماس</th>
                <th>ایمیل</th>
              </tr>
            </thead>

            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  <td>
                    {user.firsname} {user.lastname}
                  </td>
                  <td>{user.username}</td>
                  <td>{user.password}</td>
                  <td>{user.phone}</td>
                  <td>{user.email}</td>
                  <td>
                    <button
                      onClick={() => {
                        setIsShowDeleteModal(true);
                        setMainUserID(user.id);
                        setCity(user.city);
                        setAddress(user.address);
                        setScore(user.score);
                        setBuy(user.buy);
                      }}
                    >
                      حذف
                    </button>
                    <button onClick={() => {
                      setIsShowDetailModal(true)
                      setMainUserInfos(user)
                    }}>جزییات</button>
                    <button
                      onClick={() => {
                        setIsShowEditModal(true);
                        setMainUserID(user.id);
                        setFirsname(user.firsname);
                        setLastname(user.lastname);
                        setUsername(user.username);
                        setPassword(user.password);
                        setPhone(user.phone);
                        setCity(user.city);
                        setEmail(user.email);
                        setAddress(user.address);
                        setScore(user.score);
                        setBuy(user.buy);
                      }}
                    >
                      ویرایش
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>{" "}
        </>
      ) : (
        <ErrorBox msg="هیج کاربری یافت نشد" />
      )}

      {/* delete modal for remove user */}
      {isShowDeleteModal && (
        <DeleteModal
          title="آیا از حذف کاربر اطمینان دارید؟"
          cancelAction={closeDeleteModal}
          submitAction={deleteUser}
        />
      )}

      {/* edit modal for editing user details */}
      {isShowEditModal && (
        <EditModal onClose={closeEditeModal} onSubmit={updateUserInfos}>
          <div className="edit-user-info-input-group">
            <AiOutlineDollarCircle />
            <input
              type="text"
              value={firsname}
              placeholder="نام جدید را وارد کنید..."
              onChange={(event) => setFirsname(event.target.value)}
              className="edit-user-info-input"
            />
          </div>
          <div className="edit-user-info-input-group">
            <AiOutlineDollarCircle />
            <input
              type="text"
              value={lastname}
              placeholder="نام خانوادگی جدید را وارد کنید..."
              onChange={(event) => setLastname(event.target.value)}
              className="edit-product-input"
            />
          </div>
          <div className="edit-user-info-input-group">
            <AiOutlineDollarCircle />

            <input
              type="text"
              value={username}
              placeholder="نام کاربری جدید را وارد کنید..."
              onChange={(event) => setUsername(event.target.value)}
              className="edit-product-input"
            />
          </div>
          <div className="edit-user-info-input-group">
            <AiOutlineDollarCircle />
            <input
              type="text"
              value={password}
              placeholder="رمزعبور جدید را وارد کنید..."
              onChange={(event) => setPassword(event.target.value)}
              className="edit-product-input"
            />
          </div>
          <div className="edit-user-info-input-group">
            <AiOutlineDollarCircle />
            <input
              type="text"
              value={phone}
              placeholder="شماره تلفن جدید را وارد کنید..."
              onChange={(event) => setPhone(event.target.value)}
              className="edit-product-input"
            />
          </div>
          <div className="edit-user-info-input-group">
            <AiOutlineDollarCircle />
            <input
              type="text"
              value={city}
              placeholder="شهر جدید را وارد کنید..."
              onChange={(event) => setCity(event.target.value)}
              className="edit-product-input"
            />
          </div>
          <div className="edit-user-info-input-group">
            <AiOutlineDollarCircle />
            <input
              type="text"
              value={email}
              placeholder="ایمیل جدید را وارد کنید..."
              onChange={(event) => setEmail(event.target.value)}
              className="edit-product-input"
            />
          </div>
          <div className="edit-user-info-input-group">
            <AiOutlineDollarCircle />
            <input
              type="text"
              value={address}
              placeholder="آدرس جدید را وارد کنید..."
              onChange={(event) => setAddress(event.target.value)}
              className="edit-product-input"
            />
          </div>
          <div className="edit-user-info-input-group">
            <AiOutlineDollarCircle />
            <input
              type="text"
              value={score}
              placeholder="امتیاز جدید را وارد کنید..."
              onChange={(event) => setScore(event.target.value)}
              className="edit-product-input"
            />
          </div>
          <div className="edit-user-info-input-group">
            <AiOutlineDollarCircle />
            <input
              type="text"
              value={buy}
              placeholder="خرید جدید را وارد کنید..."
              onChange={(event) => setBuy(event.target.value)}
              className="edit-product-input"
            />
          </div>
        </EditModal>
      )}

      {/* detail modal for show extra details */}
      {
        isShowDetailModal && (
          <DetailsModal onHide={closeDetailModal}>
            <table className="cms-table">
            <thead>
              <tr>
                <th>شهر</th>
                <th>آدرس</th>
                <th>امتیاز</th>
                <th>خرید</th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td>{MainUserInfos.city}</td>
                <td>{MainUserInfos.address}</td>
                <td>{MainUserInfos.score}</td>
                <td>{MainUserInfos.buy}</td>
              </tr>
            </tbody>
          </table>
          </DetailsModal>
        )
      }
    </div>
  );
}
