export { DataStore, DataStoreClass, initSchema, ModelInstanceCreator, } from './datastore/datastore';
export { Predicates, ModelPredicateCreator, ModelSortPredicateCreator, } from './predicates';
export { Adapter as StorageAdapter } from './storage/adapter';
export declare const utils: {
    USER: import("./util").NAMESPACES;
    traverseModel: <T extends Readonly<{
        id: string;
    } & Record<string, any>>>(srcModelName: string, instance: T, namespace: import("./types").SchemaNamespace, modelInstanceCreator: <T_1 extends Readonly<{
        id: string;
    } & Record<string, any>> = Readonly<{
        id: string;
    } & Record<string, any>>>(modelConstructor: import("./types").PersistentModelConstructor<T_1, {
        readOnlyFields: "createdAt" | "updatedAt";
    }>, init: Pick<T_1, Exclude<keyof T_1, "id" | "createdAt" | "updatedAt">> & Partial<import("./types").ModelInstanceMetadata>) => T_1, getModelConstructorByModelName: (namsespaceName: string, modelName: string) => import("./types").PersistentModelConstructor<any, {
        readOnlyFields: "createdAt" | "updatedAt";
    }>) => {
        modelName: string;
        item: T;
        instance: T;
    }[];
    validatePredicate: <T_2 extends Readonly<{
        id: string;
    } & Record<string, any>>>(model: T_2, groupType: "and" | "or" | "not", predicatesOrGroups: (import("./types").PredicateObject<T_2> | import("./types").PredicatesGroup<T_2>)[]) => any;
    isNonModelConstructor: (obj: any) => obj is import("./types").NonModelTypeConstructor<any>;
    isModelConstructor: <T_3 extends Readonly<{
        id: string;
    } & Record<string, any>>>(obj: any) => obj is import("./types").PersistentModelConstructor<T_3, {
        readOnlyFields: "createdAt" | "updatedAt";
    }>;
};
export * from './types';
