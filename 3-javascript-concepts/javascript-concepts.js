const item = {
  name: 'Vinicius',
  age: 25,
  toString() { // String conversion
    // Called even in numeric conversion as second chance / fallback
    return `Name: ${this.name}, Age: ${this.age}`
  },
  valueOf() { // Numeric conversion (+ second called if toString() not exists in string conversion)
    return 007
  },
  [Symbol.toPrimitive](coercionType) {
    const types = {
      string: JSON.stringify(this),
      number: '0007'
    }

    return types[coercionType]
  }
}

// Convert to default in Symbol.toPrimitive, default = boolean
console.log(new Date(item));