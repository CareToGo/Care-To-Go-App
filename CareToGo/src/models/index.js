// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';

const OrderStatus = {
  "NEW": "NEW",
  "HEADING": "HEADING",
  "READY": "READY",
  "COMPLETED": "COMPLETED"
};

const { OrderService, Service, BasketService, Basket, Order, Worker, User } = initSchema(schema);

export {
  OrderService,
  Service,
  BasketService,
  Basket,
  Order,
  Worker,
  User,
  OrderStatus
};