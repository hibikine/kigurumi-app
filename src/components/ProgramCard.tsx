import { Heading } from 'evergreen-ui';
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
}: {
  id: number;
  name: string;
  date: string;
  ownerUrl?: string;
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
  console.log(size);
  return (
    <Link
      className="block w-full h-50 sm:h-30 mt-1 mb-1 sm:mb-3 sm:mr-2 sm:ml-2 md:h-30 lg:h-28"
      href={`/programs/item/${id}`}
    >
      <div className="flex w-full h-full flex-col shadow-sm text-slate-700 bg-white  px-4 pt-3 pb-2 md:p-2 lg:p-3 rounded-sm">
        <div className="overflow-hidden w-full [display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:2]">
          <h2 className="text-slate-700 text-lg font-bold leading-6 mb-2 lg:truncate">
            {name}
          </h2>
        </div>
        <DateBadge date={date} />
        {ownerLink && (
          <div className="flex mt-1 items-center">
            {ownerLink?.image && <Icon src={ownerLink.image} />}
            <p className="truncate text-xs sm:text-sm text-slate-400">
              {ownerLink?.title || ownerTwitterId}
            </p>
          </div>
        )}
      </div>
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
      <span className="font-bold text-sm inline">
        {dayjsDate.format(`M月D日(dd) HH:mm`)}
      </span>
      {dateDiffText && (
        <KABadge
          className="inline-block ml-2"
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
  <picture className="block w-4 h-4 sm:w-6 sm:h-6 lg:h-6 lg:w-6 rounded-full overflow-hidden mr-1">
    <img className="w-full h-full" alt="" src={src} width="40" height="40" />
  </picture>
);
