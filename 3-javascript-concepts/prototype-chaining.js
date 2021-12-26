// Doesn't found method on first __proto__, search for other __proto__ that inherences
// Employee.__proto__ <= Supervisor.__proto__ <= Manager.__proto__

const obj = {}
const arr = []
const fn = () => {}

console.log(new Object().__proto__ === {}.__proto__) // true
console.log(obj.__proto__ === Object.prototype) // true
console.log(obj.__proto__) // {}
console.log(obj.__proto__) // null

// ----------------------------------------------------------

function Employee() {}
Employee.prototype.salary = () => 'salary**'

// Inheritance
function Supervisor() {}
Supervisor.prototype = Object.create(Employee.prototype)
Supervisor.prototype.profitShare = () => 'profitShare**'

function Manager() {}
Manager.prototype = Object.create(Supervisor.prototype)
Manager.prototype.monthlyBonuses = () => 'monthlyBonuses**'

// Will not work!
// > Manager.salary()

console.log(Manager.prototype.__proto__ === Supervisor.prototype) // true

// ----------------------------------------------------------
// When calling "new" __proto__ receives the current prototype
console.log(new Manager().__proto__, new Manager().salary())
console.log(Supervisor.prototype === new Manager().__proto__.__proto__)

// ----------------------------------------------------------
const manager = new Manager()

// With classes happens the same, class T3 extends T2
// T3.__proto__ === T3.prototype, T3.__proto__.__proto__ === T2.prototype

manager.__proto__ === Manager.prototype
manager.__proto__.__proto__ === Supervisor.prototype
manager.__proto__.__proto__.__proto__ === Employee.prototype
manager.__proto__.__proto__.__proto__.__proto__ === Object.prototype
manager.__proto__.__proto__.__proto__.__proto__.__proto__ === null