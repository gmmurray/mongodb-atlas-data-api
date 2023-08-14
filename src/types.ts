import { Filter } from 'mongodb';

export interface Projection {
  [key: string]: 0 | 1;
}

export interface BaseRequest {
  collection: string;
  dataSource?: string;
  database?: string;
}

export interface FindOneDocumentRequest<T> extends BaseRequest {
  filter?: Filter<T>;
  projection?: Projection;
}

export interface FindManyDocumentsRequest<T> extends BaseRequest {
  filter?: Filter<T>;
  projection?: Projection;
  sort?: object;
  pageSize?: number;
  pageNumber?: number;
}

export interface InsertOneDocumentRequest<T> extends BaseRequest {
  document: T;
}

export interface InsertManyDocumentsRequest<T> extends BaseRequest {
  documents: T[];
}

export interface UpdateOneDocumentRequest<T> extends BaseRequest {
  filter: Filter<T>;
  update: T;
  upsert?: boolean;
}

export interface UpdateManyDocumentsRequest<T> extends BaseRequest {
  filter: Filter<T>;
  update: T;
  upsert?: boolean;
}

export interface ReplaceOneDocumentRequest<T> extends BaseRequest {
  filter: Filter<T>;
  replacement: T;
  upsert?: boolean;
}

export interface DeleteOneDocumentRequest<T> extends BaseRequest {
  filter: Filter<T>;
}

export interface DeleteManyDocumentsRequest<T> extends BaseRequest {
  filter: Filter<T>;
}

export interface AggregateDocumentsRequest extends BaseRequest {
  pipeline: object[];
}

export interface AtlasDataApiClientOptions {
  apiKey: string;
  dataApiUrlEndpoint: string;
  defaultDataSource?: string;
  defaultDatabase?: string;
}

export interface ApiResponse<T> {
  data?: T;
  error?: string;
}

export type FindOneApiResponse<T> = ApiResponse<{ document?: T }>;

export type FindManyApiResponse<T> = ApiResponse<{ documents?: T[] }>;

export type InsertOneApiResponse = ApiResponse<{
  insertedId: string;
}>;

export type InsertManyApiResponse = ApiResponse<{
  insertedIds: string[];
}>;

export type UpdateOneApiResponse = ApiResponse<{
  matchedCount: number;
  modifiedCount: number;
  upsertedId?: string;
}>;

export type UpdateManyApiResponse = UpdateOneApiResponse;

export type ReplaceOneApiResponse = UpdateOneApiResponse;
export type DeleteOneApiResponse = ApiResponse<{ deletedCount: number }>;
export type DeleteManyApiResponse = DeleteOneApiResponse;
export type AggregateApiResponse = ApiResponse<{ documents: object[] }>;
