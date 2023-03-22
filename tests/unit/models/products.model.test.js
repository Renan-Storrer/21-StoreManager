const { expect } = require('chai');
const { productsModel } = require('../../../src/models')
const sinon = require('sinon');

const connection = require('../../../src/models/connection');
const { allProducts } = require('./mocks/products.model.mock');

describe('Testes de unidade do modelProduct', function () {

  it('Verificia se recupera a lista de produtos', async function () {

    sinon.stub(connection, 'execute').resolves([allProducts]);

    const result = await productsModel.findAll();

    expect(result).to.deep.equal(allProducts);
  });

  it('Verifica se recupera um item da lista', async function () {

    sinon.stub(connection, 'execute').resolves([[allProducts[0]]]);

    const result = await productsModel.findById(1);

    expect(result).to.deep.equal(allProducts[0]);
  });

  afterEach(function () {
    sinon.restore();
  });
  
});