import type { NextPage } from 'next';
import Link from 'next/link';
import Layout from '../../../components/Layout';
import { useRouter } from 'next/router';
import { useProgramQuery, useProgramsQuery } from '../../../generated/request';
import EventUrl from '../../../components/EventUrl';
import nl2br from 'react-nl2br';
import dayjs from 'dayjs';
import 'dayjs/locale/ja';
import { Button, majorScale } from 'evergreen-ui';
dayjs.locale('ja');

const ProgramsItem: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const { data, refetch } = useProgramQuery({ id: parseInt(id as string, 10) });
  if (data === undefined) {
    return null;
  }
  if (data.program == null) {
    return <div>Not Found</div>;
  }
  const { name, date, url, ownerUrl, detail, location } = data.program;
  const calendarUrl = new URL('https://www.google.com/calendar/event');
  calendarUrl.searchParams.append('action', 'TEMPLATE');
  calendarUrl.searchParams.append('text', name);
  calendarUrl.searchParams.append(
    'dates',
    `${dayjs(date).format('YYYYMMDDTHHmmss')}/${dayjs(date)
      .add(1, 'hour')
      .format('YYYYMMDDTHHmmss')}`
  );
  if (detail) {
    calendarUrl.searchParams.append('details', detail);
  }
  calendarUrl.searchParams.append('trp', 'false');
  if (url) {
    calendarUrl.searchParams.append('sprop', url);
  }
  return (
    <Layout>
      <div className="flex flex-col items-center">
        <div className="w-96 max-w-full text-slate-700 ">
          <div className="self-start pt-2 pb-2">
            <Link className=" text-blue-500 " href="/programs">
              ◁合わせ一覧に戻る
            </Link>
          </div>
          <div className="bg-white pl-4 pr-4 pt-4 pb-8 rounded-xl flex flex-col">
            <h1 className="text-2xl font-bold">{name}</h1>
            <div className="mt-2 flex justify-between align-center">
              <div className="bg-pink-500 text-white rounded-full font-bold pl-2 pr-2 self-start">
                {dayjs(date).format('D日(dd) HH:mm')}～
              </div>
              <Link legacyBehavior passHref href={calendarUrl}>
                <Button is="a" size="small" marginRight={majorScale(1)}>
                  Googleカレンダーに追加
                </Button>
              </Link>
            </div>
            {location && (
              <div className="mt-4">
                <h2 className="text-xl font-bold mb-1">場所</h2>
                <p>{location}</p>
              </div>
            )}
            {url && (
              <div className="mt-4">
                <h2 className="text-xl font-bold mb-1">リンク</h2>
                <EventUrl className=" block" url={url} />
              </div>
            )}
            {ownerUrl && (
              <div className="mt-4">
                <h2 className="text-xl font-bold mb-1">主催者</h2>
                <EventUrl url={ownerUrl} />
              </div>
            )}
            {detail && (
              <div className="mt-4">
                <h2 className="text-xl font-bold mb-1">詳細</h2>
                <p>{nl2br(detail)}</p>
              </div>
            )}
            <div className="border-t mt-6 mb-6" />
            <div className="flex justify-end">
              <Link legacyBehavior passHref href={`/programs/edit/${id}`}>
                <Button is="a" size="small">
                  編集する
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProgramsItem;
