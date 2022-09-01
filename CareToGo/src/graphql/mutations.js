/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createPaymentIntent = /* GraphQL */ `
  mutation CreatePaymentIntent($amount: Int!) {
    createPaymentIntent(amount: $amount) {
      clientSecret
    }
  }
`;
export const createBasket = /* GraphQL */ `
  mutation CreateBasket(
    $input: CreateBasketInput!
    $condition: ModelBasketConditionInput
  ) {
    createBasket(input: $input, condition: $condition) {
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
export const updateBasket = /* GraphQL */ `
  mutation UpdateBasket(
    $input: UpdateBasketInput!
    $condition: ModelBasketConditionInput
  ) {
    updateBasket(input: $input, condition: $condition) {
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
export const deleteBasket = /* GraphQL */ `
  mutation DeleteBasket(
    $input: DeleteBasketInput!
    $condition: ModelBasketConditionInput
  ) {
    deleteBasket(input: $input, condition: $condition) {
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
export const createOrder = /* GraphQL */ `
  mutation CreateOrder(
    $input: CreateOrderInput!
    $condition: ModelOrderConditionInput
  ) {
    createOrder(input: $input, condition: $condition) {
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
export const updateOrder = /* GraphQL */ `
  mutation UpdateOrder(
    $input: UpdateOrderInput!
    $condition: ModelOrderConditionInput
  ) {
    updateOrder(input: $input, condition: $condition) {
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
export const deleteOrder = /* GraphQL */ `
  mutation DeleteOrder(
    $input: DeleteOrderInput!
    $condition: ModelOrderConditionInput
  ) {
    deleteOrder(input: $input, condition: $condition) {
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
export const createUser = /* GraphQL */ `
  mutation CreateUser(
    $input: CreateUserInput!
    $condition: ModelUserConditionInput
  ) {
    createUser(input: $input, condition: $condition) {
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
export const updateUser = /* GraphQL */ `
  mutation UpdateUser(
    $input: UpdateUserInput!
    $condition: ModelUserConditionInput
  ) {
    updateUser(input: $input, condition: $condition) {
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
export const deleteUser = /* GraphQL */ `
  mutation DeleteUser(
    $input: DeleteUserInput!
    $condition: ModelUserConditionInput
  ) {
    deleteUser(input: $input, condition: $condition) {
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
export const createService = /* GraphQL */ `
  mutation CreateService(
    $input: CreateServiceInput!
    $condition: ModelServiceConditionInput
  ) {
    createService(input: $input, condition: $condition) {
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
export const updateService = /* GraphQL */ `
  mutation UpdateService(
    $input: UpdateServiceInput!
    $condition: ModelServiceConditionInput
  ) {
    updateService(input: $input, condition: $condition) {
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
export const deleteService = /* GraphQL */ `
  mutation DeleteService(
    $input: DeleteServiceInput!
    $condition: ModelServiceConditionInput
  ) {
    deleteService(input: $input, condition: $condition) {
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
export const createWorker = /* GraphQL */ `
  mutation CreateWorker(
    $input: CreateWorkerInput!
    $condition: ModelWorkerConditionInput
  ) {
    createWorker(input: $input, condition: $condition) {
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
export const updateWorker = /* GraphQL */ `
  mutation UpdateWorker(
    $input: UpdateWorkerInput!
    $condition: ModelWorkerConditionInput
  ) {
    updateWorker(input: $input, condition: $condition) {
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
export const deleteWorker = /* GraphQL */ `
  mutation DeleteWorker(
    $input: DeleteWorkerInput!
    $condition: ModelWorkerConditionInput
  ) {
    deleteWorker(input: $input, condition: $condition) {
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
