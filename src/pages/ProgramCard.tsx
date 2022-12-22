import { Heading } from 'evergreen-ui';
import Link from 'next/link';
import dayjs from 'dayjs';

export const ProgramCard = ({
  id,
  name,
  date,
}: {
  id: number;
  name: string;
  date: string;
}) => {
  return (
    <Link href={`/programs/item/${id}`}>
      <div className="flex flex-col w-60 h-40 shadow-sm text-slate-700 bg-white mt-1 mb-1 mr-2 ml-2 p-2 rounded-sm">
        <Heading size={600} is="h2" display="block">
          {name}
        </Heading>
        <p className="text-sm">{dayjs(date).format('M月D日(dd) HH:mm')}</p>
      </div>
    </Link>
  );
};
