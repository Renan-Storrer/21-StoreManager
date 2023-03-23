const {
  idSchema,
  registerProductSchema,
  registerSaleSchema,
} = require('./schemas');

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

const validateSalesById = (sales, id) => {
  const idSales = sales.map(({ saleId }) => saleId);
  if (!idSales.includes(id)) {
    return { type: 'SALE_NOT_FOUND', message: 'Sale not found' };
  }
  return { type: null, message: '' };
};

const validateRegisterSale = (sales, productsList) => {
  const salesErrorArr = sales.map((sale) => registerSaleSchema.validate(sale));
  if (salesErrorArr.some((sale) => sale.error)) {
    const { error } = salesErrorArr.find((sale) => sale.error);
    return {
      type: error.message.includes('required')
        ? 'UNDEFINED_VALUE'
        : 'INVALID_VALUE',
      message: error.message,
    };
  }
  const productsIds = productsList.map(({ id }) => +id);
  if (sales.some(({ productId }) => !productsIds.includes(productId))) {
    return { type: 'PRODUCT_NOT_FOUND', message: 'Product not found' };
  }
  return { type: null, message: '' };
};

const validateUpdateSales = (sales, productsList, salesList, salesId) => {
  let error = validateRegisterSale(sales, productsList);
  if (error.type) return error;
  error = validateSalesById(salesList, salesId);
  if (error.type) return error;
  return { type: null, message: '' };
};

module.exports = {
  validateId,
  validateRegisterProduct,
  validateSalesById,
  validateRegisterSale,
  validateUpdateSales,
};
