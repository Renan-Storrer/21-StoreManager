const { expect } = require("chai");
const sinon = require("sinon");
const { salesModel } = require("../../../src/models");

const connection = require("../../../src/models/connection");
const { salesList, validSale } = require("./mocks/sales.model.mock");

describe("Testes de unidade do Model na rota /sales", function () {
  afterEach(function () {
    sinon.restore();
  })
  describe("Testando a listagem de vendas", function () {
    it("de todas as vendas", async function () {
      sinon.stub(connection, "execute").resolves([salesList]);

      const result = await salesModel.listSales();

      expect(result).to.be.deep.equal(salesList);
    });

    it("de uma venda a partir do seu id", async function () {
      sinon.stub(connection, "execute").resolves([salesList[0]]);

      const result = await salesModel.listSalesById(1);

      expect(result).to.be.deep.equal(salesList[0]);
    });
  });
  describe("Testando o registro de vendas", function () {
    it('de uma venda válida', async function () {
      sinon.stub(connection, "execute").resolves([{ insertId: 4 }]);

      const response = await salesModel.registerSales(validSale);

      expect(response).to.be.deep.equal(4);
    })
  });
});