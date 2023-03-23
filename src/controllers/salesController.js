const { salesService } = require('../services');
const { mapError } = require('../utils/errorMap');

const listSales = async (req, res) => {
  const { type, message } = await salesService.listSales();
  if (type) return res.status(mapError(type)).json({ message });
  return res.status(200).json(message);
};

const listSalesById = async (req, res) => {
  const { id } = req.params;
  const { type, message } = await salesService.listSalesById(Number(id));
  if (type) return res.status(mapError(type)).json({ message });
  return res.status(200).json(message);
};

const registerSales = async (req, res) => {
  const { type, message } = await salesService.registerSales(req.body);
  if (type) return res.status(mapError(type)).json({ message });
  return res.status(201).json(message);
};

const deleteSales = async (req, res) => {
  const { type, message } = await salesService.deleteSales(Number(req.params.id));
  if (type) return res.status(mapError(type)).json({ message });
  return res.status(204).end();
};

const updateSales = async (req, res) => {
  const { id } = req.params;
  const { type, message } = await salesService.updateSales(Number(id), req.body);
  if (type) return res.status(mapError(type)).json({ message });
  return res.status(200).json(message);
};

module.exports = {
  deleteSales,
  listSales,
  listSalesById,
  registerSales,
  updateSales,
};