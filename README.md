[![npm version](https://flat.badgen.net/npm/v/@gmmurray/mongodb-atlas-data-api)](https://www.npmjs.com/package/@gmmurray/mongodb-atlas-data-api)
[![license](https://flat.badgen.net/npm/license/@gmmurray/mongodb-atlas-data-api)](./LICENSE)
[![types](https://flat.badgen.net/npm/types/@gmmurray/mongodb-atlas-data-api)](https://www.npmjs.com/package/@gmmurray/mongodb-atlas-data-api)
[![commits](https://flat.badgen.net/github/commits/gmmurray/mongodb-atlas-data-api)](https://github.com/gmmurray/mongodb-atlas-data-api)

# @gmmurray/mongodb-atlas-data-api

> A client library for interacting with the Atlas Data API.

## Prerequisites

This library requires the following dependencies:

- [axios](https://www.npmjs.com/package/axios) for making HTTP requests.

```sh
$ npm install axios
```

## Table of Contents

- [@gmmurray/mongodb-atlas-data-api](#gmmurraymongodb-atlas-data-api)
  - [Prerequisites](#prerequisites)
  - [Table of Contents](#table-of-contents)
  - [Getting Started](#getting-started)
  - [Installation](#installation)
  - [Usage](#usage)
    - [Creating the Client](#creating-the-client)
    - [Find One Document](#find-one-document)
    - [Find Many Documents](#find-many-documents)
    - [Insert One Document](#insert-one-document)
    - [Insert Many Documents](#insert-many-documents)
    - [Update One Document](#update-one-document)
    - [Update Many Documents](#update-many-documents)
    - [Replace One Document](#replace-one-document)
    - [Delete One Document](#delete-one-document)
    - [Delete Many Documents](#delete-many-documents)
    - [Aggregate Documents](#aggregate-documents)
  - [API Reference](#api-reference)
  - [Credits](#credits)

## Getting Started

These instructions will help you get started with using the Atlas Data API Client in your project.

## Installation

To install the library, run the following command:

```sh
$ npm install atlas-data-api-client
```

Alternatively, you can use Yarn:

```sh
$ yarn add atlas-data-api-client
```

## Usage

In these examples we use a made up customer interface:

```typescript
interface Customer {
  id: string;
  name: string;
  age: number;
}
```

### Creating the Client

```typescript
import AtlasDataApiClient, {
  AtlasDataApiClientOptions,
} from '@gmmurray/atlas-data-api-client';

const options: AtlasDataApiClientOptions = {
  apiKey: 'YOUR_API_KEY',
  dataApiUrlEndpoint: 'your-app-url-endpoint',
  defaultDataSource: 'your-default-data-source',
  defaultDatabase: 'your-default-database',
};

const apiClient = new AtlasDataApiClient(options);
```

### Find One Document

```typescript
const request: FindOneDocumentRequest<Customer> = {
  collection: 'your-collection',
  filter: { name: 'John Doe' },
};

const response: FindOneApiResponse<Customer> = await apiClient.findOneDocument(
  request,
);

console.log(response);
```

### Find Many Documents

```typescript
const request: FindManyDocumentsRequest<Customer> = {
  collection: 'your-collection',
  filter: { age: { $gte: 18 } },
  sort: { name: 1 },
  pageSize: 10,
  pageNumber: 1,
};

const response: FindManyApiResponse<Customer> = await apiClient.findDocuments(
  request,
);

console.log(response);
```

### Insert One Document

```typescript
const request: InsertOneDocumentRequest<Customer> = {
  collection: 'your-collection',
  document: { name: 'John Doe', age: 25 },
};

const response: InsertOneApiResponse = await apiClient.insertOneDocument(
  request,
);

console.log(response);
```

### Insert Many Documents

```typescript
const request: InsertManyDocumentsRequest<Customer> = {
  collection: 'your-collection',
  documents: [
    { name: 'John Doe', age: 25 },
    { name: 'Jane Smith', age: 30 },
  ],
};

const response: InsertManyApiResponse = await apiClient.insertManyDocuments(
  request,
);

console.log(response);
```

### Update One Document

```typescript
const request: UpdateOneDocumentRequest<Customer> = {
  collection: 'your-collection',
  filter: { id: '123' },
  update: { name: 'John Doe', age: 26 },
  upsert: true,
};

const response: UpdateOneApiResponse = await apiClient.updateOneDocument(
  request,
);

console.log(response);
```

### Update Many Documents

```typescript
const request: UpdateManyDocumentsRequest<Customer> = {
  collection: 'your-collection',
  filter: { age: { $gte: 18 } },
  update: { status: 'active' },
  upsert: true,
};

const response: UpdateManyApiResponse = await apiClient.updateManyDocuments(
  request,
);

console.log(response);
```

### Replace One Document

```typescript
const request: ReplaceOneDocumentRequest<Customer> = {
  collection: 'your-collection',
  filter: { id: '123' },
  replacement: { id: '123', name: 'John Doe', age: 27 },
  upsert: true,
};

const response: ReplaceOneApiResponse = await apiClient.replaceOneDocument(
  request,
);

console.log(response);
```

### Delete One Document

```typescript
const request: DeleteOneDocumentRequest<Customer> = {
  collection: 'your-collection',
  filter: { id: '123' },
};

const response: DeleteOneApiResponse = await apiClient.deleteOneDocument(
  request,
);

console.log(response);
```

### Delete Many Documents

```typescript
const request: DeleteManyDocumentsRequest<Customer> = {
  collection: 'your-collection',
  filter: { age: { $gte: 18 } },
};

const response: DeleteManyApiResponse = await apiClient.deleteManyDocuments(
  request,
);

console.log(response);
```

### Aggregate Documents

```typescript
const request: AggregateDocumentsRequest = {
  collection: 'your-collection',
  pipeline: [
    { $match: { age: { $gte: 18 } } },
    { $group: { _id: '$gender', count: { $sum: 1 } } },
  ],
};

const response: AggregateApiResponse = await apiClient.aggregateDocuments(
  request,
);

console.log(response);
```

## API Reference

| Method                                                                                      | Description                                               |
| ------------------------------------------------------------------------------------------- | --------------------------------------------------------- |
| findOneDocument(request: FindOneDocumentRequest<T>): Promise<FindOneApiResponse<T>>         | Finds a single document in the specified collection.      |
| findDocuments(request: FindManyDocumentsRequest<T>): Promise<FindManyApiResponse<T>>        | Finds multiple documents in the specified collection.     |
| insertOneDocument(request: InsertOneDocumentRequest<T>): Promise<InsertOneApiResponse>      | Inserts a single document into the specified collection.  |
| insertManyDocuments(request: InsertManyDocumentsRequest<T>): Promise<InsertManyApiResponse> | Inserts multiple documents into the specified collection. |
| updateOneDocument(request: UpdateOneDocumentRequest<T>): Promise<UpdateOneApiResponse>      | Updates a single document in the specified collection.    |
| updateManyDocuments(request: UpdateManyDocumentsRequest<T>): Promise<UpdateManyApiResponse> | Updates multiple documents in the specified collection.   |
| replaceOneDocument(request: ReplaceOneDocumentRequest<T>): Promise<ReplaceOneApiResponse>   | Replaces a single document in the specified collection.   |
| deleteOneDocument(request: DeleteOneDocumentRequest<T>): Promise<DeleteOneApiResponse>      | Deletes a single document from the specified collection.  |
| deleteManyDocuments(request: DeleteManyDocumentsRequest<T>): Promise<DeleteManyApiResponse> | Deletes multiple documents from the specified collection. |
| aggregateDocuments(request: AggregateDocumentsRequest): Promise<AggregateApiResponse>       | Performs an aggregation on the specified collection.      |

For more details on each method and their request/response types, please refer to the source code documentation.

## Credits

- [Axios](https://www.npmjs.com/package/axios)
- [README template](https://gist.github.com/andreasonny83/7670f4b39fe237d52636df3dec49cf3a)
