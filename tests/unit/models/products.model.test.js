const { expect } = require('chai');
const sinon = require('sinon');
const { productsModel } = require('../../../src/models');

const connection = require('../../../src/models/connection');
const { products, newProduct } = require('./mocks/products.model.mock');

describe("Testes de unidade do Model na rota /products", function () {
  it("Recuperando a lista de produtos", async function () {
    sinon.stub(connection, "execute").resolves([products]);

    const result = await productsModel.listProducts();

    expect(result).to.be.deep.equal(products);
  });

  it("Recuperando uma produto a partir do seu id", async function () {
    sinon.stub(connection, "execute").resolves([[products[0]]]);

    const result = await productsModel.listProductsById(1);

    expect(result).to.be.deep.equal(products[0]);
  });

  it('Cadastrando um novo produto de name "Manteiga"', async function () {
    sinon.stub(connection, "execute").resolves([{ insertId: 4 }]);

    const result = await productsModel.registerProduct(newProduct);

    expect(result).to.be.deep.equal(4);


  });
  it("Deletando produto", async function () {
    sinon.stub(connection, "execute").resolves({ affectedRows: 1 });
    const result = await productsModel.deleteProductById(1);

    expect(result).to.be.deep.equal({ affectedRows: 1 });
  });

  it('Atualizando um produto com id existente e com um nome válido', async function () {
    sinon.stub(connection, "execute").resolves([{
      fieldCount: 0,
      affectedRows: 1,
      insertId: 0,
      info: "Rows matched: 1  Changed: 1  Warnings: 0",
      serverStatus: 2,
      warningStatus: 0,
      changedRows: 1,
    }]);

    const result = await productsModel.updateProduct('Picolé Kibom', 2);
    expect(result.changedRows).to.be.equal(1);
  })
  afterEach(function () {
    sinon.restore();
  });
});
