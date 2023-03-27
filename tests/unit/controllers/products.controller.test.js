const chai = require("chai");
const sinon = require("sinon");
const sinonChai = require("sinon-chai");

const { expect } = chai;
chai.use(sinonChai);
const { productsController } = require("../../../src/controllers");
const { productsServices } = require("../../../src/services");
const {
  products,
  breadProduct,
  productNotFound,
  fubaProduct,
  breadStub,
  fubaStub,
} = require("./mocks/products.controller.mock");

describe("Teste de unidade do Controller na rota /products", function () {
  afterEach(function () {
    sinon.restore();
  });

  describe("Listando os produtos", function () {
    it("Deve retornar o status 200 e a lista de produtos", async function () {
      const res = {};
      const req = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon
        .stub(productsServices, "listProducts")
        .resolves({ type: null, message: products });

      await productsController.listProducts(req, res);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(products);
    });
  });

  describe("Buscando um produto por id", function () {
    it("deve responder com status 200 e os dados do produto quando existir", async function () {
      const res = {};
      const req = { params: { id: 1 } };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon
        .stub(productsServices, "listProductsById")
        .resolves({ type: null, message: products[0] });

      await productsController.listProductsById(req, res);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(products[0]);
    });

    it("ao passar um id que não existe no banco deve retornar um erro", async function () {
      const res = {};
      const req = { params: { id: 9999 } };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(productsServices, "listProductsById").resolves(productNotFound);

      await productsController.listProductsById(req, res);

      expect(res.status).to.have.been.calledWith(404);

      expect(res.json).to.have.been.calledWith({
        message: "Product not found",
      });
    });
  });

  describe("Cadastrando um produto novo", function () {
    it('com o name "pão francês"', async function () {
      const req = { body: breadProduct };
      const res = {};
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon.stub(productsServices, "registerProduct").resolves(breadStub);

      await productsController.registerProduct(req, res);

      expect(res.status).to.have.been.calledWith(201);
      expect(res.json).to.have.been.calledWith(breadStub.message);
    });

    it('com o name "Fubá" (curto demais)', async function () {
      const req = { body: fubaProduct };
      const res = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon.stub(productsServices, "registerProduct").resolves(fubaStub);

      await productsController.registerProduct(req, res);

      expect(res.status).to.have.been.calledWith(422);
      expect(res.json).to.have.been.calledWith({ message: fubaStub.message });
    });
  });

  describe("Atualizando um produto", function () {
    it('com um id que não existe no banco de dados, retorna status 404 e "Product not found"', async function () {
      const req = { params: 123123, body: { name: "Manteiga" } };
      const res = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(productsServices, "updateProduct").resolves(productNotFound);
      await productsController.updateProduct(req, res);
      expect(res.status).to.have.been.calledWith(404);
      expect(res.json).to.have.been.calledWith({
        message: productNotFound.message,
      });
    });
    it('com um id que existe no banco de dados, retorna status 200 e o novo produto', async function () {
      const req = { params: 123123, body: breadProduct };
      const res = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(productsServices, "updateProduct").resolves(breadStub);
      await productsController.updateProduct(req, res);
      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(breadStub.message);
    });
  })

  describe("Deletando um produto", function () {
    it('com um id que não existe no banco de dados, retorna status 404 e "Product not found"', async function () {
      const req = { params: 123123 };
      const res = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon
        .stub(productsServices, "deleteProductById")
        .resolves(productNotFound);

      await productsController.deleteProductById(req, res);

      expect(res.status).to.have.been.calledWith(404);
      expect(res.json).to.have.been.calledWith({
        message: productNotFound.message,
      });
    });

    it("com um id que existe no banco de dados, retorna status 204 apenas", async function () {
      const req = { params: { id: 2 }, body: { name: "Manteiga" } };
      const res = {};

      res.status = sinon.stub().returns(res);
      res.end = sinon.stub().returns(res);

      sinon.stub(productsServices, "deleteProductById").resolves({});

      await productsController.deleteProductById(req, res);

      expect(res.status).to.have.been.calledWith(204);
    });
  });
});