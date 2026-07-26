import { getRequestContext } from '@cloudflare/next-on-pages';
import { drizzle } from 'drizzle-orm/d1';
import * as schema from '../db/schema';

export const getDb = () => {
  const db = getRequestContext().env.DB;
  if (!db) {
    throw new Error('Database binding not found in Cloudflare env');
  }
  return drizzle(db, { schema });
};
