import Image from 'next/image';
import Layout from '../../components/Layout';
import { useProgramsQuery } from '../../generated/request';

export default function Calendar() {
  const { data, isFetched } = useProgramsQuery();
  return (
    <Layout>
      <div className="mt-4 flex flex-col items-center">
        <div className="mx-1 w-full text-slate-600 sm:w-auto">
          <h1 className="text-xl font-bold">カレンダー連携</h1>
          <p>
            GoogleカレンダーやiOSカレンダーと全イベント一覧の連携ができます。
          </p>
          <p>
            以下のURLをコピーして、GoogleカレンダーやiOSカレンダーの「URLで追加」から追加してください。
          </p>
          <p>
            {isFetched && data?.programs && (
              <>現在、{data?.programs.length}件のイベントが登録されています。</>
            )}
          </p>
          <input
            className="mt-2 mb-10 w-80 rounded-lg border border-slate-300 p-1"
            type="text"
            value="https://kigu.app/api/programs/calendar.ics"
            readOnly
            onFocus={(e) => {
              e.target.select();
            }}
          />
          <p>GoogleカレンダーのURLの追加方法は、以下の画像をご覧ください。</p>
          <Image
            src="/calendar.png"
            width="798"
            height="381"
            alt="Googleカレンダーに追加する場合は、設定のカレンダーを追加にあるURLで追加から追加できます。"
          />
        </div>
      </div>
    </Layout>
  );
}
