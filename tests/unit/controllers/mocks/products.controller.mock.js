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

const breadProduct = { name: "Pão francês" };
const fubaProduct = { name: "Fubá" };

const breadStub = { type: null, message: { id: 7, name: "Pão francês" } };
const fubaStub = { type: 'INVALID_VALUE', message: '"name" length must be at least 5 characters long' };

const productNotFound = {
  type: "PRODUCT_NOT_FOUND",
  message: "Product not found",
};

const manteigaResponse = { type: null, message: { id: 1, name: "Manteiga" } };

module.exports = {
  products,
  breadProduct,
  fubaProduct,
  breadStub,
  fubaStub,
  productNotFound,
  manteigaResponse,
};
