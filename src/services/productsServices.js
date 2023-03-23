const schema = require('./validations/validationsInputs');
const { productsModel } = require('../models');

const listProducts = async () => {
  const products = await productsModel.listProducts();
  return { type: null, message: products };
};

const listProductsById = async (productId) => {
  const product = await productsModel.listProductsById(productId);
  if (!product) {
    return { type: 'PRODUCT_NOT_FOUND', message: 'Product not found' };
  }

  return { type: null, message: product };
};

const deleteProductById = async (productId) => {
  const products = await productsModel.listProducts();
  const productsIds = products.map(({ id }) => +id);
  if (!productsIds.includes(productId)) {
    return { type: 'PRODUCT_NOT_FOUND', message: 'Product not found' };
  }

  await productsModel.deleteProductById(productId);
  return {};
};

const registerProduct = async (product) => {
  const error = schema.validateRegisterProduct(product);
  if (error.type) return error;

  const newProductId = await productsModel.registerProduct(product.name);
  const newProduct = await productsModel.listProductsById(newProductId);

  return { type: null, message: newProduct };
};

const searchProduct = async (searchTerm) => {
  const queryResult = await productsModel.searchProduct(searchTerm);
  return { type: null, message: queryResult };
};

const updateProduct = async (product, productId) => {
  const error = schema.validateRegisterProduct(product);
  if (error.type) return error;
  const products = await productsModel.listProducts();
  const productsIds = products.map(({ id }) => +id);
  if (!productsIds.includes(productId)) {
    return { type: 'PRODUCT_NOT_FOUND', message: 'Product not found' };
  }

  await productsModel.updateProduct(product.name, productId);
  const newProduct = await productsModel.listProductsById(productId);

  return { type: null, message: newProduct };
};

module.exports = {
  deleteProductById,
  listProducts,
  listProductsById,
  registerProduct,
  searchProduct,
  updateProduct,
};