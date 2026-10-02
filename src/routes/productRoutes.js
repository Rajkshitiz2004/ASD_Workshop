const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");
const { cacheMiddleware } = require("../middleware/cache");

// GET routes — cache middleware applied
router.get("/", cacheMiddleware, productController.getAllProducts);
router.get("/:id", cacheMiddleware, productController.getProductById);

// POST, PUT, PATCH, DELETE — no cache middleware (invalidation happens in controller)
router.post("/", productController.createProduct);
router.put("/:id", productController.updateProduct);
router.patch("/:id", productController.patchProduct);
router.delete("/:id", productController.deleteProduct);

module.exports = router;
