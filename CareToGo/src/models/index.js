// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';

const OrderStatus = {
  "NEW": "NEW",
  "HEADING": "HEADING",
  "READY": "READY",
  "COMPLETED": "COMPLETED"
};

const { Basket, Service, Order, Worker, User } = initSchema(schema);

export {
  Basket,
  Service,
  Order,
  Worker,
  User,
  OrderStatus
};