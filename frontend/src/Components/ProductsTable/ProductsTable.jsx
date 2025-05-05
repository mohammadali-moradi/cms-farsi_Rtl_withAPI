import React, { useState } from "react";
import DeleteModal from "../DeleteModal/DeleteModal";
import DetailsModal from "../DetailsModal/DetailsModal";
import EditModal from "../EditModal/EditModal";
// import ErrorBox from "../ErrorBox/ErrorBox";
import ErrorBox from "../ErrorBox/ErrorBox";

import "./ProductsTable.css";
import { AiOutlineDollarCircle } from "react-icons/ai";

export default function ProductsTable({ allProducts, getAllProducts }) {
  // مودال ها
  const [isShowDeleteModal, setIsShowDeleteModal] = useState(false);
  const [isShowDetailModal, setIsShowDetailModal] = useState(false);
  const [isShowEditModal, setIsShowEditModal] = useState(false);

  // برای ویرایش  و حذف
  const [productID, setProductID] = useState(null);
  // دکمه جزییات
  const [mainProductInfos, SetMainProductInfos] = useState({});
  // برای ویرایش محصولات
  const [productNewTitle, setProductNewTitle] = useState("");
  const [productNewPrice, setProductNewPrice] = useState("");
  const [productNewCount, setProductNewCount] = useState("");
  const [productNewImg, setProductNewImg] = useState("");
  const [productNewPopularity, setProductNewPopularity] = useState("");
  const [productNewSale, setProductNewSale] = useState("");
  const [productNewColors, setProductNewColors] = useState("");

  // useEffect(() => {
  //   fetch("http://localhost:4000/api/products/")
  //     .then ((res) =>{
  //       console.log(res);
  //      return res.json()
  //     })
  //       .then((data) => SetAllProducts(data))
  //       .catch(error => console.error('Error:', error));
  // }, []);

  const deleteModalCancelAction = () => {
    setIsShowDeleteModal(false);
  };
  const deleteModalSubmitAction = () => {
    console.log("deleted");
    console.log(productID);
    fetch(`http://localhost:4000/api/products/${productID}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((result) => {
        setIsShowDeleteModal(false);
        getAllProducts();
      });
  };

  const closeDetailModal = () => {
    console.log("close detail modal");
    setIsShowDetailModal(false);
  };

  const updateProductInfos = (event) => {
    event.preventDefault();

    const productNewInfos = {
      title: productNewTitle,
      price: +productNewPrice,
      count: +productNewCount,
      img: productNewImg,
      popularity: +productNewPopularity,
      sale: +productNewSale,
      colors: productNewColors,
    };

    fetch(`http://localhost:4000/api/products/${productID}/`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(productNewInfos),
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        getAllProducts();
        setIsShowEditModal(false);
      });
    console.log("update product has been done");
  };

  return (
    <>
      {allProducts.length ? (
        <>
          <h1 style={{marginTop: "30px"}} className="cms-title">لیست محصولات</h1>
          <table className="products-table">
            <thead>
              <tr className="products-table-header-tr">
                <th>عکس</th>
                <th>اسم</th>
                <th>قیمت</th>
                <th>موجودی</th>
              </tr>
            </thead>
            <tbody>
              {allProducts.map((product) => (
                <tr className="products-table-tr " key={product.id}>
                  <td>
                    <img
                      src={product.img}
                      alt="AirPod"
                      className="products-table-img"
                    />
                  </td>
                  <td>{product.title}</td>
                  <td>{product.price} تومان</td>
                  <td>{product.count}</td>
                  <td>
                    <button
                      className="products-table-btn"
                      onClick={() => {
                        setIsShowDetailModal(true);
                        SetMainProductInfos(product);
                      }}
                    >
                      جزییات
                    </button>
                    <button
                      className="products-table-btn"
                      onClick={() => {
                        setIsShowDeleteModal(true);
                        setProductID(product.id);
                      }}
                    >
                      حذف
                    </button>
                    <button
                      className="products-table-btn"
                      onClick={() => {
                        setIsShowEditModal(true);
                        setProductID(product.id);
                        setProductNewTitle(product.title);
                        setProductNewPrice(product.price);
                        setProductNewCount(product.count);
                        setProductNewImg(product.img);
                        setProductNewPopularity(product.popularity);
                        setProductNewSale(product.sale);
                        setProductNewColors(product.colors);
                      }}
                    >
                      ویرایش
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      ) : (
        <ErrorBox msg="هیج محصولی یافت نشد" />
      )}

      {isShowDeleteModal && (
        <DeleteModal
          title="آیا از حذف اطمینان دارید؟"
          cancelAction={deleteModalCancelAction}
          submitAction={deleteModalSubmitAction}
        />
      )}

      {isShowDetailModal && (
        <DetailsModal onHide={closeDetailModal}>
          <table className="cms-table">
            <thead>
              <tr>
                <th>محبوبیت</th>
                <th>فروش</th>
                <th>رنگ بندی</th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td>{mainProductInfos.popularity}</td>
                <td>{mainProductInfos.sale}</td>
                <td>{mainProductInfos.colors}</td>
              </tr>
            </tbody>
          </table>
        </DetailsModal>
      )}

      {isShowEditModal && (
        <EditModal
          onClose={() => setIsShowEditModal(false)}
          onSubmit={() => updateProductInfos}
        >
          {/* children */}
          <div className="edit-products-form-group">
            <span>
              <AiOutlineDollarCircle />
            </span>
            <input
              type="text"
              placeholder="عنوان جدید را وارد کنید"
              className="edit-product-input"
              value={productNewTitle}
              onChange={(event) => setProductNewTitle(event.target.value)}
            />
          </div>
          <div className="edit-products-form-group">
            <span>
              <AiOutlineDollarCircle />
            </span>
            <input
              type="text"
              placeholder="قیمت جدید را وارد کنید"
              className="edit-product-input"
              value={productNewPrice}
              onChange={(event) => setProductNewPrice(event.target.value)}
            />
          </div>
          <div className="edit-products-form-group">
            <span>
              <AiOutlineDollarCircle />
            </span>
            <input
              type="text"
              placeholder="موجودی جدید را وارد کنید"
              className="edit-product-input"
              value={productNewCount}
              onChange={(event) => setProductNewCount(event.target.value)}
            />
          </div>
          <div className="edit-products-form-group">
            <span>
              <AiOutlineDollarCircle />
            </span>
            <input
              type="text"
              placeholder="آدرس کاور جدید را وارد کنید"
              className="edit-product-input"
              value={productNewImg}
              onChange={(event) => setProductNewImg(event.target.value)}
            />
          </div>
          <div className="edit-products-form-group">
            <span>
              <AiOutlineDollarCircle />
            </span>
            <input
              type="text"
              placeholder="محبوبیت جدید را وارد کنید"
              className="edit-product-input"
              value={productNewPopularity}
              onChange={(event) => setProductNewPopularity(event.target.value)}
            />
          </div>
          <div className="edit-products-form-group">
            <span>
              <AiOutlineDollarCircle />
            </span>
            <input
              type="text"
              placeholder="میزان فروش را وارد کنید"
              className="edit-product-input"
              value={productNewSale}
              onChange={(event) => setProductNewSale(event.target.value)}
            />
          </div>
          <div className="edit-products-form-group">
            <span>
              <AiOutlineDollarCircle />
            </span>
            <input
              type="text"
              placeholder="رنگبندی جدید را وارد کنید"
              className="edit-product-input"
              value={productNewColors}
              onChange={(event) => setProductNewColors(event.target.value)}
            />
          </div>
        </EditModal>
      )}
    </>
  );
}
