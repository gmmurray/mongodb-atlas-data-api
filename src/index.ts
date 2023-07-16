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

  constructor(private options: AtlasDataApiClientOptions) {
    this.baseURL = `https://data.mongodb-api.com/app/${options.dataApiAppId}/endpoint/data/v1`;
    this.headers = {
      'Content-Type': 'application/json',
      'api-key': options.apiKey,
    };
    this.defaultDataSource = options.defaultDataSource;
    this.defaultDatabase = options.defaultDatabase;
  }

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

  public findOneDocument<T>(
    request: FindOneDocumentRequest<T>,
  ): Promise<FindOneApiResponse<T>> {
    const url = '/action/findOne';
    return this.makeRequest(url, 'POST', request);
  }

  public async findDocuments<T>(
    request: FindManyDocumentsRequest<T>,
  ): Promise<FindManyApiResponse<T>> {
    const url = '/action/find';
    const { pageSize = 10, pageNumber = 1, ...rest } = request;

    const skip = (pageNumber - 1) * pageSize;

    const modifiedRequest = { ...rest, skip, limit: pageSize };

    return this.makeRequest(url, 'POST', modifiedRequest);
  }

  public insertOneDocument<T>(
    request: InsertOneDocumentRequest<T>,
  ): Promise<InsertOneApiResponse> {
    const url = '/action/insertOne';
    return this.makeRequest(url, 'POST', request);
  }

  public insertManyDocuments<T>(
    request: InsertManyDocumentsRequest<T>,
  ): Promise<InsertManyApiResponse> {
    const url = '/action/insertMany';
    return this.makeRequest(url, 'POST', request);
  }

  public updateOneDocument<T>(
    request: UpdateOneDocumentRequest<T>,
  ): Promise<UpdateOneApiResponse> {
    const url = '/action/updateOne';
    return this.makeRequest(url, 'POST', request);
  }

  public updateManyDocuments<T>(
    request: UpdateManyDocumentsRequest<T>,
  ): Promise<UpdateManyApiResponse> {
    const url = '/action/updateMany';
    return this.makeRequest(url, 'POST', request);
  }

  public replaceOneDocument<T>(
    request: ReplaceOneDocumentRequest<T>,
  ): Promise<ReplaceOneApiResponse> {
    const url = '/action/replaceOne';
    return this.makeRequest(url, 'POST', request);
  }

  public deleteOneDocument<T>(
    request: DeleteOneDocumentRequest<T>,
  ): Promise<DeleteOneApiResponse> {
    const url = '/action/deleteOne';
    return this.makeRequest(url, 'POST', request);
  }

  public deleteManyDocuments<T>(
    request: DeleteManyDocumentsRequest<T>,
  ): Promise<DeleteManyApiResponse> {
    const url = '/action/deleteMany';
    return this.makeRequest(url, 'POST', request);
  }

  public aggregateDocuments(
    request: AggregateDocumentsRequest,
  ): Promise<AggregateApiResponse> {
    const url = '/action/aggregate';
    return this.makeRequest(url, 'POST', request);
  }
}
