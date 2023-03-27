const products = [
  {
    id: 1,
    name: "Martelo de Thor",
  },
  {
    id: 2,
    name: "Traje de encolhimento",
  },
  {
    id: 3,
    name: "Escudo do Capitão América",
  },
];

const newProduct = { name: "Manteiga" };

const newInvalidProduct = { name: "Sal" };

const manteigaResponse = { type: null, message: { id: 4, name: "Manteiga" } };

const salResponse = { type: "INVALID_VALUE", message: '"name" length must be at least 5 characters long' };

const productNotFound = {
  type: "PRODUCT_NOT_FOUND",
  message: "Product not found",
};

module.exports = {
  products,
  newProduct,
  newInvalidProduct,
  manteigaResponse,
  salResponse,
  productNotFound,
};
