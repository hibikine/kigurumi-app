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
  },
  Mutation: {
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
