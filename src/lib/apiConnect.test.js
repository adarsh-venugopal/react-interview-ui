// Fully mock axios.create() and its instance
const mockGet = jest.fn();

jest.mock('axios', () => {
  return {
    create: () => ({
      get: mockGet,
    }),
  };
});

import { fetchAllWidgets } from './apiConnect';

describe('fetchAllWidgets', () => {
  beforeEach(() => {
    mockGet.mockReset(); // Clear previous calls
  });

  it('returns response data', async () => {
    const widgetList = [{ name: 'Widget Jones', description: 'Keeps a diary', price: 9.95 }];
    mockGet.mockResolvedValueOnce({ data: widgetList });

    const result = await fetchAllWidgets();
    expect(result).toEqual(widgetList);
  });

  it('throws on fetch error', async () => {
    mockGet.mockRejectedValueOnce(new Error('Fetch failed'));
    await expect(fetchAllWidgets()).rejects.toThrow('Fetch failed');
  });
});