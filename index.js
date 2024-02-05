const express = require("express");
const { PrismaClient } = require("@prisma/client");
const dotenv = require("dotenv");

dotenv.config();
const PORT = process.env.PORT;
const app = express();
const prisma = new PrismaClient();

app.get("/products", async (req, res) => {
  const products = await prisma.products.findMany();
  res.json(products);
});

app.listen(PORT, () => console.log("Server Listening on port: " + PORT));
