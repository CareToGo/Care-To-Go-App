import { ModelInit, MutableModel } from "@aws-amplify/datastore";

export enum TransportationModes {
  DRIVING = "DRIVING",
  BICYCLING = "BICYCLING"
}

export enum OrderStatus {
  NEW = "NEW",
  ARRIVED = "ARRIVED",
  COMPLETED = "COMPLETED",
  ACCEPTED = "ACCEPTED"
}

type ServiceMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type OrderMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type WorkerMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type UserMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

export declare class Service {
  readonly id: string;
  readonly name: string;
  readonly description: string;
  readonly price: number;
  readonly workable: boolean;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  constructor(init: ModelInit<Service, ServiceMetaData>);
  static copyOf(source: Service, mutator: (draft: MutableModel<Service, ServiceMetaData>) => MutableModel<Service, ServiceMetaData> | void): Service;
}

export declare class Order {
  readonly id: string;
  readonly Worker?: Worker | null;
  readonly userID: string;
  readonly total: number;
  readonly service: string;
  readonly lat: number;
  readonly lng: number;
  readonly name: string;
  readonly address: string;
  readonly status: OrderStatus | keyof typeof OrderStatus;
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
  readonly rating?: number | null;
  readonly lat: number;
  readonly lng: number;
  readonly transportationMode: TransportationModes | keyof typeof TransportationModes;
  readonly sub: string;
  readonly service: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  constructor(init: ModelInit<Worker, WorkerMetaData>);
  static copyOf(source: Worker, mutator: (draft: MutableModel<Worker, WorkerMetaData>) => MutableModel<Worker, WorkerMetaData> | void): Worker;
}

export declare class User {
  readonly id: string;
  readonly sub: string;
  readonly address: string;
  readonly lat: number;
  readonly lng: number;
  readonly firstname: string;
  readonly lastname: string;
  readonly ver: number;
  readonly dob?: string | null;
  readonly email?: string | null;
  readonly contactnum?: string | null;
  readonly image: string;
  readonly Orders?: (Order | null)[] | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  constructor(init: ModelInit<User, UserMetaData>);
  static copyOf(source: User, mutator: (draft: MutableModel<User, UserMetaData>) => MutableModel<User, UserMetaData> | void): User;
}