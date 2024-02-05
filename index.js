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
  res
    .status(200)
    .json({ status: 200, message: "Success getting datas", datas: products });
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

app.put("/products/:id", async (req, res) => {
  const productId = req.params.id;
  const productsData = req.body;

  if (
    !(
      productsData.name &&
      productsData.description &&
      productsData.price &&
      productsData.image
    )
  ) {
    res
      .status(400)
      .json({ status: 400, message: "Something data required is missing" });
  }

  const product = await prisma.products.update({
    where: {
      id: productId,
    },
    data: {
      name: productsData.name,
      description: productsData.description,
      price: productsData.price,
      image: productsData.image,
    },
  });

  res.status(200).json({ message: "Success update data", product });
});

app.patch("/products/:id", async (req, res) => {
  const productId = req.params.id;
  const productsData = req.body;

  const product = await prisma.products.update({
    where: {
      id: productId,
    },
    data: {
      name: productsData.name,
      description: productsData.description,
      price: productsData.price,
      image: productsData.image,
    },
  });

  res.status(200).json({ message: "Success update data", product });
});

app.delete("/products/:id", async (req, res) => {
  const productId = req.params.id;
  await prisma.products.delete({
    where: {
      id: productId,
    },
  });

  res.status(200).json({ messages: "Success deleted data" });
});

app.listen(PORT, () => console.log("Server Listening on port: " + PORT));
