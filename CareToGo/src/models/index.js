// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';

const TransportationModes = {
  "DRIVING": "DRIVING",
  "BICYCLING": "BICYCLING"
};

const OrderStatus = {
  "NEW": "NEW",
  "ARRIVED": "ARRIVED",
  "COMPLETED": "COMPLETED",
  "ACCEPTED": "ACCEPTED"
};

const { Service, Order, Worker, User } = initSchema(schema);

export {
  Service,
  Order,
  Worker,
  User,
  TransportationModes,
  OrderStatus
};