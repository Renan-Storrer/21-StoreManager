const { expect } = require("chai");
const { afterEach } = require("mocha");
const sinon = require("sinon");
const { salesModel, productsModel } = require("../../../src/models");
const { salesService } = require("../../../src/services");
const {
  noProdcutIdSalesResponse,
  noProdcutIdSales,
  noQuantitySales,
  noQuantitySalesResponse,
  invalidQuantitySales,
  invalidQuantitySalesResponse,
  invalidProductIdSales,
  productsList,
  invalidProductIdSalesResponse,
  validSalesResponse,
  validSales,
  salesList,
  salesListResponse,
  salesListByIdResponse,
  salesListByIdInvalidResponse,
} = require("./mocks/sales.service.mock");

describe("Verifica o service de sales", function () {
  afterEach(function () {
    sinon.restore();
  });

  describe("Testa a listagem de vendas", function () {
    
    it("de todas as vendas", async function () {
      sinon.stub(salesModel, "listSales").resolves(salesList);
      const result = await salesService.listSales();
      expect(result).to.be.deep.equal(salesListResponse);
    });

    it("de uma venda específica por id válido", async function () {
      sinon.stub(salesModel, "listSales").resolves(salesList);
      sinon.stub(salesModel, "listSalesById").resolves(salesList[0]);
      const result = await salesService.listSalesById(1);
      expect(result).to.be.deep.equal(salesListByIdResponse);
    });

    it("de uma venda específica por id inválido", async function () {
      sinon.stub(salesModel, "listSales").resolves(salesList);
      const result = await salesService.listSalesById(4);
      expect(result).to.be.deep.equal(salesListByIdInvalidResponse);
    });
  });

  describe("Testa o registro de uma nova venda", function () {
    
    it("quando algum 'productId' estiver indefinido", async function () {
      const result = await salesService.registerSales(noProdcutIdSales);
      expect(result).to.be.deep.equal(noProdcutIdSalesResponse);
    });

    it("quando algum 'quantity' estiver indefinido", async function () {
      const result = await salesService.registerSales(noQuantitySales);
      expect(result).to.be.deep.equal(noQuantitySalesResponse);
    });

    it("quando algum 'quantity' for igual a ou menor que zero", async function () {
      const result = await salesService.registerSales(invalidQuantitySales);
      expect(result).to.be.deep.equal(invalidQuantitySalesResponse);
    });
    it("quando algum 'productId' da venda não existir no banco de dados", async function () {
      sinon.stub(productsModel, "listProducts").resolves(productsList);
      const result = await salesService.registerSales(invalidProductIdSales);
      expect(result).to.be.deep.equal(invalidProductIdSalesResponse);
    });
    it("quando a venda for válida", async function () {
      sinon.stub(productsModel, "listProducts").resolves(productsList);
      sinon.stub(salesModel, "registerSales").resolves(3);
      const result = await salesService.registerSales(validSales);
      expect(result).to.be.deep.equal(validSalesResponse);
    });
  });
});