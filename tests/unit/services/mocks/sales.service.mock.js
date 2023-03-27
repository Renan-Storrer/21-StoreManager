const productsList = [
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

const salesList = [
  {
    saleId: 1,
    productId: 1,
    quantity: 5,
    date: "2023-01-17T17:19:25.000Z",
  },
  {
    saleId: 1,
    productId: 2,
    quantity: 10,
    date: "2023-01-17T17:19:25.000Z",
  },
  {
    saleId: 2,
    productId: 3,
    quantity: 15,
    date: "2023-01-17T17:19:25.000Z",
  },
];

const salesListResponse = { type: null, message: salesList };

const salesListByIdResponse = { type: null, message: salesList[0] };

const salesListByIdInvalidResponse = { type: "SALE_NOT_FOUND", message: "Sale not found" };

const noProdcutIdSales = [
  {
    quantity: 1,
  },
  {
    productId: 2,
    quantity: 5,
  },
];
const noQuantitySales = [
  {
    productId: 1,
    quantity: 1,
  },
  {
    productId: 2,
  },
];

const invalidQuantitySales = [
  {
    productId: 1,
    quantity: 0,
  },
  {
    productId: 2,
    quantity: 0,
  },
];
const invalidProductIdSales = [
  {
    productId: 11111111,
    quantity: 2,
  },
  {
    productId: 2,
    quantity: 5,
  },
];

const validSales = [
  {
    productId: 1,
    quantity: 2,
  },
  {
    productId: 2,
    quantity: 5,
  },
];

const noProdcutIdSalesResponse = {
  type: "UNDEFINED_VALUE",
  message: '"productId" is required',
};
const noQuantitySalesResponse = {
  type: "UNDEFINED_VALUE",
  message: '"quantity" is required',
};

const invalidQuantitySalesResponse = {
  type: "INVALID_VALUE",
  message: '"quantity" must be greater than or equal to 1',
};

const invalidProductIdSalesResponse = {
  type: "PRODUCT_NOT_FOUND",
  message: "Product not found",
};

const validSalesResponse = {
  type: null,
  message: {
    id: 3,
    itemsSold: [
      {
        productId: 1,
        quantity: 2,
      },
      {
        productId: 2,
        quantity: 5,
      },
    ],
  },
};
module.exports = {
  productsList,
  salesList,
  salesListResponse,
  salesListByIdResponse,
  salesListByIdInvalidResponse,
  noProdcutIdSales,
  noProdcutIdSalesResponse,
  noQuantitySales,
  noQuantitySalesResponse,
  invalidQuantitySales,
  invalidQuantitySalesResponse,
  invalidProductIdSales,
  invalidProductIdSalesResponse,
  validSales,
  validSalesResponse,
};