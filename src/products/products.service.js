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

  if (!getProductById) throw Error("product not found");

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
    throw Error("Something required is missing");

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
    throw Error("Something required is missing");

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
  await getProductById(id);

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

  if (!product) throw Error("Failed edit data");

  return product;
};

const deleteProductById = async (id) => {
  await getProductById(id);

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
  deleteProductById,
};
