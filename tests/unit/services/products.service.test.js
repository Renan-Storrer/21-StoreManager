const { expect } = require("chai");
const sinon = require("sinon");

const { productsModel } = require("../../../src/models");
const { productsService } = require("../../../src/services");
const {
  products,
  newProduct,
  manteigaResponse,
  salResponse,
  newInvalidProduct,
  productNotFound,
} = require("./mocks/products.service.mock");

describe("Verificando service de products", function () {

  describe("listagem de produtos", function () {

    it("retorna a lista completa de produtos", async function () {
      sinon.stub(productsModel, "listProducts").resolves(products);

      const result = await productsService.listProducts();

      expect(result.type).to.be.equal(null);
      expect(result.message).to.deep.equal(products);
    });
  });

  describe("busca de produto por id", function () {

    it("retorna um erro caso o produto não exista", async function () {
      sinon.stub(productsModel, "listProductsById").resolves(undefined);

      const result = await productsService.listProductsById(12);

      expect(result.type).to.equal("PRODUCT_NOT_FOUND");
      expect(result.message).to.equal("Product not found");
    });

    it("retorna o produto caso o ID seja existente", async function () {
      sinon.stub(productsModel, "listProductsById").resolves(products[0]);

      const result = await productsService.listProductsById(1);

      expect(result.type).to.equal(null);
      expect(result.message).to.deep.equal(products[0]);
    });
  });

  describe("Cadastrando um novo produto", () => {

    it('com o name "Manteiga"', async function () {
      sinon.stub(productsModel, "registerProduct").resolves(4);
      sinon
        .stub(productsModel, "listProductsById")
        .resolves({ id: 4, name: "Manteiga" });

      const result = await productsService.registerProduct(newProduct);

      expect(result).to.be.deep.equal(manteigaResponse);
    });

    it('com o name "Sal" (curto demais)', async function () {

      sinon.stub(productsModel, "registerProduct").resolves(4);
      sinon
        .stub(productsModel, "listProductsById")
        .resolves({ id: 4, name: "Manteiga" });

      const result = await productsService.registerProduct(newInvalidProduct);

      expect(result).to.be.deep.equal(salResponse);
    });
  });

  describe("Deletando um produto", () => {

    it("quando seu id se encontra no banco de dados, não retorna type PRODUCT_NOT_FOUND", async function () {
      sinon.stub(productsModel, "listProducts").resolves(products);
      sinon.stub(productsModel, "updateProduct").resolves({ affectedRows: 1 });
      const result = await productsService.deleteProductById(1);
      expect(Object.keys(result).length).to.be.deep.equal(0);
    });

    it("quando seu id não se encontra no banco de dados, retorna type PRODUCT_NOT_FOUND", async function () {
      sinon.stub(productsModel, "listProducts").resolves(products);
      const result = await productsService.deleteProductById(12);
      expect(result).to.be.deep.equal(productNotFound);
    });
  });

  describe("Atualizando um produto", () => {

    it('com um id inválido, resulta em erro', async function () {
      sinon.stub(productsModel, "listProducts").resolves(products);
      const result = await productsService.updateProduct({ name: "Picolé Kibom" }, 1123123);

      expect(result).to.be.deep.equal({
        type: "PRODUCT_NOT_FOUND",
        message: 'Product not found',
      });
    });
    
    it('com o name "Sal" e um id válido, resulta em erro', async function () {
      const result = await productsService.updateProduct({ name: "Sal" }, 1);

      expect(result).to.be.deep.equal({
        type: "INVALID_VALUE",
        message: '"name" length must be at least 5 characters long',
      });
    });
    it('com o name "Manteiga e um id válido"', async function () {
      sinon.stub(productsModel, "listProducts").resolves(products);
      sinon
        .stub(productsModel, "updateProduct")
        .resolves({ affectedRows: 1 });
      sinon.stub(productsModel, "listProductsById").resolves(newProduct);

      const result = await productsService.updateProduct(newProduct, 1);

      expect(result).to.be.deep.equal({ type: null, message: newProduct });
    });
  });

  afterEach(function () {
    sinon.restore();
  });
});