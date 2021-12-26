'use strict';

const { watch, promises: { readFile } } = require('fs')

class File {
  watch(event, filename) {
    this.showContent(filename)
  }

  async showContent() {
    console.log((await readFile(filename)).toString())
  }
}

const file = new File()
watch(__filename, file.watch)

// Alternatives to not inheritance this of function
// Arrow function
watch(__filename, (event, filename) => file.watch(event, filename))

// Explicit context
watch(__filename, file.watch.bind(file))

// ------------------------------------
// Override this with { showContent: ... }
file.watch.call({ showContent: () => console.log('call: hey sinon') }, null, __filename)

// Similar to .call, but receive array of arguments instead of comma separated arguments
file.watch.apply({ showContent: () => console.log('call: hey sinon') }, [null, __filename])