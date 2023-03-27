const salesList = [
  {
    saleId: 1,
    productId: 1,
    quantity: 5,
    date: "2023-01-17T12:34:11.000Z",
  },
  {
    saleId: 1,
    productId: 2,
    quantity: 10,
    date: "2023-01-17T12:34:11.000Z",
  },
  {
    saleId: 2,
    productId: 3,
    quantity: 15,
    date: "2023-01-17T12:34:11.000Z",
  },
];

const validSale = [
  {
    productId: 1,
    quantity: 12,
  },
  {
    productId: 2,
    quantity: 15,
  },
];

module.exports = {
  salesList,
  validSale,
};