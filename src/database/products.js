const fs = require("fs");
const path = require("path");

// Path to the JSON database file
const DB_PATH = path.join(__dirname, "db.json");

// Helper: Read data from db.json
const readDB = () => {
  const data = fs.readFileSync(DB_PATH, "utf-8");
  return JSON.parse(data);
};

// Helper: Write data to db.json
const writeDB = (data) => {
  fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2), "utf-8");
};

const db = {
  // Get all products
  findAll: () => {
    const data = readDB();
    return data.products;
  },

  // Get product by ID
  findById: (id) => {
    const data = readDB();
    return data.products.find((p) => p.id === id) || null;
  },

  // Create a new product
  create: (productData) => {
    const data = readDB();
    const newProduct = { id: data.nextId, ...productData };
    data.products.push(newProduct);
    data.nextId++;
    writeDB(data);
    return newProduct;
  },

  // Update a product (full replacement)
  update: (id, productData) => {
    const data = readDB();
    const index = data.products.findIndex((p) => p.id === id);
    if (index === -1) return null;
    data.products[index] = { id, ...productData };
    writeDB(data);
    return data.products[index];
  },

  // Partially update a product
  patch: (id, productData) => {
    const data = readDB();
    const index = data.products.findIndex((p) => p.id === id);
    if (index === -1) return null;
    data.products[index] = { ...data.products[index], ...productData };
    writeDB(data);
    return data.products[index];
  },

  // Delete a product
  remove: (id) => {
    const data = readDB();
    const index = data.products.findIndex((p) => p.id === id);
    if (index === -1) return null;
    const deleted = data.products.splice(index, 1)[0];
    writeDB(data);
    return deleted;
  },
};

module.exports = db;
