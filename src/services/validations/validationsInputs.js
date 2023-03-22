const { idSchema, registerProductSchema } = require('./schemas');

const validateId = (id) => {
  const { error } = idSchema.validate(id);
  if (error) return { type: 'INVALID_VALUE', message: '"id" must be a number' };
  return { type: null, message: '' };
};

const validateRegisterProduct = (product) => {
  const { error } = registerProductSchema.validate(product);
  if (error) {
    return {
      type: product.name ? 'INVALID_VALUE' : 'UNDEFINED_VALUE',
      message: error.message,
    };
  }
  return { type: null, message: '' };
};

module.exports = {
  validateId,
  validateRegisterProduct,
};