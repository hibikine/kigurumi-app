import { Pane, Spinner, TextInput, TextInputField } from 'evergreen-ui';
import Link from 'next/link';
import type { NextPage } from 'next';
import { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import { useProgramsQuery } from '../generated/request';
import dayjs from '../lib/dayjs';
import { ProgramCard } from '../components/ProgramCard';
import KAListbox from '../components/KAListbox';
import { KASwitch } from '../components/KASwitch';
import type { Dayjs } from 'dayjs';
import clsx from 'clsx';

const Programs: NextPage = () => {
  const { data, refetch, isFetched } = useProgramsQuery(undefined, {
    // refetchInterval: 1000 * 120,
  });
  const [searchText, setSearchText] = useState('');
  const [searchTargetText, setSearchTargetText] = useState('');
  useEffect(() => {
    const timer = setTimeout(() => {
      setSearchTargetText(searchText);
    }, 600);
    return () => clearTimeout(timer);
  }, [searchText, setSearchTargetText]);
  const orders = [
    '日時が早い順',
    '日時が遅い順',
    '更新が新しい順',
    '更新が古い順',
    '登録が新しい順',
    '登録が古い順',
  ] as const;
  const [isRemoveFinished, setIsRemoveFinished] = useState(false);
  const [order, setOrder] = useState<typeof orders[number]>(orders[0]);
  const filteredData =
    data &&
    [...data.programs]
      .sort((v1, v2) => {
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
      })
      .filter((v) => {
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
  type NotNullDataType = Exclude<typeof data, undefined>;
  const dateGroup = filteredData?.reduce((acc, v) => {
    const date = dayjs.tz(v.date, 'UTC').tz('Asia/Tokyo');
    const key = date.format('YYYY-MM-DD');
    if (!acc[key]) {
      acc[key] = [];
    }
    acc[key].push(v);
    return acc;
  }, {} as { [key: string]: NotNullDataType['programs'] });

  return (
    <Layout>
      <div className="flex flex-col items-center">
        <div className="mt-4 flex w-11/12 flex-col items-center lg:w-10/12">
          <div className="flex w-full flex-col items-center justify-center px-2 text-slate-700 lg:flex-row lg:justify-start">
            <div className="flex flex-col items-center lg:flex-row lg:justify-center">
              <div className="mr-4 w-60">
                <KAListbox
                  value={order}
                  onChange={setOrder}
                  options={orders as unknown as typeof orders[number][]}
                />
              </div>
              <div className="mt-4 flex items-center lg:mt-0">
                <KASwitch
                  id="is-remove-finished"
                  checked={isRemoveFinished}
                  onChange={setIsRemoveFinished}
                >
                  過去の合わせを表示しない
                </KASwitch>
              </div>
              <div className="mr-2 mt-2 lg:ml-4 lg:mt-0">
                <TextInput
                  value={searchText}
                  placeholder="検索キーワード"
                  size="large"
                  onChange={(e: any) => setSearchText(e.target.value)}
                />
              </div>
            </div>
            <Link
              className="mt-4 flex h-12 w-60 items-center justify-center rounded-lg bg-blue-600 text-center font-bold text-white lg:mt-0 lg:ml-auto"
              href="/programs/add"
            >
              合わせを追加する
            </Link>
          </div>
          {isFetched && data ? (
            <div className="mt-4 flex w-full flex-col flex-wrap items-center md:w-auto lg:mt-8 lg:w-[768px] xl:w-[1024px] 2xl:mx-10">
              {(order === orders[0] || order === orders[1]) &&
                dateGroup &&
                Object.entries(dateGroup).map(([date, dayData], i) => {
                  const dayDiff = dayjs(date).diff(dayjs('2023-01-05'), 'day');
                  const dayDiffStr =
                    dayDiff >= 0 && dayDiff < 4
                      ? ` 《JMoF${dayDiff + 1}日目》`
                      : '';
                  return (
                    <div className="w-full pl-1 sm:pl-0" key={i}>
                      {(order === orders[0] || order === orders[1]) && (
                        <>
                          <p className="text-sm font-bold text-slate-500">
                            {date}
                            <span className="inline font-normal">
                              {dayDiffStr}
                            </span>
                          </p>
                          <div className="mb-2 border-b border-b-slate-200" />
                        </>
                      )}
                      <div className="mb-8 w-full">
                        {dayData.map(({ id, date, name, ownerUrl }, i) => (
                          <ProgramCard
                            key={id}
                            id={id}
                            date={date}
                            name={name}
                            ownerUrl={ownerUrl ?? undefined}
                            prevDate={i === 0 ? undefined : dayData[i - 1].date}
                            order={order}
                          />
                        ))}
                      </div>
                    </div>
                  );
                })}
              {filteredData && !(order === orders[0] || order === orders[1]) && (
                <div className="w-full">
                  {filteredData.map(({ id, date, name, ownerUrl }) => (
                    <ProgramCard
                      key={id}
                      id={id}
                      date={date}
                      name={name}
                      ownerUrl={ownerUrl ?? undefined}
                      order={order}
                    />
                  ))}
                </div>
              )}
            </div>
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
