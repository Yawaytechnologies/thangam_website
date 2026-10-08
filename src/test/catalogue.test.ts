import { afterEach, describe, expect, it, vi } from 'vitest';
import { api } from '../api/http';
import { getProperties } from '../api/properties';
import { sampleProperties } from '../assets/data/sample-properties';

afterEach(() => vi.restoreAllMocks());

describe('property API boundary', () => {
  it('accepts the catalogue contract and forwards cancellation', async () => {
    const signal = new AbortController().signal;
    const request = vi.spyOn(api, 'get').mockResolvedValue({ data: sampleProperties });
    expect(await getProperties(signal)).toEqual(sampleProperties);
    expect(request).toHaveBeenCalledWith('/properties', { signal });
  });
  it('rejects malformed server data rather than rendering broken cards', async () => {
    vi.spyOn(api, 'get').mockResolvedValue({ data: [{ name: 'Incomplete record' }] });
    await expect(getProperties()).rejects.toThrow();
  });
  it('propagates network failures so the page can show the sample fallback', async () => {
    vi.spyOn(api, 'get').mockRejectedValue(new Error('Network unavailable'));
    await expect(getProperties()).rejects.toThrow('Network unavailable');
  });
});
