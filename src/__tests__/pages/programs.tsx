import type { ProgramsQuery } from '../../generated/request';
import { getFilteredData } from '../../pages/programs';

describe('getFilteredData', () => {
  const testData: ProgramsQuery['programs'] = [
    {
      __typename: 'Program',
      id: 1,
      name: 'test1',
      date: '2021-01-01T00:00:00.000Z',
      endDate: '2021-01-01T00:00:00.000Z',
      detail: 'test1',
      location: 'test1',
      url: 'https://twipla.jp/events/1',
      ownerUrl: 'https://twitter.com/hibikinekage',
      createdAt: '2021-01-01T00:00:00.000Z',
      updatedAt: '2021-01-01T00:00:00.000Z',
    },
    {
      __typename: 'Program',
      id: 2,
      name: 'test2',
      date: '2021-01-02T00:00:00.000Z',
      endDate: '2021-01-02T00:00:00.000Z',
      detail: 'test2',
      location: 'test2',
      url: 'https://twipla.jp/events/2',
      ownerUrl: 'https://twitter.com/hibikinekage',
      createdAt: '2021-01-01T00:00:00.000Z',
      updatedAt: '2021-01-01T00:00:00.000Z',
    },
    {
      __typename: 'Program',
      id: 3,
      name: 'test3',
      date: '2021-01-03T00:00:00.000Z',
      endDate: '2021-01-03T00:00:00.000Z',
      detail: 'test3',
      location: 'test3',
      url: 'https://twipla.jp/events/3',
      ownerUrl: 'https://twitter.com/hibikinekage',
      createdAt: '2021-01-01T00:00:00.000Z',
      updatedAt: '2021-01-01T00:00:00.000Z',
    },
    {
      __typename: 'Program',
      id: 4,
      name: 'test4',
      date: '2021-01-04T00:00:00.000Z',
      endDate: null,
      detail: 'test4',
      location: null,
      url: null,
      ownerUrl: null,
      createdAt: '2021-01-01T00:00:00.000Z',
      updatedAt: '2021-01-01T00:00:00.000Z',
    },
  ];
  it('returns undefined when undefined passed', () => {
    expect(
      getFilteredData(undefined, '日時が早い順', false, '')
    ).toBeUndefined();
  });
  it('returns empty array when empty array passed', () => {
    expect(getFilteredData([], '日時が早い順', false, '')).toEqual([]);
  });
  it('returns date asc when passed 日時が早い順', () => {
    expect(
      getFilteredData(testData, '日時が早い順', false, '')?.map((v) => v.id)
    ).toEqual([1, 2, 3, 4]);
  });
  it('returns date desc when passed 日時が遅い順', () => {
    expect(
      getFilteredData(testData, '日時が遅い順', false, '')?.map((v) => v.id)
    ).toEqual([4, 3, 2, 1]);
  });
  it('filters by text', () => {
    expect(
      getFilteredData(testData, '日時が早い順', false, 'test1')?.map(
        (v) => v.id
      )
    ).toEqual([1]);
  });
});
