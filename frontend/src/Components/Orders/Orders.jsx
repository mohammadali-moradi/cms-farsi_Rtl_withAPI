import React, { useEffect, useState } from "react";
import ErrorBox from "../ErrorBox/ErrorBox";
import DetailModal from "../DetailsModal/DetailsModal";
import DeleteModal from "../DeleteModal/DeleteModal";

export default function Orders() {
  // state for all order
  const [allOrders, setAllOrders] = useState([]);

  // state for saving each order data
  const [mainOrder, setMainOrder] = useState(null);

  // state for deleting user with productID param
  const [mainOrderID, setMainOrderID] = useState(null);

  // state for modals
  const [isShowDetailModal, setIsShowDetailModal] = useState(false);
  const [isShowDeleteModal, setIsShowDeleteModal] = useState(false);
  const [isShowConfirmModal, setIsShowConfirmModal] = useState(false);

  // close modals
  const closeDetailModal = () => setIsShowDetailModal(false);
  const closeDeleteModal = () => setIsShowDeleteModal(false);
  const closeConfirmModal = () => setIsShowConfirmModal(false);

  // load table
  useEffect(() => {
    getAllOrders();
  }, []);

  // get order from database // fetching
  const getAllOrders = () => {
    fetch(`http://localhost:4000/api/orders/`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        setAllOrders(result);
      });
  };

  // delete order from database
  const deleteOrder = (event) => {
    event.preventDefault();
    console.log("object");
    fetch(`http://localhost:4000/api/orders/${mainOrderID}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        setIsShowDeleteModal(false);
        getAllOrders();
      });
  };

  return (
    <div className="cms-main">
      <h1 className="cms-title">لیست سفارشات ثبت شده</h1>
      {allOrders.length ? (
        <table className="cms-table">
          <thead>
            <tr>
              <th>نام محصول</th>
              <th>نام خریدار</th>
              <th>تاریخ ثبت سفارش</th>
              <th>ساعت</th>
              <th>مبلغ</th>
              <th>تخفیف</th>
              <th>مبلغ نهایی</th>
            </tr>
          </thead>
          <tbody>
            {allOrders.map((order) => (
              <tr key={order.id}>
                <td>{order.productID}</td>
                <td>{order.userID}</td>
                <td>{order.date}</td>
                <td>{order.hour}</td>
                <td>{order.price}</td>
                <td>{order.off}</td>
                <td>
                  <button
                    onClick={() => {
                      setIsShowDetailModal(true);
                      setMainOrder(order);
                    }}
                  >
                    جزییات
                  </button>
                  <button
                    onClick={() => {
                      setIsShowDeleteModal(true);
                      setMainOrderID(order.id);
                    }}
                  >
                    حذف
                  </button>
                  <button>بعدا بررسی می شود</button>
                  <button onClick={() => setIsShowConfirmModal(true)}>
                    تایید
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <ErrorBox msg="هیج سفارشی یافت نشد" />
      )}

      {
        /* detail Modal */
        isShowDetailModal && (
          <DetailModal onHide={closeDetailModal}>
            <table className="cms-table">
              <thead>
                <tr>
                  <th>محبوبیت</th>
                  <th>موجودی انبار</th>
                  <th>تعداد سفارش</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{mainOrder.popularity}%</td>
                  <td>{mainOrder.count}</td>
                  <td>{mainOrder.sale_count}</td>
                </tr>
              </tbody>
            </table>
          </DetailModal>
        )
      }
      {
        /* delete Modal */
        isShowDeleteModal && (
          <DeleteModal
            title="آیا از حذف سفارش اطمینان دارید؟"
            cancelAction={closeDeleteModal}
            submitAction={deleteOrder}
          />
        )
      }

      {
        /* confirm Modal */
        isShowConfirmModal && (
          <DeleteModal
            title="آیا سفارش را تایید می کنید؟"
            cancelAction={closeConfirmModal}
            submitAction={closeConfirmModal}
          />
        )
      }
    </div>
  );
}
