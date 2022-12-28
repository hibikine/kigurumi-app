import { ProgramCard } from './ProgramCard';
import { ProgramsQuery } from '../generated/request';
import dayjs from '../lib/dayjs';
import { orders } from '../pages/programs';

export const ProgramsList = ({
  order,
  filteredData,
}: {
  order: typeof orders[number];
  filteredData?: ProgramsQuery['programs'];
}) => {
  const dateGroup = filteredData?.reduce((acc, v) => {
    const date = dayjs.tz(v.date, 'UTC').tz('Asia/Tokyo');
    const key = date.format('YYYY-MM-DD');
    if (!acc[key]) {
      acc[key] = [];
    }
    acc[key].push(v);
    return acc;
  }, {} as { [key: string]: ProgramsQuery['programs'] });
  return (
    <div className="mt-4 flex w-full flex-col flex-wrap items-center md:w-auto lg:mt-8 lg:w-[768px] xl:w-[1024px] 2xl:mx-10">
      {(order === orders[0] || order === orders[1]) &&
        dateGroup &&
        Object.entries(dateGroup).map(([date, dayData], i) => {
          const dayDiff = dayjs(date).diff(dayjs('2023-01-05'), 'day');
          const dayDiffStr =
            dayDiff >= 0 && dayDiff < 4 ? ` 《JMoF${dayDiff + 1}日目》` : '';
          return (
            <div className="w-full pl-1 sm:pl-0" key={i}>
              {(order === orders[0] || order === orders[1]) && (
                <>
                  <p className="text-sm font-bold text-slate-500">
                    {date}
                    <span className="inline font-normal">{dayDiffStr}</span>
                  </p>
                  <div className="mb-2 border-b border-b-slate-200" />
                </>
              )}
              <div className="mb-8 w-full">
                {dayData.map(({ id, date, name, ownerUrl }, i) => (
                  <ProgramCard
                    key={id}
                    id={id}
                    date={date}
                    name={name}
                    ownerUrl={ownerUrl ?? undefined}
                    prevDate={i === 0 ? undefined : dayData[i - 1].date}
                    order={order}
                  />
                ))}
              </div>
            </div>
          );
        })}
      {filteredData && !(order === orders[0] || order === orders[1]) && (
        <div className="w-full">
          {filteredData.map(({ id, date, name, ownerUrl }) => (
            <ProgramCard
              key={id}
              id={id}
              date={date}
              name={name}
              ownerUrl={ownerUrl ?? undefined}
              order={order}
            />
          ))}
        </div>
      )}
    </div>
  );
};
