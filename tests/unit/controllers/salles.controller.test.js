const chai = require("chai");
const sinon = require("sinon");
const sinonChai = require("sinon-chai");
const { salesController } = require("../../../src/controllers");
const { salesService } = require("../../../src/services");
const {
  salesList,
  newValidSale,
  newInvalidSale,
  newValidSaleResponse,
} = require("./mocks/sales.controller.mock");

const { expect } = chai;
chai.use(sinonChai);

describe("Teste de unidade do Controller da rota /sales", function () {
  afterEach(function () {
    sinon.restore();
  });

  describe("Listando as vendas", function () {
    it("Deve retornar o status 200 e a lista de todas as vendas", async function () {
      const res = {};
      const req = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon
        .stub(salesService, "listSales")
        .resolves({ type: null, message: salesList });
      await salesController.listSales(req, res);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(salesList);
    });

    it("Deve retornar o status 200 e a venda quando consulta um id válido na rota /:id", async function () {
      const res = {};
      const req = { params: { id: 1 } };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon
        .stub(salesService, "listSalesById")
        .resolves({ type: null, message: salesList[0] });

      await salesController.listSalesById(req, res);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(salesList[0]);
    });
    it("Deve retornar o status 404 e a venda quando consulta um id inválido na rota /:id", async function () {
      const res = {};
      const req = { params: { id: 1123 } };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon
        .stub(salesService, "listSalesById")
        .resolves({ type: "SALE_NOT_FOUND", message: "Sale not found" });
      await salesController.listSalesById(req, res);

      expect(res.status).to.have.been.calledWith(404);
      expect(res.json).to.have.been.calledWith({
        message: "Sale not found",
      });
    });
  });
  describe("Registrando vendas", function () {
    it("quando a venda é válida retorna o status 201 e a mensagem", async function () {
      const res = {};
      const req = { body: newValidSale };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon
        .stub(salesService, "registerSales")
        .resolves({ type: null, message: newValidSaleResponse });

      await salesController.registerSales(req, res);

      expect(res.status).to.have.been.calledWith(201);
      expect(res.json).to.have.been.calledWith(newValidSaleResponse);

      it("quando a venda é inválida retorna o status 404 e a mensagem", async function () {
        const res = {};
        const req = { body: newInvalidSale };

        res.status = sinon.stub().returns(res);
        res.json = sinon.stub().returns();

        sinon
          .stub(salesService, "registerSales")
          .resolves({
            type: "PRODUCT_NOT_FOUND",
            message: "Product not found",
          });

        await salesController.registerSales(req, res);

        expect(res.status).to.have.been.calledWith(404);
        expect(res.json).to.have.been.calledWith({
          message: "Product not found",
        });
      });
    });
  });
});
