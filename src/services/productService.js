const db = require("../database/products");

const productService = {
  getAllProducts: () => {
    return db.findAll();
  },

  getProductById: (id) => {
    return db.findById(id);
  },

  createProduct: (productData) => {
    return db.create(productData);
  },

  updateProduct: (id, productData) => {
    return db.update(id, productData);
  },

  patchProduct: (id, productData) => {
    return db.patch(id, productData);
  },

  deleteProduct: (id) => {
    return db.remove(id);
  },
};

module.exports = productService;
