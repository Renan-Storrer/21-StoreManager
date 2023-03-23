const camelize = require('camelize');
const connection = require('./connection');

const listSales = async () => {
  const [result] = await connection.execute(
    `SELECT 
    sp.sale_id, sp.product_id, sp.quantity, s.date
    FROM
    StoreManager.sales_products AS sp
    INNER JOIN
    StoreManager.sales AS s
    ON s.id = sp.sale_id;`,
  );
  return camelize(result);
};

const listSalesById = async (id) => {
  const [result] = await connection.execute(
    `SELECT 
      sp.product_id, sp.quantity, s.date
      FROM
      StoreManager.sales_products AS sp
      INNER JOIN
      StoreManager.sales AS s
      ON s.id = sp.sale_id
      WHERE s.id = ?;`,
    [id],
  );
  return camelize(result);
};

const registerSales = async (sales) => {
  const [{ insertId }] = await connection.execute(
    'INSERT INTO StoreManager.sales (date) VALUE (NOW())',
  );
  const productsOfSale = sales
    .map(
      ({ productId, quantity }) => `(${insertId}, ${productId}, ${quantity})`,
    )
    .join(', ');
  await connection.execute(
    `INSERT INTO 
    StoreManager.sales_products
    (sale_id, product_id, quantity)
    VALUES
    ${productsOfSale}`,
  );
  return insertId;
};

const deleteSales = async (saleId) => {
  const [result] = await connection.execute(
    'DELETE FROM StoreManager.sales WHERE id = ?;',
    [saleId],
  );
  return camelize(result);
};

const updateSales = async (saleId, sales) => {
  const [deleteResult] = await connection.execute(
    'DELETE FROM StoreManager.sales_products WHERE sale_id = ?',
    [saleId],
  );
  const productsOfSale = sales
    .map(({ productId, quantity }) => `(${saleId}, ${productId}, ${quantity})`)
    .join(', ');
  await connection.execute(
    `INSERT INTO
StoreManager.sales_products 
(sale_id, product_id, quantity) 
VALUES
  ${productsOfSale}`,
  );
  return deleteResult;
};

module.exports = {
  registerSales,
  listSales,
  listSalesById,
  deleteSales,
  updateSales,
};