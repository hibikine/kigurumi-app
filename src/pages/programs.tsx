import { Button, Pane, majorScale } from 'evergreen-ui';
import Link from 'next/link';
import type { NextPage } from 'next';
import { useState } from 'react';
import Layout from '../components/Layout';
import { useProgramsQuery } from '../generated/request';
import dayjs from 'dayjs';
import 'dayjs/locale/ja';
import LocalizedFormat from 'dayjs/plugin/localizedFormat';
import { ProgramCard } from './ProgramCard';
import { Listbox, Transition } from '@headlessui/react';
import { Switch } from '@headlessui/react';
import clsx from 'clsx';
import KAListbox from '../components/KAListbox';
import { ReactNode } from 'react';

dayjs.extend(LocalizedFormat);
dayjs.locale('ja');

const KASwitch = ({
  id,
  checked,
  onChange,
  children,
}: {
  id: string;
  checked: boolean;
  onChange: (v: boolean) => void;
  children: ReactNode;
}) => (
  <>
    <Switch
      id={id}
      checked={checked}
      onChange={onChange}
      className={clsx(
        checked ? `bg-pink-900` : 'bg-pink-500',
        'relative inline-flex h-[38px] w-[74px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75'
      )}
    >
      <span className="sr-only">{children}</span>
      <span
        aria-hidden="true"
        className={`${checked ? 'translate-x-9' : 'translate-x-0'}
            pointer-events-none inline-block h-[34px] w-[34px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
      />
    </Switch>
    <label className="ml-2 font-medium" htmlFor="is-remove-finished">
      {children}
    </label>
  </>
);

const Belongings: NextPage = () => {
  const { data, refetch } = useProgramsQuery(undefined, {
    // refetchInterval: 1000 * 120,
  });
  const orders = ['日時が早い順', '日時が遅い順'] as const;
  const [isRemoveFinished, setIsRemoveFinished] = useState(false);
  const [order, setOrder] = useState<typeof orders[number]>(orders[1]);
  if (typeof data === 'undefined') {
    return null;
  }

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
          <div className="flex flex-col items-center mt-4 w-full flex-wrap sm:grid-cols-2 sm:gap-2 md:w-auto md:grid md:grid-cols-2 lg:gap-2 lg:w-[768px] xl:grid-cols-4 xl:gap-4 xl:w-[1024px]">
            {[...data.programs]
              .sort((v1, v2) => {
                if (order === orders[0]) {
                  return dayjs(v1.date).unix() - dayjs(v2.date).unix();
                } else {
                  return dayjs(v2.date).unix() - dayjs(v1.date).unix();
                }
              })
              .filter((v) => {
                if (isRemoveFinished) {
                  return dayjs(v.date).unix() + 3600 > dayjs().unix();
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
        </div>
      </Pane>
    </Layout>
  );
};

export default Belongings;
