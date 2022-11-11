// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';

const Caretype = {
  "TOTALCARE": "TOTALCARE",
  "SOMEASSISTANCE": "SOMEASSISTANCE",
  "INDEPENDENT": "INDEPENDENT"
};

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

const { PSWService, NurseService, Order, Worker, User } = initSchema(schema);

export {
  PSWService,
  NurseService,
  Order,
  Worker,
  User,
  Caretype,
  TransportationModes,
  OrderStatus
};