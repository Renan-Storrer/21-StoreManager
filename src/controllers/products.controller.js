const { productsServices } = require('../services/index');
const { mapError } = require('../utils/errorMap');

const listProducts = async (_req, res) => {
  const { message } = await productsServices.listProducts();

  res.status(200).json(message);
};

const listProductsById = async (req, res) => {
  const { id } = req.params;
  const { type, message } = await productsServices.listProductsById(id);

  if (type) return res.status(mapError(type)).json({ message });

  res.status(200).json(message);
};

const registerProduct = async (req, res) => {
  const { type, message } = await productsServices.registerProduct(req.body);

  if (type) return res.status(mapError(type)).json({ message });

  res.status(201).json(message);
};

const deleteProductById = async (req, res) => {
  const { type, message } = await productsServices.deleteProductById(Number(req.params.id));
  if (type) return res.status(mapError(type)).json({ message });

  return res.status(204).end();
};

const searchProduct = async (req, res) => {
  const { q } = req.query;
  const { message } = await productsServices.searchProduct(q);
  return res.status(200).json(message);
};

const updateProduct = async (req, res) => {
  const { type, message } = await productsServices.updateProduct(req.body, Number(req.params.id));

  if (type) return res.status(mapError(type)).json({ message });

  res.status(200).json(message);
};

module.exports = {
  deleteProductById,
  listProducts,
  listProductsById,
  registerProduct,
  searchProduct,
  updateProduct,
};
