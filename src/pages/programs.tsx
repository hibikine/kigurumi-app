import { Pane, Spinner } from 'evergreen-ui';
import Link from 'next/link';
import type { NextPage } from 'next';
import { useState } from 'react';
import Layout from '../components/Layout';
import { useProgramsQuery } from '../generated/request';
import dayjs from '../lib/dayjs';
import { ProgramCard } from '../components/ProgramCard';
import KAListbox from '../components/KAListbox';
import { KASwitch } from '../components/KASwitch';

const Programs: NextPage = () => {
  const { data, refetch, isFetched } = useProgramsQuery(undefined, {
    // refetchInterval: 1000 * 120,
  });
  const orders = ['日時が早い順', '日時が遅い順'] as const;
  const [isRemoveFinished, setIsRemoveFinished] = useState(false);
  const [order, setOrder] = useState<typeof orders[number]>(orders[1]);

  return (
    <Layout>
      <Pane className="flex flex-col items-center">
        <div className="flex mt-4 flex-col w-11/12 lg:w-10/12 items-center">
          <div className="flex flex-col lg:flex-row justify-center lg:justify-start items-center w-full pl-2 pr-2 text-slate-700">
            <div className="flex flex-col items-center md:flex-row md:justify-center">
              <div className="w-60 mr-4">
                <KAListbox
                  value={order}
                  onChange={setOrder}
                  options={orders as unknown as typeof orders[number][]}
                />
              </div>
              <div className="flex items-center mt-4 lg:mt-0">
                <KASwitch
                  id="is-remove-finished"
                  checked={isRemoveFinished}
                  onChange={setIsRemoveFinished}
                >
                  過去の合わせを表示しない
                </KASwitch>
              </div>
            </div>
            <Link
              className="mt-4 lg:mt-0 w-60 h-12 text-center font-bold lg:ml-auto rounded-lg bg-blue-600 text-white flex justify-center items-center"
              href="/programs/add"
            >
              合わせを追加する
            </Link>
          </div>
          {isFetched && data ? (
            <div className="flex flex-col items-center mt-4 w-full flex-wrap sm:grid-cols-2 sm:gap-2 md:w-auto md:grid md:grid-cols-2 lg:gap-2 lg:w-[768px] xl:grid-cols-3 xl:gap-3 xl:w-[1024px] 2xl:gap-4 2xl:grid-cols-4 2xl:w-full 2xl:mx-10">
              {[...data.programs]
                .sort((v1, v2) => {
                  if (order === orders[0]) {
                    return (
                      dayjs.tz(v1.date, 'UTC').tz('Asia/Tokyo').unix() -
                      dayjs.tz(v2.date, 'UTC').tz('Asia/Tokyo').unix()
                    );
                  } else {
                    return (
                      dayjs.tz(v2.date, 'UTC').tz('Asia/Tokyo').unix() -
                      dayjs.tz(v1.date, 'UTC').tz('Asia/Tokyo').unix()
                    );
                  }
                })
                .filter((v) => {
                  if (isRemoveFinished) {
                    return (
                      dayjs.tz(v.date, 'UTC').tz('Asia/Tokyo').unix() + 3600 >
                      dayjs().tz('Asia/Tokyo').unix()
                    );
                  } else {
                    return true;
                  }
                })
                .map(({ id, date, name, ownerUrl }) => (
                  <ProgramCard
                    key={id}
                    id={id}
                    date={date}
                    name={name}
                    ownerUrl={ownerUrl ?? undefined}
                  />
                ))}
            </div>
          ) : (
            <div className="w-full h-80 flex justify-center items-center">
              <Spinner />
            </div>
          )}
        </div>
      </Pane>
    </Layout>
  );
};

export default Programs;
