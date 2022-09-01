/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateBasket = /* GraphQL */ `
  subscription OnCreateBasket {
    onCreateBasket {
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
export const onUpdateBasket = /* GraphQL */ `
  subscription OnUpdateBasket {
    onUpdateBasket {
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
export const onDeleteBasket = /* GraphQL */ `
  subscription OnDeleteBasket {
    onDeleteBasket {
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
export const onCreateOrder = /* GraphQL */ `
  subscription OnCreateOrder {
    onCreateOrder {
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
export const onUpdateOrder = /* GraphQL */ `
  subscription OnUpdateOrder {
    onUpdateOrder {
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
export const onDeleteOrder = /* GraphQL */ `
  subscription OnDeleteOrder {
    onDeleteOrder {
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
export const onCreateUser = /* GraphQL */ `
  subscription OnCreateUser {
    onCreateUser {
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
export const onUpdateUser = /* GraphQL */ `
  subscription OnUpdateUser {
    onUpdateUser {
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
export const onDeleteUser = /* GraphQL */ `
  subscription OnDeleteUser {
    onDeleteUser {
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
export const onCreateService = /* GraphQL */ `
  subscription OnCreateService {
    onCreateService {
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
export const onUpdateService = /* GraphQL */ `
  subscription OnUpdateService {
    onUpdateService {
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
export const onDeleteService = /* GraphQL */ `
  subscription OnDeleteService {
    onDeleteService {
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
export const onCreateWorker = /* GraphQL */ `
  subscription OnCreateWorker {
    onCreateWorker {
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
export const onUpdateWorker = /* GraphQL */ `
  subscription OnUpdateWorker {
    onUpdateWorker {
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
export const onDeleteWorker = /* GraphQL */ `
  subscription OnDeleteWorker {
    onDeleteWorker {
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
