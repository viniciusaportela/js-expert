const dbData = require("./dbData.mock");

class MockDatabase {
  connect = () => this;
  find = async (query) => dbData;
}

module.exports = MockDatabase;
