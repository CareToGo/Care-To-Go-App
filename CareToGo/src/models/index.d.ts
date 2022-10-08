import { ModelInit, MutableModel } from "@aws-amplify/datastore";

export enum OrderStatus {
  NEW = "NEW",
  HEADING = "HEADING",
  READY = "READY",
  COMPLETED = "COMPLETED"
}

type BasketMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type OrderMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type WorkerMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type ServiceMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type UserMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

export declare class Basket {
  readonly id: string;
  readonly userID: string;
  readonly workerID: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  constructor(init: ModelInit<Basket, BasketMetaData>);
  static copyOf(source: Basket, mutator: (draft: MutableModel<Basket, BasketMetaData>) => MutableModel<Basket, BasketMetaData> | void): Basket;
}

export declare class Order {
  readonly id: string;
  readonly userID: string;
  readonly Worker?: Worker | null;
  readonly status: OrderStatus | keyof typeof OrderStatus;
  readonly total: number;
  readonly service: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  readonly orderWorkerId?: string | null;
  constructor(init: ModelInit<Order, OrderMetaData>);
  static copyOf(source: Order, mutator: (draft: MutableModel<Order, OrderMetaData>) => MutableModel<Order, OrderMetaData> | void): Order;
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
  readonly lng: number;
  readonly Services?: (Service | null)[] | null;
  readonly Baskets?: (Basket | null)[] | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  constructor(init: ModelInit<Worker, WorkerMetaData>);
  static copyOf(source: Worker, mutator: (draft: MutableModel<Worker, WorkerMetaData>) => MutableModel<Worker, WorkerMetaData> | void): Worker;
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

export declare class User {
  readonly id: string;
  readonly sub: string;
  readonly address: string;
  readonly lat: number;
  readonly lng: number;
  readonly Orders?: (Order | null)[] | null;
  readonly Baskets?: (Basket | null)[] | null;
  readonly name: string;
  readonly email?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  constructor(init: ModelInit<User, UserMetaData>);
  static copyOf(source: User, mutator: (draft: MutableModel<User, UserMetaData>) => MutableModel<User, UserMetaData> | void): User;
}