import {
  AggregateApiResponse,
  AggregateDocumentsRequest,
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
} from '../src/types';

import AtlasDataApiClient from '../src/index';
import axios from 'axios';

jest.mock('axios');
//const mockedAxios = axios as jest.Mocked<typeof axios>;

jest.mock('axios');

describe('AtlasDataApiClient', () => {
  let apiClient: AtlasDataApiClient;

  beforeEach(() => {
    apiClient = new AtlasDataApiClient({
      apiKey: 'your-api-key',
      dataApiUrlEndpoint: 'your-app-url-endpoint',
      defaultDataSource: 'your-data-source',
      defaultDatabase: 'your-database',
    });
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('findOneDocument', () => {
    it('should make a POST request to the correct endpoint', async () => {
      const request: FindOneDocumentRequest<any> = {
        collection: 'your-collection',
      };

      const response: FindOneApiResponse<any> = {
        data: { document: { id: '123', name: 'John Doe' } },
      };

      (axios.request as jest.Mock).mockResolvedValueOnce({ data: response });

      const result = await apiClient.findOneDocument(request);

      expect(axios.request).toHaveBeenCalledTimes(1);
      expect(axios.request).toHaveBeenCalledWith({
        method: 'POST',
        url: expect.stringContaining('/action/findOne'),
        headers: expect.any(Object),
        data: {
          collection: 'your-collection',
          dataSource: 'your-data-source',
          database: 'your-database',
        },
      });
      expect(result.data).toEqual(response);
    });

    it('should handle request errors', async () => {
      const request: FindOneDocumentRequest<any> = {
        collection: 'your-collection',
      };

      const errorMessage = 'Request failed';

      (axios.request as jest.Mock).mockRejectedValueOnce(
        new Error(errorMessage),
      );

      const result = await apiClient.findOneDocument(request);

      expect(axios.request).toHaveBeenCalledTimes(1);
      expect(result).toEqual({ error: errorMessage });
    });
  });

  describe('findDocuments', () => {
    it('should make a POST request to the correct endpoint', async () => {
      const request: FindManyDocumentsRequest<any> = {
        collection: 'your-collection',
        filter: { age: { $gte: 18 } },
        sort: { name: 1 },
        pageSize: 10,
        pageNumber: 1,
      };

      const response: FindManyApiResponse<any> = {
        data: {
          documents: [
            { id: '123', name: 'John Doe' },
            { id: '456', name: 'Jane Smith' },
          ],
        },
      };

      (axios.request as jest.Mock).mockResolvedValueOnce({ data: response });

      const result = await apiClient.findDocuments(request);

      expect(axios.request).toHaveBeenCalledTimes(1);
      expect(axios.request).toHaveBeenCalledWith({
        method: 'POST',
        url: expect.stringContaining('/action/find'),
        headers: expect.any(Object),
        data: {
          collection: 'your-collection',
          filter: { age: { $gte: 18 } },
          projection: undefined,
          limit: 10,
          skip: 0,
          sort: { name: 1 },
          dataSource: 'your-data-source',
          database: 'your-database',
        },
      });
      expect(result.data).toEqual(response);
    });

    it('should not include paging if not provided in request', async () => {
      const request: FindManyDocumentsRequest<any> = {
        collection: 'your-collection',
        filter: { age: { $gte: 18 } },
        sort: { name: 1 },
      };

      const response: FindManyApiResponse<any> = {
        data: {
          documents: [
            { id: '123', name: 'John Doe' },
            { id: '456', name: 'Jane Smith' },
          ],
        },
      };

      (axios.request as jest.Mock).mockResolvedValueOnce({ data: response });

      const result = await apiClient.findDocuments(request);

      expect(axios.request).toHaveBeenCalledTimes(1);
      expect(axios.request).toHaveBeenCalledWith({
        method: 'POST',
        url: expect.stringContaining('/action/find'),
        headers: expect.any(Object),
        data: {
          collection: 'your-collection',
          filter: { age: { $gte: 18 } },
          projection: undefined,
          sort: { name: 1 },
          dataSource: 'your-data-source',
          database: 'your-database',
        },
      });
      expect(result.data).toEqual(response);
    });

    it('should handle request errors', async () => {
      const request: FindManyDocumentsRequest<any> = {
        collection: 'your-collection',
      };

      const errorMessage = 'Request failed';

      (axios.request as jest.Mock).mockRejectedValueOnce(
        new Error(errorMessage),
      );

      const result = await apiClient.findDocuments(request);

      expect(axios.request).toHaveBeenCalledTimes(1);
      expect(result).toEqual({ error: errorMessage });
    });
  });

  describe('insertOneDocument', () => {
    it('should make a POST request to the correct endpoint', async () => {
      const request: InsertOneDocumentRequest<any> = {
        collection: 'your-collection',
        document: { name: 'John Doe' },
      };

      const response: InsertOneApiResponse = {
        data: { insertedId: '123' },
      };

      (axios.request as jest.Mock).mockResolvedValueOnce({ data: response });

      const result = await apiClient.insertOneDocument(request);

      expect(axios.request).toHaveBeenCalledTimes(1);
      expect(axios.request).toHaveBeenCalledWith({
        method: 'POST',
        url: expect.stringContaining('/action/insertOne'),
        headers: expect.any(Object),
        data: {
          collection: 'your-collection',
          dataSource: 'your-data-source',
          database: 'your-database',
          document: { name: 'John Doe' },
        },
      });
      expect(result.data).toEqual(response);
    });

    it('should handle request errors', async () => {
      const request: InsertOneDocumentRequest<any> = {
        collection: 'your-collection',
        document: { name: 'John Doe' },
      };

      const errorMessage = 'Request failed';

      (axios.request as jest.Mock).mockRejectedValueOnce(
        new Error(errorMessage),
      );

      const result = await apiClient.insertOneDocument(request);

      expect(axios.request).toHaveBeenCalledTimes(1);
      expect(result).toEqual({ error: errorMessage });
    });
  });

  describe('insertManyDocuments', () => {
    it('should make a POST request to the correct endpoint', async () => {
      const request: InsertManyDocumentsRequest<any> = {
        collection: 'your-collection',
        documents: [{ name: 'John Doe' }, { name: 'Jane Smith' }],
      };

      const response: InsertManyApiResponse = {
        data: { insertedIds: ['123', '456'] },
      };

      (axios.request as jest.Mock).mockResolvedValueOnce({ data: response });

      const result = await apiClient.insertManyDocuments(request);

      expect(axios.request).toHaveBeenCalledTimes(1);
      expect(axios.request).toHaveBeenCalledWith({
        method: 'POST',
        url: expect.stringContaining('/action/insertMany'),
        headers: expect.any(Object),
        data: {
          collection: 'your-collection',
          dataSource: 'your-data-source',
          database: 'your-database',
          documents: [{ name: 'John Doe' }, { name: 'Jane Smith' }],
        },
      });
      expect(result.data).toEqual(response);
    });

    it('should handle request errors', async () => {
      const request: InsertManyDocumentsRequest<any> = {
        collection: 'your-collection',
        documents: [{ name: 'John Doe' }, { name: 'Jane Smith' }],
      };

      const errorMessage = 'Request failed';

      (axios.request as jest.Mock).mockRejectedValueOnce(
        new Error(errorMessage),
      );

      const result = await apiClient.insertManyDocuments(request);

      expect(axios.request).toHaveBeenCalledTimes(1);
      expect(result).toEqual({ error: errorMessage });
    });
  });

  describe('updateOneDocument', () => {
    it('should make a POST request to the correct endpoint', async () => {
      const request: UpdateOneDocumentRequest<any> = {
        collection: 'your-collection',
        filter: { id: '123' },
        update: { name: 'John Doe' },
      };

      const response: UpdateOneApiResponse = {
        data: { matchedCount: 1, modifiedCount: 1 },
      };

      (axios.request as jest.Mock).mockResolvedValueOnce({ data: response });

      const result = await apiClient.updateOneDocument(request);

      expect(axios.request).toHaveBeenCalledTimes(1);
      expect(axios.request).toHaveBeenCalledWith({
        method: 'POST',
        url: expect.stringContaining('/action/updateOne'),
        headers: expect.any(Object),
        data: {
          collection: 'your-collection',
          dataSource: 'your-data-source',
          database: 'your-database',
          filter: { id: '123' },
          update: { name: 'John Doe' },
          upsert: undefined,
        },
      });
      expect(result.data).toEqual(response);
    });

    it('should handle request errors', async () => {
      const request: UpdateOneDocumentRequest<any> = {
        collection: 'your-collection',
        filter: { id: '123' },
        update: { name: 'John Doe' },
      };

      const errorMessage = 'Request failed';

      (axios.request as jest.Mock).mockRejectedValueOnce(
        new Error(errorMessage),
      );

      const result = await apiClient.updateOneDocument(request);

      expect(axios.request).toHaveBeenCalledTimes(1);
      expect(result).toEqual({ error: errorMessage });
    });
  });

  describe('updateManyDocuments', () => {
    it('should make a POST request to the correct endpoint', async () => {
      const request: UpdateManyDocumentsRequest<any> = {
        collection: 'your-collection',
        filter: { age: { $gte: 18 } },
        update: { status: 'active' },
        upsert: true,
      };

      const response: UpdateManyApiResponse = {
        data: { matchedCount: 10, modifiedCount: 5 },
      };

      (axios.request as jest.Mock).mockResolvedValueOnce({ data: response });

      const result = await apiClient.updateManyDocuments(request);

      expect(axios.request).toHaveBeenCalledTimes(1);
      expect(axios.request).toHaveBeenCalledWith({
        method: 'POST',
        url: expect.stringContaining('/action/updateMany'),
        headers: expect.any(Object),
        data: {
          collection: 'your-collection',
          dataSource: 'your-data-source',
          database: 'your-database',
          filter: { age: { $gte: 18 } },
          update: { status: 'active' },
          upsert: true,
        },
      });
      expect(result.data).toEqual(response);
    });

    it('should handle request errors', async () => {
      const request: UpdateManyDocumentsRequest<any> = {
        collection: 'your-collection',
        filter: { age: { $gte: 18 } },
        update: { status: 'active' },
      };

      const errorMessage = 'Request failed';

      (axios.request as jest.Mock).mockRejectedValueOnce(
        new Error(errorMessage),
      );

      const result = await apiClient.updateManyDocuments(request);

      expect(axios.request).toHaveBeenCalledTimes(1);
      expect(result).toEqual({ error: errorMessage });
    });
  });

  describe('replaceOneDocument', () => {
    it('should make a POST request to the correct endpoint', async () => {
      const request: ReplaceOneDocumentRequest<any> = {
        collection: 'your-collection',
        filter: { id: '123' },
        replacement: { id: '123', name: 'John Doe' },
        upsert: true,
      };

      const response: ReplaceOneApiResponse = {
        data: { matchedCount: 1, modifiedCount: 1 },
      };

      (axios.request as jest.Mock).mockResolvedValueOnce({ data: response });

      const result = await apiClient.replaceOneDocument(request);

      expect(axios.request).toHaveBeenCalledTimes(1);
      expect(axios.request).toHaveBeenCalledWith({
        method: 'POST',
        url: expect.stringContaining('/action/replaceOne'),
        headers: expect.any(Object),
        data: {
          collection: 'your-collection',
          dataSource: 'your-data-source',
          database: 'your-database',
          filter: { id: '123' },
          replacement: { id: '123', name: 'John Doe' },
          upsert: true,
        },
      });
      expect(result.data).toEqual(response);
    });

    it('should handle request errors', async () => {
      const request: ReplaceOneDocumentRequest<any> = {
        collection: 'your-collection',
        filter: { id: '123' },
        replacement: { id: '123', name: 'John Doe' },
      };

      const errorMessage = 'Request failed';

      (axios.request as jest.Mock).mockRejectedValueOnce(
        new Error(errorMessage),
      );

      const result = await apiClient.replaceOneDocument(request);

      expect(axios.request).toHaveBeenCalledTimes(1);
      expect(result).toEqual({ error: errorMessage });
    });
  });

  describe('deleteOneDocument', () => {
    it('should make a POST request to the correct endpoint', async () => {
      const request: DeleteOneDocumentRequest<any> = {
        collection: 'your-collection',
        filter: { id: '123' },
      };

      const response: DeleteOneApiResponse = {
        data: { deletedCount: 1 },
      };

      (axios.request as jest.Mock).mockResolvedValueOnce({ data: response });

      const result = await apiClient.deleteOneDocument(request);

      expect(axios.request).toHaveBeenCalledTimes(1);
      expect(axios.request).toHaveBeenCalledWith({
        method: 'POST',
        url: expect.stringContaining('/action/deleteOne'),
        headers: expect.any(Object),
        data: {
          collection: 'your-collection',
          dataSource: 'your-data-source',
          database: 'your-database',
          filter: { id: '123' },
        },
      });
      expect(result.data).toEqual(response);
    });

    it('should handle request errors', async () => {
      const request: DeleteOneDocumentRequest<any> = {
        collection: 'your-collection',
        filter: { id: '123' },
      };

      const errorMessage = 'Request failed';

      (axios.request as jest.Mock).mockRejectedValueOnce(
        new Error(errorMessage),
      );

      const result = await apiClient.deleteOneDocument(request);

      expect(axios.request).toHaveBeenCalledTimes(1);
      expect(result).toEqual({ error: errorMessage });
    });
  });

  describe('deleteManyDocuments', () => {
    it('should make a POST request to the correct endpoint', async () => {
      const request: DeleteManyDocumentsRequest<any> = {
        collection: 'your-collection',
        filter: { age: { $gte: 18 } },
      };

      const response: DeleteManyApiResponse = {
        data: { deletedCount: 10 },
      };

      (axios.request as jest.Mock).mockResolvedValueOnce({ data: response });

      const result = await apiClient.deleteManyDocuments(request);

      expect(axios.request).toHaveBeenCalledTimes(1);
      expect(axios.request).toHaveBeenCalledWith({
        method: 'POST',
        url: expect.stringContaining('/action/deleteMany'),
        headers: expect.any(Object),
        data: {
          collection: 'your-collection',
          dataSource: 'your-data-source',
          database: 'your-database',
          filter: { age: { $gte: 18 } },
        },
      });
      expect(result.data).toEqual(response);
    });

    it('should handle request errors', async () => {
      const request: DeleteManyDocumentsRequest<any> = {
        collection: 'your-collection',
        filter: { age: { $gte: 18 } },
      };

      const errorMessage = 'Request failed';

      (axios.request as jest.Mock).mockRejectedValueOnce(
        new Error(errorMessage),
      );

      const result = await apiClient.deleteManyDocuments(request);

      expect(axios.request).toHaveBeenCalledTimes(1);
      expect(result).toEqual({ error: errorMessage });
    });
  });

  describe('aggregateDocuments', () => {
    it('should make a POST request to the correct endpoint', async () => {
      const request: AggregateDocumentsRequest = {
        collection: 'your-collection',
        pipeline: [
          { $match: { age: { $gte: 18 } } },
          { $group: { _id: '$gender', count: { $sum: 1 } } },
        ],
      };

      const response: AggregateApiResponse = {
        data: {
          documents: [
            { _id: 'male', count: 10 },
            { _id: 'female', count: 15 },
          ],
        },
      };

      (axios.request as jest.Mock).mockResolvedValueOnce({ data: response });

      const result = await apiClient.aggregateDocuments(request);

      expect(axios.request).toHaveBeenCalledTimes(1);
      expect(axios.request).toHaveBeenCalledWith({
        method: 'POST',
        url: expect.stringContaining('/action/aggregate'),
        headers: expect.any(Object),
        data: {
          collection: 'your-collection',
          dataSource: 'your-data-source',
          database: 'your-database',
          pipeline: [
            { $match: { age: { $gte: 18 } } },
            { $group: { _id: '$gender', count: { $sum: 1 } } },
          ],
        },
      });
      expect(result.data).toEqual(response);
    });

    it('should handle request errors', async () => {
      const request: AggregateDocumentsRequest = {
        collection: 'your-collection',
        pipeline: [{ $match: { age: { $gte: 18 } } }],
      };

      const errorMessage = 'Request failed';

      (axios.request as jest.Mock).mockRejectedValueOnce(
        new Error(errorMessage),
      );

      const result = await apiClient.aggregateDocuments(request);

      expect(axios.request).toHaveBeenCalledTimes(1);
      expect(result).toEqual({ error: errorMessage });
    });
  });
});
