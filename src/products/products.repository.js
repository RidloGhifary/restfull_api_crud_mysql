const prisma = require("../database/prisma");

const findAllProducts = async () => {
  const products = await prisma.products.findMany();
  return products;
};

const findProductById = async (id) => {
  const product = await prisma.products.findUnique({
    where: {
      id,
    },
  });
  return product;
};

const postProductSingle = async (productData) => {
  const product = await prisma.products.create({
    data: {
      name: productData.name,
      description: productData.description,
      price: productData.price,
      image: productData.image,
    },
  });

  return product;
};

const patchProductById = async (id, productData) => {
  const product = await prisma.products.update({
    where: {
      id,
    },
    data: {
      name: productData.name,
      description: productData.description,
      price: productData.price,
      image: productData.image,
    },
  });

  return product;
};

const deleteProductSingleById = async (id) => {
  const product = prisma.products.delete({
    where: {
      id,
    },
  });
  return product;
};

module.exports = {
  findAllProducts,
  findProductById,
  postProductSingle,
  patchProductById,
  deleteProductSingleById,
};
