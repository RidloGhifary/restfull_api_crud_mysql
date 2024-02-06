const express = require("express");
const prisma = require("../database/prisma.js");

const router = express.Router();

router.get("/", async (req, res) => {
  const products = await prisma.products.findMany();
  res
    .status(200)
    .json({ status: 200, message: "Success getting datas", datas: products });
});

router.get("/:id", async (req, res) => {
  const productId = req.params.id;

  const product = await prisma.products.findUnique({
    where: {
      id: productId,
    },
  });

  if (!productId)
    res
      .status(404)
      .json({ status: 404, message: `Cannot find id ${productId}` });

  res
    .status(200)
    .json({ status: 200, message: "Success get product", product });
});

router.post("/", async (req, res) => {
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

router.put("/:id", async (req, res) => {
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

router.patch("/:id", async (req, res) => {
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

router.delete("/:id", async (req, res) => {
  const productId = req.params.id;
  await prisma.products.delete({
    where: {
      id: productId,
    },
  });

  res.status(200).json({ messages: "Success deleted data" });
});

module.exports = router;
