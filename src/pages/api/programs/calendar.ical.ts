import ical from 'ical-generator';
import { getVtimezoneComponent } from '@touch4it/ical-timezones';
import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import dayjs from '../../../lib/dayjs';

export type ResponseData = string;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  const calendar = ical();
  calendar.timezone({
    name: 'Asia/Tokyo',
    generator: getVtimezoneComponent,
  });
  const prisma = new PrismaClient();
  const programs = await prisma.program.findMany({
    where: {
      deletedAt: null,
    },
  });
  await Promise.all(
    programs.map(async (program) => {
      const organizer = program.ownerUrl
        ? await prisma.link.findFirst({
            where: {
              url: program.ownerUrl,
            },
          })
        : null;
      const event: Parameters<typeof calendar.createEvent>[0] = {
        summary: program.name,
        start: dayjs.tz(program.date, 'UTC').tz('Asia/Tokyo'),
        description: program.detail,
      };
      if (program.endDate) {
        event.end = dayjs.tz(program.endDate, 'UTC').tz('Asia/Tokyo');
      }
      if (organizer?.title) {
        event.organizer = { name: organizer.title };
      }
      if (program.location) {
        event.location = program.location;
      }
      calendar.createEvent(event);
    })
  );
  res
    .status(200)
    .setHeader('Content-Type', 'text/calendar')
    .send(calendar.toString());
}
