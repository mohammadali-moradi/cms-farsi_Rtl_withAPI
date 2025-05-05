import React, { useEffect, useState } from "react";
import AddNewProduct from "../AddNewProduct/AddNewProduct";
import ProductsTable from "../ProductsTable/ProductsTable";

export default function Products() {

    // نمایش محصولات
    const [allProducts, SetAllProducts] = useState([]);
  
  useEffect(() => {
    getAllProducts();
  }, []);

  const getAllProducts = () => {
    fetch("http://localhost:4000/api/products/")
      .then((res) => {
        if (res.status === 204) {
          // 204 = No Content
          console.log("No content");
          return null;
        }
        return res.json();
      })
      .then((data) => {
        if (data) console.log(data);
        SetAllProducts(data);
      })
      .catch((err) => console.error("Fetch error:", err));
  };
  return (
    <>
      <AddNewProduct getAllProducts={getAllProducts} />
      <ProductsTable allProducts={allProducts} getAllProducts={getAllProducts} />
    </>
  );
}
