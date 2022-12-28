import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import { createEvents } from 'ics';
import type { EventAttributes, DateArray, DurationObject } from 'ics';
import dayjs from '../../../lib/dayjs';
import type { Dayjs } from 'dayjs';

export type ResponseData = string;

const dayjsToDateArray = (d: Dayjs): DateArray => {
  return [d.year(), d.month() + 1, d.date(), d.hour(), d.minute()];
};

const getDuration = (start: Dayjs, end: Dayjs): DurationObject => {
  const duration = end.diff(start, 'minute');
  const weeks = Math.floor(duration / (7 * 24 * 60));
  const days = Math.floor((duration % (7 * 24 * 60)) / (24 * 60));
  const hours = Math.floor((duration % (24 * 60)) / 60);
  const minutes = duration % 60;
  const durationResult: DurationObject = {};
  if (weeks) {
    durationResult.weeks = weeks;
  }
  if (days) {
    durationResult.days = days;
  }
  if (hours) {
    durationResult.hours = hours;
  }
  if (minutes) {
    durationResult.minutes = minutes;
  }
  return durationResult;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  const prisma = new PrismaClient();
  const programs = await prisma.program.findMany({
    where: {
      deletedAt: null,
    },
  });
  const { error, value } = createEvents(
    await Promise.all(
      programs.map(async (program): Promise<EventAttributes> => {
        const organizer = program.ownerUrl
          ? await prisma.link.findFirst({
              where: {
                url: program.ownerUrl,
              },
            })
          : null;
        const startDayjs = dayjs.tz(program.date, 'UTC');
        const event: EventAttributes = {
          title: program.name,
          start: dayjsToDateArray(startDayjs),
          startInputType: 'utc',
          startOutputType: 'utc',
          duration: { hours: 1 },
          description: program.detail,
          calName: 'きぐあぷり 合わせ予定カレンダー',
          created: dayjsToDateArray(dayjs().utc()),
          lastModified: dayjsToDateArray(dayjs().utc()),
        };
        if (program.endDate) {
          event.duration = getDuration(
            startDayjs,
            dayjs.tz(program.endDate, 'UTC')
          );
        }
        if (program.location) {
          event.location = program.location;
        }
        if (program.url) {
          event.url = program.url;
        }
        return event;
      })
    )
  );
  if (error || !value) {
    throw error;
  }
  res.status(200).setHeader('Content-Type', 'text/calendar').send(value);
}
