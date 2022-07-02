const { expect } = require("chai");
const { it, describe } = require("mocha");
const { productValidator } = require("../src");
const ProductMotherObject = require("./model/productMotherObject");

describe("Test Data Builder", () => {
  it("shouldn't return error with valid product", () => {
    const product = ProductMotherObject.valid();
    const result = productValidator(product);

    const expect = {
      errors: [],
      result: true,
    };

    expect(result).to.be.deep.equal(expect);
  });

  describe("Product Validation Rules", () => {
    it("should return an object error when creating a Product with invalid id", () => {
      const product = ProductMotherObject.withInvalid();
      const result = productValidator(product);

      const expect = {
        errors: [
          "id: invalid length, current [1] expected to be between 2 and 20",
        ],
        result: false,
      };

      expect(result).to.be.deep.equal(expect);
    });
    it("should return an object error when creating a Product with invalid name", () => {
      const product = ProductMotherObject.withInvalidName();
      const result = productValidator(product);

      const expect = {
        errors: [
          "name: invalid value, current [abc123] expected to have only words",
        ],
        result: false,
      };

      expect(result).to.be.deep.equal(expect);
    });
    it("should return an object error when creating a Product with invalid price", () => {
      const product = ProductDataBuilder.withInvalidPrice();
      const result = productValidator(product);

      const expect = {
        errors: [
          "price: invalid value, current [2000] expected to be between 1 and 1000",
        ],
        result: false,
      };

      expect(result).to.be.deep.equal(expect);
    });
    it("should return an object error when creating a Product with invalid category", () => {
      const product = ProductDataBuilder.withInvalidCategory();
      const result = productValidator(product);

      const expect = {
        errors: [
          "price: invalid value, current [2000] expected to be between 1 and 1000",
        ],
        result: false,
      };

      expect(result).to.be.deep.equal(expect);
    });
  });
});
