import OrderBusiness from "./business/orderBusiness.js";
import Order from "./entities/order.js";

const order = new Order({
  customerId: "abc123",
  amount: 200,
  products: [{ description: "shampoo de rico" }],
});

const orderBusiness = new OrderBusiness();
console.info("orderCreated", orderBusiness.create(order));
