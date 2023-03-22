const { productsServices } = require('../services');
const errorMap = require('../utils/errorMap');

const findAll = async (_req, res) => {
  const { type, message } = await productsServices.findAll();

  if (type) return res.status(errorMap.mapError(type)).json(message);
  return res.status(200).json(message);
};

const findById = async (req, res) => {
  const { id } = req.params;
  const { type, message } = await productsServices.findById(id);

  if (type) return res.status(errorMap.mapError(type)).json({ message });
  return res.status(200).json(message);
};

module.exports = {
  findAll,
  findById,
};