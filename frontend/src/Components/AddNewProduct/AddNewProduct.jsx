import React, { useState } from "react";
import { LuTextCursor } from "react-icons/lu";
import { BiDollar } from "react-icons/bi";
import { BsBag, BsStar } from "react-icons/bs";
import { AiOutlinePicture } from "react-icons/ai";
import { IoBarChartOutline, IoColorPaletteOutline } from "react-icons/io5";

import "./AddNewProduct.css";

export default function AddNewProduct({ getAllProducts }) {
  // state for each data of product
  const [newProductTitle, setNewProductTitle] = useState("");
  const [newProductPrice, setNewProductPrice] = useState("");
  const [newProductCount, setNewProductCount] = useState("");
  const [newProductImg, setNewProductImg] = useState("");
  const [newProductPopularity, setNewProductPopularity] = useState("");
  const [newProductSale, setNewProductSale] = useState("");
  const [newProductColors, setNewProductColors] = useState("");

  // logic "ثبت محصول" button //START
  const newProductInfos = {
    title: newProductTitle,
    price: newProductPrice,
    count: newProductCount,
    img: newProductImg,
    popularity: newProductPopularity,
    sale: newProductSale,
    colors: newProductColors,
  };

  const add_New_Product = (event) => {
    event.preventDefault();

    fetch("http://localhost:4000/api/products/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newProductInfos),
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        getAllProducts();
        emptyInputs();
      });
  };
  // logic "ثبت محصول" button //ENDING

  function emptyInputs() {
    setNewProductTitle("");
    setNewProductPrice("");
    setNewProductCount("");
    setNewProductImg("");
    setNewProductPopularity("");
    setNewProductSale("");
    setNewProductColors("");
  }

  return (
    <div className="products-main">
      {/* header */}
      <h1 className="product-title">افزودن محصول جدید</h1>

      {/* form */}
      <form action="#" className="add-products-form">
        <div className="add-products-form-wrap">
          <div className="add-products-form-group">
            <LuTextCursor />
            <input
              className="add-product-input"
              type="text"
              placeholder="اسم محصول را بنویسید..."
              value={newProductTitle}
              onChange={(event) => setNewProductTitle(event.target.value)}
            />
          </div>
          <div className="add-products-form-group">
            <BiDollar />
            <input
              className="add-product-input"
              type="text"
              placeholder="قیمت محصول را بنویسید..."
              value={newProductPrice}
              onChange={(event) => setNewProductPrice(event.target.value)}
            />
          </div>
          <div className="add-products-form-group">
            <BsBag />
            <input
              className="add-product-input"
              type="text"
              placeholder="موجودی محصول را بنویسید..."
              value={newProductCount}
              onChange={(event) => setNewProductCount(event.target.value)}
            />
          </div>
          <div className="add-products-form-group">
            <AiOutlinePicture />
            <input
              className="add-product-input"
              type="text"
              placeholder="آدرس عکس محصول را بنویسید..."
              value={newProductImg}
              onChange={(event) => setNewProductImg(event.target.value)}
            />
          </div>
          <div className="add-products-form-group">
            <BsStar />
            <input
              className="add-product-input"
              type="text"
              placeholder="میزان محبوبیت محصول را بنویسید..."
              value={newProductPopularity}
              onChange={(event) => setNewProductPopularity(event.target.value)}
            />
          </div>
          <div className="add-products-form-group">
            <IoBarChartOutline />
            <input
              className="add-product-input"
              type="text"
              placeholder="میزان فروش محصول را بنویسید..."
              value={newProductSale}
              onChange={(event) => setNewProductSale(event.target.value)}
            />
          </div>
          <div className="add-products-form-group">
            <IoColorPaletteOutline />
            <input
              className="add-product-input"
              type="text"
              placeholder="تعداد رنگ بندی محصول را بنویسید..."
              value={newProductColors}
              onChange={(event) => setNewProductColors(event.target.value)}
            />
          </div>
        </div>
        <button className="add-products-submit" onClick={add_New_Product}>
          ثبت محصول
        </button>
      </form>
    </div>
  );
}
