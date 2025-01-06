import { PrismaClient } from '@prisma/client';

declare global {
  // eslint-disable-next-line no-var
  var prisma: PrismaClient;
}

// Create a PrismaClient instance
const prisma =
  global.prisma ||
  new PrismaClient({
    log: ['query', 'info', 'warn', 'error'], // Enable detailed logging in development
  });

if (process.env.NODE_ENV !== 'production') {
  // In development, attach the Prisma client to the global object
  global.prisma = prisma;
}

export default prisma;
