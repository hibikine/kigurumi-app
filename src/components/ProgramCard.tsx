import Link from 'next/link';
import dayjs from '../lib/dayjs';
import clsx from 'clsx';
import { KABadge } from './KABadge';
import { useLinkQuery } from '../generated/request';
import useSize from '../utils/hooks/useSize';
import dateToColor from '../utils/dateToColor';

export const ProgramCard = ({
  id,
  name,
  date,
  ownerUrl,
  prevDate,
  order,
}: {
  id: number;
  name: string;
  date: string;
  ownerUrl?: string;
  prevDate?: string;
  order:
    | '日時が早い順'
    | '日時が遅い順'
    | '更新が新しい順'
    | '更新が古い順'
    | '登録が新しい順'
    | '登録が古い順';
}) => {
  const { data: ownerUrlData } = useLinkQuery(
    { url: ownerUrl ?? '' },
    { enabled: !!ownerUrl }
  );
  const ownerLink = ownerUrlData?.link;
  const ownerTwitterId = ownerLink?.url.match(
    /https:\/\/twitter.com\/([a-zA-Z_]+)/
  )?.[1];
  const size = useSize();
  const prevDateDayjs = dayjs.tz(prevDate, 'UTC').tz('Asia/Tokyo');
  const dateDayjs = dayjs.tz(date, 'UTC').tz('Asia/Tokyo');
  const isSameHour = prevDateDayjs.isSame(dateDayjs, 'hour');
  console.log(size);
  return (
    <Link
      className="h-50 sm:h-30 md:h-30 relative my-1 block w-full sm:mx-2 sm:mb-3 lg:h-28"
      href={`/programs/item/${id}`}
    >
      <div className="flex h-full w-full flex-col rounded-sm bg-white px-4  pt-3 pb-2 text-slate-700 shadow-sm md:p-2 lg:p-3">
        <div className="w-full overflow-hidden [display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:2]">
          <h2 className="mb-2 text-lg font-bold leading-6 text-slate-700 lg:truncate">
            {name}
          </h2>
        </div>
        <DateBadge date={date} />
        {ownerLink && (
          <div className="mt-1 flex items-center">
            {ownerLink?.image && <Icon src={ownerLink.image} />}
            <p className="truncate text-xs text-slate-400 sm:text-sm">
              {ownerLink?.title || ownerTwitterId}
            </p>
          </div>
        )}
      </div>
      {prevDate && !isSameHour && (
        <div className="absolute -left-4 -top-0.5 w-4 border-t border-t-slate-300 sm:-top-1.5 lg:-left-8 lg:w-8">
          <p
            className={clsx(
              'absolute text-xs text-slate-400 [writing-mode:vertical-rl] lg:[writing-mode:horizontal-tb]',
              order === '日時が早い順' &&
                '-left-0 top-1.5 sm:-left-1 lg:-left-0 lg:top-1',
              order === '日時が遅い順' &&
                '-left-0 -top-9 sm:-left-1 lg:-left-0 lg:-top-5'
            )}
          >
            {(order === '日時が早い順' ? dateDayjs : prevDateDayjs)
              .startOf('h')
              .format('HH:mm')}
          </p>
        </div>
      )}
    </Link>
  );
};

const DateBadge = ({ date }: { date: string }) => {
  const size = useSize();
  const dayjsDate = dayjs.tz(date, 'UTC').tz('Asia/Tokyo');
  const dateDiff = dayjsDate.diff(dayjs.tz('2023-01-05', 'Asia/Tokyo'), 'day');
  const dateDiffText =
    dateDiff >= 0 && dateDiff < 4 ? `${dateDiff + 1}日目` : '';
  return (
    <div className="flex items-center">
      <span className="inline text-sm font-bold">
        {dayjsDate.format(`M月D日(dd) HH:mm`)}
      </span>
      {dateDiffText && (
        <KABadge
          className="ml-2 inline-block"
          size={size === 'sm' || size === 'md' ? 'small' : 'xsmall'}
          color={dateToColor(dayjs.tz(date, 'UTC').tz('Asia/Tokyo'))}
        >
          {dateDiffText}
        </KABadge>
      )}
    </div>
  );
};

const Icon = ({ src }: { src: string }) => (
  <picture className="mr-1 block h-4 w-4 overflow-hidden rounded-full sm:h-6 sm:w-6 lg:h-6 lg:w-6">
    <img className="h-full w-full" alt="" src={src} width="40" height="40" />
  </picture>
);
