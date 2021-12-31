"use strict";

const myObj = {
  add(myValue) {
    return this.arg1 + this.arg2 + myValue;
  },
};

myObj.add.apply = function () {};
console.log(myObj.add.apply({ arg1: 10, arg2: 20 }, [100])); // undefined

const result = Reflect.apply(myObj.add, { arg1: 40, arg2: 20 }, [200]);
console.log(result); // 260

function MyDate() {}

Object.defineProperty(MyDate, "withObject", { value: () => "Hey there" });
Reflect.defineProperty(MyDate, "withReflection", { value: () => "Hey dude" });

// Avoid!
const withDelete = { user: "Vinicius" };
delete withDelete.user;

const withReflection = { user: "Xuxa" };
Reflect.deleteProperty(withReflection, "user");

(1)["userName"]; // works, returns undefined
// Reflect.get(1, "userName"); // Throw TypeError

console.log("superman" in { superman: "" });
console.log(Reflect.has({ batman: "" }, "batman"));

const user = Symbol("user");
const obj2 = {
  id: 1,
  [user]: "erickwendel",
};

const objectKeys = [
  ...Object.getOwnPropertyNames(obj2),
  ...Object.getOwnPropertySymbols(obj2),
];
console.log(objectKeys);

const objectKeys2 = Reflect.ownKeys(obj2);
console.log(objectKeys2);
