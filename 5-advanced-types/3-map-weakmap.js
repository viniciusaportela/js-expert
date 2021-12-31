const myMap = new Map();

myMap.set(1, "one");
myMap.set("Vini", { text: "two" });
myMap.set(true, () => "hello");

const myMapWithConstructor = new Map([
  [1, "one"],
  ["Vini", { text: "two" }],
  [true, () => "hello"],
]);

const obj = { id: 1 };
myMap.set(obj, { name: "vinicius" });
console.log(myMap.get(obj)); // { name: 'vinicius' }

// Get length
console.log(myMap.size);

// Check if has key
myMap.has(obj); // true

// Delete a key / delete everything
myMap.delete(obj);
myMap.clear();

// Map Generator
console.log([...myMap]);

for (const [key, value] of myMap) {
  console.log({ key, value });
}

// WeakMap -------------------------------------
// More lightweight, not iterable, keys only by reference

const weakMap = new WeakMap();
const hero = { name: "Flash" };

weakMap.set(hero);
weakMap.get(hero);
weakMap.has(hero);
weakMap.delete(hero);
