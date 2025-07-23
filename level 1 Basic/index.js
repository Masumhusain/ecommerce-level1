const express = require('express');
const fs = require('fs');
const app = express();
const PORT = 8080;
const path = require("path");

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// Dummy DB file
const dbPath ="./public/products.json";

// GET all products
app.get('/products', (req, res) => {
  const data = JSON.parse(fs.readFileSync(dbPath));
  res.json(data);
});

// POST new product
app.post('/products', (req, res) => {
  const newProduct = req.body;
  const data = JSON.parse(fs.readFileSync(dbPath));
  data.push(newProduct);
  fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));
  res.status(201).json({ message: 'Product added' });
});

// PUT update product
app.put('/products/:id', (req, res) => {
  const data = JSON.parse(fs.readFileSync(dbPath));
  const index = data.findIndex(p => p.id == req.params.id);
  if (index !== -1) {
    data[index] = req.body;
    fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));
    res.json({ message: 'Product updated' });
  } else {
    res.status(404).json({ message: 'Product not found' });
  }
});

// DELETE product
app.delete('/products/:id', (req, res) => {
  let data = JSON.parse(fs.readFileSync(dbPath));
  data = data.filter(p => p.id != req.params.id);
  fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));
  res.json({ message: 'Product deleted' });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});