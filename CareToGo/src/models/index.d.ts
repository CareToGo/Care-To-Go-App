import { ModelInit, MutableModel } from "@aws-amplify/datastore";
// @ts-ignore
import { LazyLoading, LazyLoadingDisabled, AsyncItem, AsyncCollection } from "@aws-amplify/datastore";

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

type EagerService = {
  readonly id: string;
  readonly name: string;
  readonly description: string;
  readonly price: number;
  readonly workable: boolean;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyService = {
  readonly id: string;
  readonly name: string;
  readonly description: string;
  readonly price: number;
  readonly workable: boolean;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Service = LazyLoading extends LazyLoadingDisabled ? EagerService : LazyService

export declare const Service: (new (init: ModelInit<Service, ServiceMetaData>) => Service) & {
  copyOf(source: Service, mutator: (draft: MutableModel<Service, ServiceMetaData>) => MutableModel<Service, ServiceMetaData> | void): Service;
}

type EagerOrder = {
  readonly id: string;
  readonly userID: string;
  readonly Worker?: Worker | null;
  readonly status: OrderStatus | keyof typeof OrderStatus;
  readonly total: number;
  readonly service: string;
  readonly lat: number;
  readonly lng: number;
  readonly name: string;
  readonly address: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  readonly orderWorkerId?: string | null;
}

type LazyOrder = {
  readonly id: string;
  readonly userID: string;
  readonly Worker: AsyncItem<Worker | undefined>;
  readonly status: OrderStatus | keyof typeof OrderStatus;
  readonly total: number;
  readonly service: string;
  readonly lat: number;
  readonly lng: number;
  readonly name: string;
  readonly address: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  readonly orderWorkerId?: string | null;
}

export declare type Order = LazyLoading extends LazyLoadingDisabled ? EagerOrder : LazyOrder

export declare const Order: (new (init: ModelInit<Order, OrderMetaData>) => Order) & {
  copyOf(source: Order, mutator: (draft: MutableModel<Order, OrderMetaData>) => MutableModel<Order, OrderMetaData> | void): Order;
}

type EagerWorker = {
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
}

type LazyWorker = {
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
}

export declare type Worker = LazyLoading extends LazyLoadingDisabled ? EagerWorker : LazyWorker

export declare const Worker: (new (init: ModelInit<Worker, WorkerMetaData>) => Worker) & {
  copyOf(source: Worker, mutator: (draft: MutableModel<Worker, WorkerMetaData>) => MutableModel<Worker, WorkerMetaData> | void): Worker;
}

type EagerUser = {
  readonly id: string;
  readonly sub: string;
  readonly address: string;
  readonly lat: number;
  readonly lng: number;
  readonly Orders?: (Order | null)[] | null;
  readonly firstname: string;
  readonly lastname: string;
  readonly ver: number;
  readonly dob?: string | null;
  readonly email?: string | null;
  readonly contactnum?: string | null;
  readonly image: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyUser = {
  readonly id: string;
  readonly sub: string;
  readonly address: string;
  readonly lat: number;
  readonly lng: number;
  readonly Orders: AsyncCollection<Order>;
  readonly firstname: string;
  readonly lastname: string;
  readonly ver: number;
  readonly dob?: string | null;
  readonly email?: string | null;
  readonly contactnum?: string | null;
  readonly image: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type User = LazyLoading extends LazyLoadingDisabled ? EagerUser : LazyUser

export declare const User: (new (init: ModelInit<User, UserMetaData>) => User) & {
  copyOf(source: User, mutator: (draft: MutableModel<User, UserMetaData>) => MutableModel<User, UserMetaData> | void): User;
}