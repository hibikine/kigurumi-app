import { Heading } from 'evergreen-ui';
import Link from 'next/link';
import dayjs from 'dayjs';
import clsx from 'clsx';
import { KABadge } from '../components/KABadge';
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
  return (
    <Link
      className="block w-full h-40 mt-1 mb-1 mr-2 ml-2"
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
          color={dateToColor(dayjs(date))}
        >
          {dayjs(date).format('M月D日(dd) HH:mm')}
        </KABadge>
        {ownerLink && (
          <div className="flex mt-1 items-center overflow-hidden overflow-ellipsis">
            {ownerLink?.image && (
              <picture className="block w-10 h-10 rounded-full overflow-hidden mr-1">
                <img alt="" src={ownerLink.image} width="40" height="40" />
              </picture>
            )}
            {ownerLink?.title || ownerTwitterId}
          </div>
        )}
      </div>
    </Link>
  );
};
