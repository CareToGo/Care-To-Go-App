// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';

const TransportationModes = {
  "DRIVING": "DRIVING",
  "BICYCLING": "BICYCLING"
};

const OrderStatus = {
  "NEW": "NEW",
  "HEADING": "HEADING",
  "READY": "READY",
  "COMPLETED": "COMPLETED"
};

const { Service, Basket, Order, Worker, User } = initSchema(schema);

export {
  Service,
  Basket,
  Order,
  Worker,
  User,
  TransportationModes,
  OrderStatus
};