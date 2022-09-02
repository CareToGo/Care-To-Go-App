// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';

const OrderStatus = {
  "NEW": "NEW",
  "HEADING": "HEADING",
  "READY": "READY",
  "COMPLETED": "COMPLETED"
};

const { Basket, Order, Worker, Service, User } = initSchema(schema);

export {
  Basket,
  Order,
  Worker,
  Service,
  User,
  OrderStatus
};