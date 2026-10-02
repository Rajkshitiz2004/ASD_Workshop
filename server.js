const express = require("express");
const productRoutes = require("./src/routes/productRoutes");

const app = express();
const PORT = 3000;

// Parse JSON request bodies
app.use(express.json());

// Mount product routes
app.use("/products", productRoutes);

// Root route
app.get("/", (req, res) => {
  res.json({ message: "Products API - ASD Workshop" });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
