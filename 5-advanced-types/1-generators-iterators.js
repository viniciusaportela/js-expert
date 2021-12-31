function* calculation(arg1, arg2) {
  yield arg1 * arg2
}

function *main() {
  yield 'Hello'

  // yield* = execute generator
  yield* calculation(20, 10)
}

const generator = main()
console.log(generator.next()) // { value: 'Hello', done: false }
console.log(generator.next()) // { value: 200, done: false }
console.log(generator.next()) // { value: undefined, done: true }

console.log(Array.from(main())) // ['Hello', 200]
console.log([...main()]) // ['Hello', 200]

// ----------- async iterators -----------
const { readFile, stat, readdir } = require('fs/promises')
function* promisified() {
  yield readFile(__filename);
  yield Promise.resolve('hey Dude')
}

console.log([...promisified()])

;(async () => {
  for await (const item of promisified()) {
    console.log('for await', item.toString())
  }
})()

// ---------------------------------------
async function* systemInfo() {
  const file = await readFile(__filename)
  yield { file: file.toString() 
  }

  const { size } = await stat(__filename)
  yield { size }

  const dir = await readdir(__dirname)
  yield { dir }
}

;(async () => {
  for await (const item of systemInfo()) {
    console.log('for await', item)
  }
})()