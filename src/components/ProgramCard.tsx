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
      className="block w-full h-50 sm:h-40 mt-1 mb-1 sm:mr-2 sm:ml-2"
      href={`/programs/item/${id}`}
    >
      <div className="flex w-full h-full flex-col shadow-sm text-slate-700 bg-white  p-4 md:p-2 lg:p-3 rounded-sm">
        <div className="overflow-hidden w-full [display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:2]">
          <h2 className="text-slate-800 text-xl md:text-lg font-bold">
            {name}
          </h2>
        </div>
        <KABadge
          size={size === 'sm' || size === 'md' ? 'medium' : 'small'}
          color={dateToColor(dayjs.tz(date, 'UTC').tz('Asia/Tokyo'))}
        >
          {dayjs.tz(date, 'UTC').tz('Asia/Tokyo').format('M月D日(dd) HH:mm')}
        </KABadge>
        {ownerLink && (
          <div className="flex mt-1 items-center">
            {ownerLink?.image && (
              <picture className="block w-6 sm:w-10 h-6 sm:h-10 rounded-full overflow-hidden mr-1">
                <img
                  className="w-full h-full"
                  alt=""
                  src={ownerLink.image}
                  width="40"
                  height="40"
                />
              </picture>
            )}
            <p className="truncate text-sm sm:text-base">
              {ownerLink?.title || ownerTwitterId}
            </p>
          </div>
        )}
      </div>
    </Link>
  );
};
