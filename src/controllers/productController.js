const productService = require("../services/productService");
const { invalidateCache } = require("../middleware/cache");

const productController = {
  // GET /products
  getAllProducts: (req, res) => {
    const products = productService.getAllProducts();
    res.json(products);
  },

  // GET /products/:id
  getProductById: (req, res) => {
    const id = parseInt(req.params.id);
    const product = productService.getProductById(id);

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    res.json(product);
  },

  // POST /products
  createProduct: (req, res) => {
    const { name, price, category } = req.body;

    if (!name || price === undefined) {
      return res.status(400).json({ error: "Name and price are required" });
    }

    const newProduct = productService.createProduct({ name, price, category });

    // Invalidate all cache entries since data has changed
    invalidateCache();

    res.status(201).json(newProduct);
  },

  // PUT /products/:id
  updateProduct: (req, res) => {
    const id = parseInt(req.params.id);
    const { name, price, category } = req.body;

    if (!name || price === undefined) {
      return res.status(400).json({ error: "Name and price are required" });
    }

    const updated = productService.updateProduct(id, { name, price, category });

    if (!updated) {
      return res.status(404).json({ error: "Product not found" });
    }

    // Invalidate all cache entries since data has changed
    invalidateCache();

    res.json(updated);
  },

  // PATCH /products/:id
  patchProduct: (req, res) => {
    const id = parseInt(req.params.id);
    const patched = productService.patchProduct(id, req.body);

    if (!patched) {
      return res.status(404).json({ error: "Product not found" });
    }

    // Invalidate all cache entries since data has changed
    invalidateCache();

    res.json(patched);
  },

  // DELETE /products/:id
  deleteProduct: (req, res) => {
    const id = parseInt(req.params.id);
    const deleted = productService.deleteProduct(id);

    if (!deleted) {
      return res.status(404).json({ error: "Product not found" });
    }

    // Invalidate all cache entries since data has changed
    invalidateCache();

    res.json({ message: "Product deleted", product: deleted });
  },
};

module.exports = productController;
