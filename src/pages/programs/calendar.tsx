import Link from 'next/link';
import Layout from '../../components/Layout';
import LinkButton from '../../components/LinkButton';
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
          <LinkButton
            href={googleCalendarUrl}
            className="my-2"
            color="primary"
            fullWidth
          >
            Googleカレンダーに追加する
          </LinkButton>
          <LinkButton
            className="my-2"
            href="webcal://calendar.kigu.app/api/programs/calendar.ics"
            color="primary"
            fullWidth
          >
            Apple Calendar / Microsoft Outlookに追加する
          </LinkButton>
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
