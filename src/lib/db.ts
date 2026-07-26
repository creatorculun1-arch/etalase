import { getRequestContext } from '@cloudflare/next-on-pages';

export const getDb = () => {
  const db = getRequestContext().env.DB;
  if (!db) {
    throw new Error('Database binding not found in Cloudflare env');
  }
  return db;
};
