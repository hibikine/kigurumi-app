import type { Resolvers } from '../../generated/resolver-types';
import { Client, auth } from 'twitter-api-sdk';
import fetch from 'cross-fetch';
import { JSDOM } from 'jsdom';
import dayjs from '../../lib/dayjs';

function naiveInnerText(node: Node): string {
  const Node = node; // We need Node(DOM's Node) for the constants, but Node doesn't exist in the nodejs global space, and any Node instance references the constants through the prototype chain
  return [...node.childNodes]
    .map((node) => {
      switch (node.nodeType) {
        case Node.TEXT_NODE:
          return node.textContent;
        case Node.ELEMENT_NODE:
          return naiveInnerTextNoSpace(node);
        default:
          return '';
      }
    })
    .join('\n');
}
function naiveInnerTextNoSpace(node: Node): string {
  const Node = node; // We need Node(DOM's Node) for the constants, but Node doesn't exist in the nodejs global space, and any Node instance references the constants through the prototype chain
  return [...node.childNodes]
    .map((node) => {
      switch (node.nodeType) {
        case Node.TEXT_NODE:
          return node.textContent;
        case Node.ELEMENT_NODE:
          return naiveInnerTextNoSpace(node);
        default:
          return '';
      }
    })
    .join('');
}

export const resolvers: Resolvers = {
  Query: {
    belongings: async (_, __, { prisma, currentUser }) => {
      if (!currentUser) {
        throw new Error('User not logged in.');
      }
      const belongings = await prisma.belonging.findMany({
        orderBy: { createdAt: 'asc' },
        include: { user: true, event: true },
        where: {
          userId: currentUser.id,
        },
      });
      return belongings;
    },
    programs: async (_, __, { prisma, currentUser }) => {
      const programs = await prisma.program.findMany({
        orderBy: { createdAt: 'asc' },
        where: {
          deletedAt: null,
        },
      });
      return programs;
    },
    program: async (_, { id }, { prisma, currentUser }) => {
      const program = await prisma.program.findUnique({
        where: { id },
      });
      return program;
    },
    currentUser: async (_, __, { prisma, currentUser }) => {
      if (!currentUser) {
        throw new Error('User not logged in.');
      }
      const user = await prisma.user.findUnique({
        where: { id: currentUser.id },
      });
      return user;
    },
    link: async (_, { url }, { prisma, currentUser }) => {
      const link = await prisma.link.findUnique({
        where: { url },
      });
      if (link !== null) {
        return link;
      }
      const profileUrl = url.match(
        /^https:\/\/twitter.com\/([a-zA-Z0-9_]+)\/?$/
      );
      if (profileUrl) {
        const client = new Client(process.env.TWITTER_BEARER_TOKEN!);
        const res = await client.users.findUserByUsername(profileUrl[1], {
          'user.fields': ['profile_image_url', 'description', 'name'],
        });
        const data: {
          url: string;
          title: string;
          description?: string;
          image?: string;
        } = {
          url,
          title: res.data?.name || '',
          description: res.data?.description,
          image: res.data?.profile_image_url,
        };
        return await prisma.link.create({
          data,
        });
      }
      const res = await fetch(url);
      const text = await res.text();
      const dom = new JSDOM(text);
      const data: {
        url: string;
        title: string;
        description?: string;
        image?: string;
      } = { url, title: dom.window.document.title };
      Array.from(dom.window.document.head.children).forEach((v) => {
        const property = v.getAttribute('property');
        if (property === 'og:title') {
          const content = v.getAttribute('content');
          if (content) {
            data.title = content;
          }
        }
        if (property === 'og:description') {
          const content = v.getAttribute('content');
          if (content) {
            data.description = content;
          }
        }
        if (property === 'og:image') {
          const content = v.getAttribute('content');
          if (content) {
            data.image = content;
          }
        }
      });
      return await prisma.link.create({
        data,
      });
    },
    twipla: async (_, { id }, { prisma, currentUser }) => {
      if (id === -1) {
        return {
          name: '',
          date: '',
          url: '',
          ownerUrl: '',
          detail: '',
        };
      }
      const twiplaUrl = `https://twipla.jp/events/${id}`;
      const res = await fetch(twiplaUrl);
      const text = await res.text();
      const dom = new JSDOM(text);
      const nameNodes =
        dom.window.document.querySelector('h1.largetext2')?.childNodes;
      const name = (nameNodes && [...nameNodes].at(-1)?.textContent) || '';
      console.log('a');
      const dateNode =
        dom.window.document.querySelector('span.largetext')?.textContent;
      const dateMatch = dateNode?.match(/\d{4}年\d{1,2}月\d{1,2}日/);
      const dateHourMinuteMatch = dateNode?.match(
        /\d{4}年\d{1,2}月\d{1,2}日\[.\] \d{2}:\d{2}/
      );
      console.log(dateNode);
      const date = dateHourMinuteMatch
        ? dayjs
            .tz(dateHourMinuteMatch[0], 'YYYY年M月D日[dd] HH:mm', 'Asia/Tokyo')
            .utc()
            .toISOString()
        : dateMatch
        ? dayjs
            .tz(dateMatch[0], 'YYYY年M月D日', 'Asia/Tokyo')
            .utc()
            .toISOString()
        : '';

      const ownerUrlBase = dom.window.document
        .querySelector('td>p>a')
        ?.getAttribute('title');
      const ownerUrl = ownerUrlBase
        ? `https://twitter.com/${ownerUrlBase}`
        : '';
      const desc = dom.window.document.querySelector('#desc');
      const detail = desc
        ? `Twiplaより引用:
---

${naiveInnerText(desc)}

---
引用元: ${twiplaUrl}`
        : '';

      const data: {
        name: string;
        date: string;
        url: string;
        ownerUrl: string;
        detail: string;
      } = {
        name,
        url: `https://twipla.jp/events/${id}`,
        detail,
        ownerUrl,
        date,
      };
      return data;
    },
  },
  Mutation: {
    addProgram: async (
      _,
      { name, date, endDate, detail, location, url, ownerUrl },
      { prisma, currentUser }
    ) => {
      console.log(date);
      console.log(endDate);
      const program = await prisma.program.create({
        data: {
          name,
          date: dayjs(date).toISOString(),
          endDate: endDate ? dayjs(endDate).toISOString() : undefined,
          detail,
          location,
          url,
          ownerUrl,
          event: {},
        },
      });
      return program;
    },
    updateProgram: async (
      _,
      { id, name, date, endDate, detail, location, url, ownerUrl },
      { prisma, currentUser }
    ) => {
      const originalProgram = await prisma.program.findUnique({
        where: { id },
      });
      if (originalProgram?.deletedAt) {
        throw new Error('Program is already deleted.');
      }
      const data = {
        name: name || originalProgram?.name,
        date: date ? dayjs(date).toISOString() : originalProgram?.date,
        endDate: endDate
          ? dayjs(endDate).toISOString()
          : originalProgram?.endDate,
        detail: detail || originalProgram?.detail,
        location: location || originalProgram?.location,
        url: url || originalProgram?.url,
        ownerUrl: ownerUrl || originalProgram?.ownerUrl,
      };
      const program = await prisma.program.update({
        where: { id },
        data,
      });
      return program;
    },
    deleteProgram: async (_, { id }, { prisma, currentUser }) => {
      // 後で戻す
      /*if (!currentUser) {
        throw new Error('User not logged in.');
      }*/
      const program = await prisma.program.update({
        where: { id },
        data: {
          deletedAt: new Date(),
        },
      });
      return program;
    },
    addBelonging: async (_, { name, eventId }, { prisma, currentUser }) => {
      if (!currentUser) {
        throw new Error('User not logged in.');
      }
      const belonging = await prisma.belonging.create({
        data: {
          name,
          userId: currentUser.id,
          eventId: eventId,
        },
        include: { user: true, event: true },
      });
      return belonging;
    },
    updateBelonging: async (
      _,
      { belongingId, completed, name },
      { prisma, currentUser }
    ) => {
      if (!currentUser) {
        throw new Error('User not logged in.');
      }
      const data: { name?: string; completed?: boolean } = {};
      if (completed !== null) {
        data.completed = completed;
      }
      if (name !== null) {
        data.name = name;
      }

      const belonging = await prisma.belonging.update({
        where: { id: parseInt(belongingId, 10) },
        data,
        include: { user: true, event: true },
      });
      return belonging;
    },
    deleteBelonging: async (_, { belongingId }, { prisma, currentUser }) => {
      if (!currentUser) {
        throw new Error('User not logged in.');
      }
      const belonging = await prisma.belonging.delete({
        where: { id: parseInt(belongingId, 10) },
        include: { user: true, event: true },
      });
      return belonging;
    },
    createLink: async (_, { url }, { prisma, currentUser }) => {
      const res = await fetch(url);
      const text = await res.text();
      const dom = new JSDOM(text);
      const data: {
        url: string;
        title: string;
        description?: string;
        image?: string;
      } = { url, title: dom.window.document.title };
      Array.from(dom.window.document.head.children).forEach((v) => {
        const property = v.getAttribute('property');
        if (property === 'og:title') {
          const content = v.getAttribute('content');
          if (content) {
            data.title = content;
          }
        }
        if (property === 'og:description') {
          const content = v.getAttribute('content');
          if (content) {
            data.description = content;
          }
        }
        if (property === 'og:image') {
          const content = v.getAttribute('content');
          if (content) {
            data.image = content;
          }
        }
      });
      const link = await prisma.link.create({
        data,
      });
      return link;
    },
  },
};
