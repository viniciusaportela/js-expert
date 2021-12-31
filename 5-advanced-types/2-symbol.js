const uniqueKey = Symbol("userName");
const user = {};

user["userName"] = "value of normal Objects";
user[uniqueKey] = "value of symbol";

console.log("getting normal Object:", user.userName);
// Symbol() always returns unique value
console.log("getting symbol Object:", user[Symbol("userName")]);

// Get symbols
console.log(Object.getOwnPropertySymbols(user));

// Not recommended
// Symbol.for not create unique symbol per call
user[Symbol.for("password")] = 123;
console.log(user[Symbol.for("password")] === 123); // true

// -----------------------------------------------------------
const obj = {
  [Symbol.iterator]: () => ({
    items: ["c", "b", "a"],
    next() {
      return {
        done: this.items.length === 0,
        value: this.items.pop(),
      };
    },
  }),
};

// [...item] === ['a', 'b', 'c']
for (const item of obj) {
  console.log("item", item);
}

// -----------------------------------------------------------

const kItems = Symbol("kItems");
class MyDate {
  constructor(...args) {
    this[kItems] = args.map((arg) => new Date(...arg));
  }

  [Symbol.toPrimitive](coercionType) {
    // myDate + 1 throws TypeError because of this
    if (coercionType !== "string") throw new TypeError();
    const items = this[kItems].map((item) =>
      new Intl.DateTimeFormat("pt-BR", {
        month: "long",
        day: "2-digit",
        year: "numeric",
      }).format(item)
    );

    return new Intl.ListFormat("pt-BR", {
      style: "long",
      type: "conjunction",
    }).format(items);
  }

  *[Symbol.iterator]() {
    for (const item of this[kItems]) {
      yield item;
    }
  }

  async *[Symbol.asyncIterator]() {
    const timeout = (ms) => new Promise((r) => setTimeout(r, ms));

    for (const item of this[kItems]) {
      await timeout(100);
      yield item.toISOString();
    }
  }

  get [Symbol.toStringTag]() {
    return "MyDate";
  }
}

const myDate = new MyDate([2020, 03, 01], [2018, 02, 02]);

console.log(myDate);
console.log(Object.prototype.toString.call(myDate));
console.log(String(myDate));
console.log([...myDate]);

(async () => {
  for await (const item of myDate) {
    console.log("asyncIterator", item);
  }
})();
