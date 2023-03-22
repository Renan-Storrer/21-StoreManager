const { expect } = require('chai');
const { productsServices } = require('../../../src/services');
const { productsModel } = require('../../../src/models');
const { allProducts } = require('./mocks/product.service.mock');

const sinon = require('sinon');

describe('Testes de unidade do serviceProduct', function () {

  describe('Listagem de todos os produtos', function () {

    it('Verifica se retorna a lista de produtos', async function () {
      sinon.stub(productsModel, 'findAll').resolves(allProducts);

      const result = await productsServices.findAll();

      expect(result.type).to.be.equal(null);
      expect(result.message).to.deep.equal(allProducts);
    });
  });

  describe('Listagem de um único produto', function () {

    it('Verifica se retorna um único produto se o ID existir', async function () {

      sinon.stub(productsModel, 'findById').resolves(allProducts[0]);

      const result = await productsServices.findById(1);

      expect(result.type).to.be.equal(null);
      expect(result.message).to.deep.equal(allProducts[0]);
    });

    it('Verifica se retorna um erro caso o ID seja inválido', async function () {

      const result = await productsServices.findById('a');

      expect(result.type).to.be.equal('INVALID_VALUE');
      expect(result.message).to.deep.equal('"id" must be a number');
    });

    it('Verifica se retorna um erro caso o produto não exista', async function () {

      sinon.stub(productsModel, 'findById').resolves(undefined);

      const result = await productsServices.findById(999);
      expect(result.message).to.deep.equal('Product not found');
      expect(result.type).to.be.equal('PRODUCT_NOT_FOUND');
    });
  });

  afterEach(function () {
    sinon.restore();
  });
  
});