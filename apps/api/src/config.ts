import { config } from 'dotenv';
import { resolve } from 'path';
import { PrismaClient } from '@prisma/client';

// Load environment variables
export const NODE_ENV = process.env.NODE_ENV || 'development';

const envFile = NODE_ENV === 'development' ? '.env.development' : '.env';

config({ path: resolve(__dirname, `../${envFile}`) });
config({ path: resolve(__dirname, `../${envFile}.local`), override: true });

// Prisma Client instance
const prisma = new PrismaClient();

export { prisma };

// Export other configuration values
export const PORT = process.env.PORT || 8000;
export const DATABASE_URL = process.env.DATABASE_URL || '';
