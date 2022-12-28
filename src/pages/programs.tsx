import { Spinner } from 'evergreen-ui';
import Link from 'next/link';
import type { NextPage } from 'next';
import { useEffect, useState } from 'react';
import { Filters } from '../components/Filters';
import { ProgramsList } from '../components/ProgramsList';
import Layout from '../components/Layout';
import { useProgramsQuery } from '../generated/request';
import type { ProgramsQuery } from '../generated/request';
import dayjs from '../lib/dayjs';
import LinkButton from '../components/LinkButton';

export const orders = [
  '日時が早い順',
  '日時が遅い順',
  '更新が新しい順',
  '更新が古い順',
  '登録が新しい順',
  '登録が古い順',
] as const;

/** dataをorderに応じてソートする */
const programsQuerySorter = (
  data: ProgramsQuery['programs'],
  order: typeof orders[number]
): ProgramsQuery['programs'] => {
  return data.sort((v1, v2) => {
    if (order === orders[0]) {
      return (
        dayjs.tz(v1.date, 'UTC').tz('Asia/Tokyo').unix() -
        dayjs.tz(v2.date, 'UTC').tz('Asia/Tokyo').unix()
      );
    } else if (order === orders[1]) {
      return (
        dayjs.tz(v2.date, 'UTC').tz('Asia/Tokyo').unix() -
        dayjs.tz(v1.date, 'UTC').tz('Asia/Tokyo').unix()
      );
    } else if (order === orders[2]) {
      return +new Date(v2.updatedAt) - +new Date(v1.updatedAt);
    } else if (order === orders[3]) {
      return +new Date(v1.updatedAt) - +new Date(v2.updatedAt);
    } else if (order === orders[4]) {
      return +new Date(v2.createdAt) - +new Date(v1.createdAt);
    } else {
      return +new Date(v1.createdAt) - +new Date(v2.createdAt);
    }
  });
};

/** ProgramsQueryを条件に応じてフィルターする */
const programQueryFilter = (
  data: ProgramsQuery['programs'],
  isRemoveFinished: boolean,
  searchTargetText: string
) => {
  return data.filter((v) => {
    let filterValue = true;
    if (isRemoveFinished) {
      filterValue &&=
        dayjs.tz(v.date, 'UTC').tz('Asia/Tokyo').unix() + 3600 >
        dayjs().tz('Asia/Tokyo').unix();
    }
    if (searchTargetText !== '') {
      filterValue &&=
        v.name.includes(searchTargetText) ||
        v.detail?.includes(searchTargetText);
    }
    return filterValue;
  });
};

export const getFilteredData = (
  data: ProgramsQuery['programs'] | undefined,
  order: typeof orders[number],
  isRemoveFinished: boolean,
  searchTargetText: string
): ProgramsQuery['programs'] | undefined => {
  if (!data) {
    return undefined;
  }
  const sortedData = programsQuerySorter(data, order);
  const filteredData = programQueryFilter(
    sortedData,
    isRemoveFinished,
    searchTargetText
  );
  return filteredData;
};

const useFilter = (): {
  searchText: string;
  setSearchText: React.Dispatch<React.SetStateAction<string>>;
  searchTargetText: string;
  isRemoveFinished: boolean;
  setIsRemoveFinished: React.Dispatch<React.SetStateAction<boolean>>;
  order: typeof orders[number];
  setOrder: React.Dispatch<React.SetStateAction<typeof orders[number]>>;
} => {
  const [searchText, setSearchText] = useState('');
  const [searchTargetText, setSearchTargetText] = useState('');
  useEffect(() => {
    const timer = setTimeout(() => {
      setSearchTargetText(searchText);
    }, 600);
    return () => clearTimeout(timer);
  }, [searchText, setSearchTargetText]);

  const [isRemoveFinished, setIsRemoveFinished] = useState(false);
  const [order, setOrder] = useState<typeof orders[number]>(orders[0]);
  return {
    searchText,
    setSearchText,
    searchTargetText,
    isRemoveFinished,
    setIsRemoveFinished,
    order,
    setOrder,
  };
};

const Programs: NextPage = () => {
  const { data, isFetched } = useProgramsQuery(undefined, {
    // refetchInterval: 1000 * 120,
  });
  const {
    searchText,
    setSearchText,
    searchTargetText,
    isRemoveFinished,
    setIsRemoveFinished,
    order,
    setOrder,
  } = useFilter();
  const filteredData = getFilteredData(
    data?.programs,
    order,
    isRemoveFinished,
    searchTargetText
  );

  return (
    <Layout>
      <div className="flex flex-col items-center">
        <div className="mt-4 flex w-11/12 flex-col items-center lg:w-10/12">
          <div className="flex w-full flex-col items-center justify-center px-2 text-slate-700 lg:flex-row lg:justify-start">
            <Filters
              order={order}
              setOrder={setOrder}
              isRemoveFinished={isRemoveFinished}
              setIsRemoveFinished={setIsRemoveFinished}
              searchText={searchText}
              setSearchText={setSearchText}
            />
            <LinkButton
              className="mt-4 lg:mt-0 lg:ml-auto"
              href="/programs/add"
              color="primary"
              size="large"
            >
              合わせを追加する
            </LinkButton>
          </div>
          {isFetched && data ? (
            <ProgramsList order={order} filteredData={filteredData} />
          ) : (
            <div className="flex h-80 w-full items-center justify-center">
              <Spinner />
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Programs;
