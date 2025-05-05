const express = require("express");
const MyShopDB = require("../db/My_Shop");

const productsRouter = express.Router();

// routes

// productsRouter.get("/", (req, res) => {
//   console.log('get products');
//   let selectAllProductsQuery = `SELECT * FROM Products`;
//   MyShopDB.query(selectAllProductsQuery, (err, result) => {
//     console.log('get products query');
//     if (err) {
//       console.log(err);
//       res.send(null);
//     } else {
//       console.log('get products query result');
//       res.send(result);
//     }
//   });
// });
////////////////////// start chat gpt ///////////////////////////
productsRouter.get("/", (req, res) => {
  console.log("➡️  GET /api/products called");

  const selectAllProductsQuery = "SELECT * FROM Products";

  MyShopDB.query(selectAllProductsQuery, (err, result) => {
    if (err) {
      console.error("❌ Database error:", err);
      return res.status(500).json({ error: "Internal Server Error", details: err.message });
    }

    console.log("✅ Products fetched:", result.length, "rows");
    res.status(200).json(result);
  });
});
////////////////////// end chat gpt ///////////////////////////




productsRouter.delete("/:productID", (req, res) => {
  let productID = req.params.productID;
  let deleteProductQuery = `DELETE FROM Products WHERE id = ${productID}`;

  MyShopDB.query(deleteProductQuery, (err, result) => {
    if (err) {
      res.send(null);
    } else {
      res.send(result);
    }
  });
});

productsRouter.put("/:productID", (req, res) => {
  let body = req.body;
  let productID = req.params.productID;

  let updateProductQuery = `UPDATE Products SET title="${body.title}", price=${body.price}, count=${body.count} ,images="${body.images}",popularity=${body.popularity},sale=${body.sale},colors=${body.colors} WHERE id = ${productID}`;
  MyShopDB.query(updateProductQuery, (err, result) => {
    if (err) {
      console.log(err);
      res.send(null);
    } else {
      res.send(result);
    }
  });
});

productsRouter.post("/", (req, res) => {
  let body = req.body;
  let addNewProductQuery = `INSERT INTO Products VALUES (NULL, "${body.title}", ${body.price}, ${body.count}, "${body.images}", ${body.popularity}, ${body.sale}, ${body.colors})`;

  MyShopDB.query(addNewProductQuery, (err, result) => {
    if (err) {
      console.log(err);
      res.send(null);
    } else {
      res.send(result);
    }
  });
});

module.exports = productsRouter;



// const express = require("express");
// const MyShopDB = require("../db/My_Shop");

// const productsRouter = express.Router();

// // GET all products
// productsRouter.get("/", (req, res) => {
//   let selectAllProductsQuery = `SELECT * FROM Products`;
//   MyShopDB.query(selectAllProductsQuery, (err, result) => {
//     if (err) {
//       console.log("DB Error:", err);
//       return res.status(500).json({ error: "Database error" });
//     }
//     res.status(200).json(result || []); // اگر نتیجه خالی بود، آرایه‌ی خالی بده
//   });
// });

// // DELETE a product
// productsRouter.delete("/:productID", (req, res) => {
//   const productID = req.params.productID;
//   const deleteProductQuery = `DELETE FROM Products WHERE id = ${productID}`;

//   MyShopDB.query(deleteProductQuery, (err, result) => {
//     if (err) {
//       console.log("Delete Error:", err);
//       return res.status(500).json({ error: "Delete failed" });
//     }
//     res.status(200).json(result);
//   });
// });

// // UPDATE a product
// productsRouter.put("/:productID", (req, res) => {
//   const body = req.body;
//   const productID = req.params.productID;

//   const updateProductQuery = `
//     UPDATE Products 
//     SET title="${body.title}", price=${body.price}, count=${body.count}, 
//         images="${body.images}", popularity=${body.popularity}, 
//         sale=${body.sale}, colors=${body.colors}
//     WHERE id = ${productID}`;

//   MyShopDB.query(updateProductQuery, (err, result) => {
//     if (err) {
//       console.log("Update Error:", err);
//       return res.status(500).json({ error: "Update failed" });
//     }
//     res.status(200).json(result);
//   });
// });

// // CREATE a new product
// productsRouter.post("/", (req, res) => {
//   const body = req.body;

//   const addNewProductQuery = `
//     INSERT INTO Products 
//     VALUES (NULL, "${body.title}", ${body.price}, ${body.count}, 
//             "${body.images}", ${body.popularity}, ${body.sale}, ${body.colors})`;

//   MyShopDB.query(addNewProductQuery, (err, result) => {
//     if (err) {
//       console.log("Insert Error:", err);
//       return res.status(500).json({ error: "Insert failed" });
//     }
//     res.status(201).json(result);
//   });
// });

// module.exports = productsRouter;
