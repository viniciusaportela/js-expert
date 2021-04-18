const { error } = require('./src/constants')
const File = require('./src/file')
const { rejects, deepStrictEqual } = require('assert')

;
(async () => {
  {
    const filePath = './mocks/empty-file-invalid.csv'
    const rejection = new Error(error.FILE_LENGTH_ERROR_MESSAGE)
    const result = File.csvToJson(filePath)
    await rejects(result, rejection)
  }
  {
    const filePath = './mocks/four-items-invalid.csv'
    const rejection = new Error(error.FILE_LENGTH_ERROR_MESSAGE)
    const result = File.csvToJson(filePath)
    await rejects(result, rejection)
  }
  {
    const filePath = './mocks/three-items-valid.csv'
    const result = await File.csvToJson(filePath)
    const expected = [
      {
        "name": "Vinicius de Araujo",
        "id": 1,
        "profession": "Software Engineer",
        "birthDay": 2001
      },
      {
        "name": "Rodrigo Santos",
        "id": 2,
        "profession": "Software Engineer",
        "birthDay": 1998
      },
      {
        "name": "Maria Campos",
        "id": 3,
        "profession": "Software Engineer",
        "birthDay": 1994
      }
    ]
    deepStrictEqual(JSON.stringify(result), JSON.stringify(expected))
  }
})()