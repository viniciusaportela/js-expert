const arr1 = [0, 1, 2];
const arr2 = [2, 0, 3];
const arr3 = arr1.concat(arr2);
console.log(arr3.sort());

const set = new Set();
arr1.map((item) => set.add(item));
arr2.map((item) => set.add(item));

const set2 = new Set([...arr1, ...arr2]);

console.log(set);
console.log(set2);
console.log([...set]);

// Returns same values
set.keys();
set.values();
console.log(set.has(0)); // true
console.log(set.has(10)); // false

// Not has get()!

// Equal in two sets
const users1 = new Set(["erick", "maria", "xuxa"]);
const users2 = new Set(["joao", "erick", "julio"]);

const intersection = new Set([...users1].filter((user) => users2.has(user)));
console.log(intersection);

// users2 that is not in users1
const difference = new Set([...users1].filter((user) => !users2.has(user)));
console.log(difference);

// Weakset -------------------------
// Not iterable
// Keys only by reference

const user = { id: 123 };
const user2 = { id: 321 };

const weakSet = new WeakSet([user]);
weakSet.add(user2);
weakSet.has(user2);
weakSet.delete(user2);
