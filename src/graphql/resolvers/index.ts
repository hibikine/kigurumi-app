import type { Resolvers } from '../../generated/resolver-types';

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
    currentUser: async (_, __, { prisma, currentUser }) => {
      if (!currentUser) {
        throw new Error('User not logged in.');
      }
      const user = await prisma.user.findUnique({
        where: { id: currentUser.id },
      });
      return user;
    },
  },
  Mutation: {
    addProgram: async (
      _,
      { name, date, endDate, detail, location, url, ownerUrl },
      { prisma, currentUser }
    ) => {
      if (!currentUser) {
        throw new Error('User not logged in.');
      }
      const program = await prisma.program.create({
        data: {
          name,
          date,
          endDate,
          detail,
          location,
          url,
          ownerUrl,
        },
      });
      return program;
    },
    updateProgram: async (
      _,
      { id, name, date, endDate, detail, location, url, ownerUrl },
      { prisma, currentUser }
    ) => {
      if (!currentUser) {
        throw new Error('User not logged in.');
      }
      const originalProgram = await prisma.program.findUnique({
        where: { id },
      });
      if (originalProgram?.deletedAt) {
        throw new Error('Program is already deleted.');
      }
      const data = {
        name: name || originalProgram?.name,
        date: date || originalProgram?.date,
        endDate: endDate || originalProgram?.endDate,
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
      if (!currentUser) {
        throw new Error('User not logged in.');
      }
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
  },
};
