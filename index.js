const express = require("express");
const { PrismaClient } = require("@prisma/client");
const dotenv = require("dotenv");

dotenv.config();
const PORT = process.env.PORT;
const app = express();

app.use(express.json());

const prisma = new PrismaClient();

app.get("/products", async (req, res) => {
  const products = await prisma.products.findMany();
  res.json(products);
});

app.post("/products", async (req, res) => {
  const productsData = req.body;

  const product = await prisma.products.create({
    data: {
      name: productsData.name,
      description: productsData.description,
      price: productsData.price,
      image: productsData.image,
    },
  });

  res.status(200).json({ message: "Success added data", product });
});

app.listen(PORT, () => console.log("Server Listening on port: " + PORT));
