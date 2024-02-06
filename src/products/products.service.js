const prisma = require("../database/prisma");

const getAllProducts = async () => {
  const getAllProducts = await prisma.products.findMany();
  return getAllProducts;
};

const getProductById = async (id) => {
  const getProductById = await prisma.products.findUnique({
    where: {
      id,
    },
  });

  return getProductById;
};

const addProduct = async (productData) => {
  if (
    !(
      productData.name &&
      productData.description &&
      productData.price &&
      productData.image
    )
  )
    return { status: 404 };

  const addProduct = await prisma.products.create({
    data: {
      name: productData.name,
      description: productData.description,
      price: productData.price,
      image: productData.image,
    },
  });

  return addProduct;
};

const updateProduct = async (id, productData) => {
  if (
    !(
      productData.name &&
      productData.description &&
      productData.price &&
      productData.image
    )
  )
    return { status: 400 };

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

const editProduct = async (id, productData) => {
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

const deleteProduct = async (id) => {
  return await prisma.products.delete({
    where: {
      id,
    },
  });
};

module.exports = {
  getAllProducts,
  getProductById,
  addProduct,
  updateProduct,
  editProduct,
  deleteProduct,
};
