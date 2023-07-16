import {
  AggregateApiResponse,
  AggregateDocumentsRequest,
  ApiResponse,
  AtlasDataApiClientOptions,
  BaseRequest,
  DeleteManyApiResponse,
  DeleteManyDocumentsRequest,
  DeleteOneApiResponse,
  DeleteOneDocumentRequest,
  FindManyApiResponse,
  FindManyDocumentsRequest,
  FindOneApiResponse,
  FindOneDocumentRequest,
  InsertManyApiResponse,
  InsertManyDocumentsRequest,
  InsertOneApiResponse,
  InsertOneDocumentRequest,
  ReplaceOneApiResponse,
  ReplaceOneDocumentRequest,
  UpdateManyApiResponse,
  UpdateManyDocumentsRequest,
  UpdateOneApiResponse,
  UpdateOneDocumentRequest,
} from './types';
import axios, { AxiosError, AxiosRequestConfig } from 'axios';

export default class AtlasDataApiClient {
  private baseURL: string;
  private headers: { [key: string]: string };
  private defaultDataSource?: string;
  private defaultDatabase?: string;

  /**
   * Initializes a new instance of the AtlasDataApiClient class.
   * @param {AtlasDataApiClientOptions} options - The options required to initialize the client.
   */
  constructor(options: AtlasDataApiClientOptions) {
    this.baseURL = `https://data.mongodb-api.com/app/${options.dataApiAppId}/endpoint/data/v1`;
    this.headers = {
      'Content-Type': 'application/json',
      'api-key': options.apiKey,
    };
    this.defaultDataSource = options.defaultDataSource;
    this.defaultDatabase = options.defaultDatabase;
  }

  /**
   * Handles the error occurred during an API request.
   * @param {AxiosError} error - The error object.
   * @private
   */
  private handleRequestError(error: AxiosError): void {
    if (error.response) {
      console.error('Request failed with status', error.response.status);
      console.error('Response data:', error.response.data);
    } else if (error.request) {
      console.error('No response received from server:', error.request);
    } else {
      console.error('Error occurred while sending request:', error.message);
    }
  }

  /**
   * Makes a request to the Atlas Data API.
   * @param {string} url - The API endpoint URL.
   * @param {string} method - The HTTP method for the request.
   * @param {TRequest} request - The request payload.
   * @returns {Promise<TResponse>} - The API response.
   * @private
   */
  private async makeRequest<
    TResponse extends ApiResponse<any>,
    TRequest extends BaseRequest,
  >(url: string, method: string, request: TRequest): Promise<TResponse> {
    try {
      const config: AxiosRequestConfig = {
        method,
        url: `${this.baseURL}${url}`,
        headers: this.headers,
        data: {
          ...request,
          dataSource: request.dataSource || this.defaultDataSource,
          database: request.database || this.defaultDatabase,
        },
      };

      const response = await axios.request(config);
      return { data: response.data } as TResponse;
    } catch (error: any) {
      this.handleRequestError(error);
      return { error: error.message } as TResponse;
    }
  }

  /**
   * Finds a single document in the specified collection.
   * @param {FindOneDocumentRequest<T>} request - The request parameters.
   * @returns {Promise<FindOneApiResponse<T>>} - The API response.
   */
  public findOneDocument<T>(
    request: FindOneDocumentRequest<T>,
  ): Promise<FindOneApiResponse<T>> {
    const url = '/action/findOne';
    return this.makeRequest(url, 'POST', request);
  }

  /**
   * Finds multiple documents in the specified collection.
   * @param {FindManyDocumentsRequest<T>} request - The request parameters.
   * @returns {Promise<FindManyApiResponse<T>>} - The API response.
   */
  public async findDocuments<T>(
    request: FindManyDocumentsRequest<T>,
  ): Promise<FindManyApiResponse<T>> {
    const url = '/action/find';
    const { pageSize = 10, pageNumber = 1, ...rest } = request;

    const skip = (pageNumber - 1) * pageSize;

    const modifiedRequest = { ...rest, skip, limit: pageSize };

    return this.makeRequest(url, 'POST', modifiedRequest);
  }

  /**
   * Inserts a single document into the specified collection.
   * @param {InsertOneDocumentRequest<T>} request - The request parameters.
   * @returns {Promise<InsertOneApiResponse>} - The API response.
   */
  public insertOneDocument<T>(
    request: InsertOneDocumentRequest<T>,
  ): Promise<InsertOneApiResponse> {
    const url = '/action/insertOne';
    return this.makeRequest(url, 'POST', request);
  }

  /**
   * Inserts multiple documents into the specified collection.
   * @param {InsertManyDocumentsRequest<T>} request - The request parameters.
   * @returns {Promise<InsertManyApiResponse>} - The API response.
   */
  public insertManyDocuments<T>(
    request: InsertManyDocumentsRequest<T>,
  ): Promise<InsertManyApiResponse> {
    const url = '/action/insertMany';
    return this.makeRequest(url, 'POST', request);
  }

  /**
   * Updates a single document in the specified collection.
   * @param {UpdateOneDocumentRequest<T>} request - The request parameters.
   * @returns {Promise<UpdateOneApiResponse>} - The API response.
   */
  public updateOneDocument<T>(
    request: UpdateOneDocumentRequest<T>,
  ): Promise<UpdateOneApiResponse> {
    const url = '/action/updateOne';
    return this.makeRequest(url, 'POST', request);
  }

  /**
   * Updates multiple documents in the specified collection.
   * @param {UpdateManyDocumentsRequest<T>} request - The request parameters.
   * @returns {Promise<UpdateManyApiResponse>} - The API response.
   */
  public updateManyDocuments<T>(
    request: UpdateManyDocumentsRequest<T>,
  ): Promise<UpdateManyApiResponse> {
    const url = '/action/updateMany';
    return this.makeRequest(url, 'POST', request);
  }

  /**
   * Replaces a single document in the specified collection.
   * @param {ReplaceOneDocumentRequest<T>} request - The request parameters.
   * @returns {Promise<ReplaceOneApiResponse>} - The API response.
   */
  public replaceOneDocument<T>(
    request: ReplaceOneDocumentRequest<T>,
  ): Promise<ReplaceOneApiResponse> {
    const url = '/action/replaceOne';
    return this.makeRequest(url, 'POST', request);
  }

  /**
   * Deletes a single document from the specified collection.
   * @param {DeleteOneDocumentRequest<T>} request - The request parameters.
   * @returns {Promise<DeleteOneApiResponse>} - The API response.
   */
  public deleteOneDocument<T>(
    request: DeleteOneDocumentRequest<T>,
  ): Promise<DeleteOneApiResponse> {
    const url = '/action/deleteOne';
    return this.makeRequest(url, 'POST', request);
  }

  /**
   * Deletes multiple documents from the specified collection.
   * @param {DeleteManyDocumentsRequest<T>} request - The request parameters.
   * @returns {Promise<DeleteManyApiResponse>} - The API response.
   */
  public deleteManyDocuments<T>(
    request: DeleteManyDocumentsRequest<T>,
  ): Promise<DeleteManyApiResponse> {
    const url = '/action/deleteMany';
    return this.makeRequest(url, 'POST', request);
  }

  /**
   * Performs an aggregation on the specified collection.
   * @param {AggregateDocumentsRequest} request - The request parameters.
   * @returns {Promise<AggregateApiResponse>} - The API response.
   */
  public aggregateDocuments(
    request: AggregateDocumentsRequest,
  ): Promise<AggregateApiResponse> {
    const url = '/action/aggregate';
    return this.makeRequest(url, 'POST', request);
  }
}
