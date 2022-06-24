const rewiremock = require("rewiremock/node");
const { deepStrictEqual } = require("assert");
const MockDatabase = require("./__mocks__/MockDatabase.mock");

rewiremock(() => require("./../src/util/database")).with(MockDatabase);

(async () => {
  {
    const expected = [{ name: "MARIAZINHA" }, { name: "JOAOZIN" }];

    rewiremock.enable();

    const UserFactory = require("../src/factory/userFactory");

    const userFactory = await UserFactory.createInstance();

    const result = await userFactory.find();

    deepStrictEqual(result, expected);

    rewiremock.disable();
  }
  {
    const expected = [{ name: "VINICIUS ARAUJO" }];

    const UserFactory = require("../src/factory/userFactory");

    const userFactory = await UserFactory.createInstance();
    const result = await userFactory.find();

    deepStrictEqual(result, expected);
  }
})();
