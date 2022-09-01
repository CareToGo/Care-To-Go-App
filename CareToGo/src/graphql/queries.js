/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getBasket = /* GraphQL */ `
  query GetBasket($id: ID!) {
    getBasket(id: $id) {
      id
      Services {
        nextToken
        startedAt
      }
      userID
      workerID
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const listBaskets = /* GraphQL */ `
  query ListBaskets(
    $filter: ModelBasketFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listBaskets(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        userID
        workerID
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const syncBaskets = /* GraphQL */ `
  query SyncBaskets(
    $filter: ModelBasketFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncBaskets(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        userID
        workerID
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const getOrder = /* GraphQL */ `
  query GetOrder($id: ID!) {
    getOrder(id: $id) {
      id
      userID
      Worker {
        id
        name
        image
        travelFee
        minTravelTime
        maxTravelTime
        rating
        address
        lat
        lng
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      total
      Services {
        nextToken
        startedAt
      }
      status
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      orderWorkerId
    }
  }
`;
export const listOrders = /* GraphQL */ `
  query ListOrders(
    $filter: ModelOrderFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listOrders(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        userID
        total
        status
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        orderWorkerId
      }
      nextToken
      startedAt
    }
  }
`;
export const syncOrders = /* GraphQL */ `
  query SyncOrders(
    $filter: ModelOrderFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncOrders(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        userID
        total
        status
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        orderWorkerId
      }
      nextToken
      startedAt
    }
  }
`;
export const getUser = /* GraphQL */ `
  query GetUser($id: ID!) {
    getUser(id: $id) {
      id
      sub
      address
      lat
      lng
      Orders {
        nextToken
        startedAt
      }
      Baskets {
        nextToken
        startedAt
      }
      name
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const listUsers = /* GraphQL */ `
  query ListUsers(
    $filter: ModelUserFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listUsers(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        sub
        address
        lat
        lng
        name
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const syncUsers = /* GraphQL */ `
  query SyncUsers(
    $filter: ModelUserFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncUsers(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        sub
        address
        lat
        lng
        name
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const getService = /* GraphQL */ `
  query GetService($id: ID!) {
    getService(id: $id) {
      id
      name
      description
      price
      workerID
      orderID
      basketID
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const listServices = /* GraphQL */ `
  query ListServices(
    $filter: ModelServiceFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listServices(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        description
        price
        workerID
        orderID
        basketID
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const syncServices = /* GraphQL */ `
  query SyncServices(
    $filter: ModelServiceFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncServices(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        name
        description
        price
        workerID
        orderID
        basketID
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const getWorker = /* GraphQL */ `
  query GetWorker($id: ID!) {
    getWorker(id: $id) {
      id
      name
      image
      travelFee
      minTravelTime
      maxTravelTime
      rating
      address
      lat
      lng
      Services {
        nextToken
        startedAt
      }
      Baskets {
        nextToken
        startedAt
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const listWorkers = /* GraphQL */ `
  query ListWorkers(
    $filter: ModelWorkerFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listWorkers(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        image
        travelFee
        minTravelTime
        maxTravelTime
        rating
        address
        lat
        lng
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const syncWorkers = /* GraphQL */ `
  query SyncWorkers(
    $filter: ModelWorkerFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncWorkers(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        name
        image
        travelFee
        minTravelTime
        maxTravelTime
        rating
        address
        lat
        lng
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      nextToken
      startedAt
    }
  }
`;
