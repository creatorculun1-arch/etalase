'use server';

import { getDb } from '@/lib/db';
import { orders } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';

export async function updateOrderStatus(formData: FormData) {
  const db = getDb();

  const id = formData.get('id') as string;
  const status = formData.get('status') as string;

  if (!id || !status) {
    throw new Error('Missing required fields');
  }

  await db.update(orders).set({ status }).where(eq(orders.id, id));

  revalidatePath('/admin/orders');
}