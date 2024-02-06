const {
  findAllProducts,
  findProductById,
  postProductSingle,
  patchProductById,
  deleteProductSingleById,
} = require("./products.repository");

const getAllProducts = async () => {
  const getAllProducts = await findAllProducts();
  return getAllProducts;
};

const getProductById = async (id) => {
  const getProductById = await findProductById(id);
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

  const addProduct = await postProductSingle(productData);

  return addProduct;
};

const editProductById = async (id, productData) => {
  await getProductById(id);

  const product = await patchProductById(id, productData);

  if (!product) throw Error("Failed edit data");

  return product;
};

const updateProductById = async (id, productData) => {
  if (
    !(
      productData.name &&
      productData.description &&
      productData.price &&
      productData.image
    )
  )
    throw Error("Something required is missing");

  const product = await editProductById(id, productData);
  return product;
};

const deleteProductById = async (id) => {
  await getProductById(id);

  return await deleteProductSingleById(id);
};

module.exports = {
  getAllProducts,
  getProductById,
  addProduct,
  updateProductById,
  editProductById,
  deleteProductById,
};
