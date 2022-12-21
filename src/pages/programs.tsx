import { Button, Pane, majorScale, Heading } from 'evergreen-ui';
import Link from 'next/link';
import type { NextPage } from 'next';
import Layout from '../components/Layout';
import { useProgramsQuery } from '../generated/request';
import dayjs from 'dayjs';
import 'dayjs/locale/ja';
import LocalizedFormat from 'dayjs/plugin/localizedFormat';

dayjs.extend(LocalizedFormat);
dayjs.locale('ja');

const Belongings: NextPage = () => {
  const { data, refetch } = useProgramsQuery();
  if (typeof data === 'undefined') {
    return null;
  }

  return (
    <Layout>
      <Pane className="flex flex-col items-center">
        <Link legacyBehavior href="/programs/add" passHref>
          <Button
            className="mt-4"
            is="a"
            appearance="primary"
            height={majorScale(5)}
          >
            合わせを追加する
          </Button>
        </Link>
        <div className="flex mt-4">
          {data.programs.map(({ id, date, name }) => (
            <Link href={`/programs/item/${id}`} key={id}>
              <div className="flex flex-col w-60 h-40 shadow-sm text-slate-700 bg-white mt-1 mr-2 ml-2 p-2 rounded-sm">
                <Heading size={600} is="h2" display="block">
                  {name}
                </Heading>
                <p className="text-sm">
                  {dayjs(date).format('M月D日(dd) HH:mm')}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </Pane>
    </Layout>
  );
};

export default Belongings;
