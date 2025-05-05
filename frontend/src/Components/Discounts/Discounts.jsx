import React, { useEffect, useState } from "react";
import ErrorBox from "../ErrorBox/ErrorBox";
import DeleteModal from "../DeleteModal/DeleteModal";

export default function Discounts() {
  // state for all discount
  const [allDiscounts, SetAllDiscounts] = useState([]);

  // state for main order that been clicked
  const [mainDiscountID, setMainDiscountID] = useState(null);
  // state for showing modals
  const [isShowDeleteModal, setIsShowDeleteModal] = useState(false);
  const [isShowConfirmModal, setIsShowConfirmModal] = useState(false);

  // close modals
  const closeDeleteModal = () => setIsShowDeleteModal(false);
  const closeConfirmModal = () => setIsShowConfirmModal(false);

  // loading discount on mount
  useEffect(() => {
    getAllDiscount();
  }, []);

  // get all discounts
  const getAllDiscount = () => {
    fetch(`http://localhost:4000/api/offs/`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        SetAllDiscounts(data);
      });
  };
  // delete Discount
  const deleteDiscount = (event) => {
    event.preventDefault();
    fetch(`http://localhost:4000/api/offs/${mainDiscountID}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        closeDeleteModal();
        getAllDiscount();
      });
  };

  return (
    <div className="cms-main">
      <h1 className="cms-title">لیست کد های تخفیف ثبت شده</h1>
      {allDiscounts.length ? (
        <table className="cms-table">
          <thead>
            <tr>
              <th>کد تخفیف</th>
              <th>درصد تخفیف</th>
              <th>تاریخ ثبت</th>
              <th>ثبت شده توسط</th>
              <th>قابل استفاده برای</th>
            </tr>
          </thead>
          <tbody>
            {allDiscounts.map((off) => (
              <tr key={off.id}>
                <td>{off.code}</td>
                <td>{off.percent}%</td>
                <td>{off.date}</td>
                <td>{off.adminID}</td>
                <td>{off.productID}</td>
                <td>
                  <button
                    onClick={() => {
                      setIsShowConfirmModal(true);
                      setMainDiscountID(off.id);
                    }}
                  >
                    تایید
                  </button>
                  <button
                    onClick={() => {
                      setIsShowDeleteModal(true);
                      setMainDiscountID(off.id);
                    }}
                  >
                    حذف
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <ErrorBox msg="هیج کد تخفیفی یافت نشد" />
      )}

      {
        /* delete modal */
        isShowDeleteModal && (
          <DeleteModal
            cancelAction={closeDeleteModal}
            title="آیا از حذف کد تخفیف اطمینان دارید؟"
            submitAction={deleteDiscount}
          />
        )
      }

      {isShowConfirmModal && (
        <DeleteModal
          title="آیا از فعال کردن کد تخفیف اطمینان دارید؟"
          cancelAction={closeConfirmModal}
          submitAction={closeConfirmModal}
        />
      )}
    </div>
  );
}
