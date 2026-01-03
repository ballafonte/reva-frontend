// Mock data and utilities for tests

export const mockApiResponse = <T>(data: T, status = 200): Response => {
  return {
    ok: status >= 200 && status < 300,
    status,
    statusText: status === 200 ? 'OK' : 'Error',
    json: async () => data,
    text: async () => JSON.stringify(data),
    headers: new Headers(),
    body: null,
    bodyUsed: false,
    redirected: false,
    type: 'default',
    url: '',
    clone: jest.fn(),
    arrayBuffer: jest.fn(),
    blob: jest.fn(),
    formData: jest.fn(),
  } as unknown as Response;
};

export const mockFetch = (response: Response) => {
  (global.fetch as jest.Mock).mockResolvedValue(response);
};

export const mockFetchError = (error: Error) => {
  (global.fetch as jest.Mock).mockRejectedValue(error);
};
