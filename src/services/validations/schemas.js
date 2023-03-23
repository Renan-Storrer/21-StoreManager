const Joi = require('joi');

const idSchema = Joi.number().integer().min(1).required();
const registerProductSchema = Joi.object({ name: Joi.string().min(5).required() });
const registerSaleSchema = Joi.object({
  productId: Joi.number().min(1).required(),
  quantity: Joi.number().min(1).required(),
});

module.exports = {
  idSchema,
  registerProductSchema,
  registerSaleSchema,
};