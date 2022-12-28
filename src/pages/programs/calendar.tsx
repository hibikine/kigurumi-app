import Image from 'next/image';
import Link from 'next/link';
import Layout from '../../components/Layout';
import { useProgramsQuery } from '../../generated/request';

export default function Calendar() {
  const { data, isFetched } = useProgramsQuery();
  const googleCalendarUrl = new URL('https://www.google.com/calendar/render');
  googleCalendarUrl.searchParams.append(
    'cid',
    'http://calendar.kigu.app/api/programs/calendar.ics'
  );
  return (
    <Layout>
      <div className="mt-4 flex w-full flex-col items-center">
        <div className="flex w-full flex-col px-2 text-slate-600 sm:w-auto">
          <h1 className="text-xl font-bold">カレンダー連携</h1>
          <p>
            GoogleカレンダーやiOSカレンダーと全イベント一覧の連携ができます。
          </p>
          <p>
            {isFetched && data?.programs && (
              <>現在、{data?.programs.length}件のイベントが登録されています。</>
            )}
          </p>
          <Link
            href={googleCalendarUrl}
            className="my-2 rounded-md border border-blue-600 bg-blue-500 py-2 px-4 text-center text-sm font-bold text-white"
          >
            Googleカレンダーに追加する
          </Link>
          <Link
            className="my-2 rounded-md border border-blue-600 bg-blue-500 py-2 px-4 text-center text-sm font-bold text-white"
            href="webcal://calendar.kigu.app/api/programs/calendar.ics"
          >
            Apple Calendar / Microsoft Outlookに追加する
          </Link>
          <p>
            その他のカレンダーアプリでは以下のURLをコピーして、「URLで追加」から追加してください。
          </p>
          <input
            className="mt-2 mb-10 block w-full rounded-lg border border-slate-300 p-1 sm:mx-0 sm:w-80"
            type="text"
            value="http://kigu.app/api/programs/calendar.ics"
            readOnly
            onFocus={(e) => {
              e.target.select();
            }}
          />
        </div>
      </div>
    </Layout>
  );
}
