// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { Service, Worker } = initSchema(schema);

export {
  Service,
  Worker
};