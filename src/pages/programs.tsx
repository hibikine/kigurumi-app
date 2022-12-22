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

dayjs.extend(LocalizedFormat);
dayjs.locale('ja');

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
        <div className="flex mt-4 flex-col lg:w-10/12">
          <div className="flex flex-col lg:flex-row justify-center lg:justify-start items-center w-full pl-2 pr-2 text-slate-700">
            <div className="w-60 mr-4">
              <KAListbox
                value={order}
                onChange={setOrder}
                options={orders as unknown as typeof orders[number][]}
              />
            </div>
            <Switch
              id="is-remove-finished"
              checked={isRemoveFinished}
              onChange={setIsRemoveFinished}
              className={clsx(
                isRemoveFinished ? `bg-teal-900` : 'bg-teal-700',
                'relative inline-flex h-[38px] w-[74px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75'
              )}
            >
              <span className="sr-only">終了した合わせを表示しない</span>
              <span
                aria-hidden="true"
                className={`${
                  isRemoveFinished ? 'translate-x-9' : 'translate-x-0'
                }
            pointer-events-none inline-block h-[34px] w-[34px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
              />
            </Switch>
            <label htmlFor="is-remove-finished">
              終了した合わせを表示しない
            </label>
            <Link legacyBehavior href="/programs/add" passHref>
              <Button
                className="mt-4 w-60 lg:ml-auto"
                is="a"
                appearance="primary"
                height={majorScale(5)}
              >
                合わせを追加する
              </Button>
            </Link>
          </div>
          <div className="flex mt-4 justify-center flex-wrap">
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
              .map(({ id, date, name }) => (
                <ProgramCard key={id} id={id} date={date} name={name} />
              ))}
          </div>
        </div>
      </Pane>
    </Layout>
  );
};

export default Belongings;
