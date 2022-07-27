import { ModelInit, MutableModel, PersistentModelConstructor } from "@aws-amplify/datastore";





type ServiceMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type WorkerMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

export declare class Service {
  readonly id: string;
  readonly name: string;
  readonly description?: string | null;
  readonly price: number;
  readonly workerID: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  constructor(init: ModelInit<Service, ServiceMetaData>);
  static copyOf(source: Service, mutator: (draft: MutableModel<Service, ServiceMetaData>) => MutableModel<Service, ServiceMetaData> | void): Service;
}

export declare class Worker {
  readonly id: string;
  readonly name: string;
  readonly image: string;
  readonly travelFee: number;
  readonly minTravelTime: number;
  readonly maxTravelTime: number;
  readonly rating?: number | null;
  readonly address: string;
  readonly lat: number;
  readonly log: number;
  readonly Services?: (Service | null)[] | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  constructor(init: ModelInit<Worker, WorkerMetaData>);
  static copyOf(source: Worker, mutator: (draft: MutableModel<Worker, WorkerMetaData>) => MutableModel<Worker, WorkerMetaData> | void): Worker;
}