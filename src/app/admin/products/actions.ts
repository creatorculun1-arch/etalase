'use server';

import { getDb } from '@/lib/db';
import { products } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';
import { v4 as uuidv4 } from 'uuid';

export async function addProduct(formData: FormData) {
  const db = getDb();

  const name = formData.get('name') as string;
  const slug = formData.get('slug') as string;
  const price = parseFloat(formData.get('price') as string);
  const stock = parseInt(formData.get('stock') as string, 10);
  const description = formData.get('description') as string;
  const categoryId = formData.get('categoryId') as string;
  const imageUrl = formData.get('imageUrl') as string;

  if (!name || !slug || isNaN(price) || isNaN(stock) || !categoryId) {
    throw new Error('Missing required fields');
  }

  await db.insert(products).values({
    id: uuidv4(),
    name,
    slug,
    price,
    stock,
    description: description || null,
    categoryId,
    imageUrl: imageUrl || null,
  });

  revalidatePath('/admin/products');
  revalidatePath('/');
}

export async function editProduct(formData: FormData) {
  const db = getDb();

  const id = formData.get('id') as string;
  const name = formData.get('name') as string;
  const slug = formData.get('slug') as string;
  const price = parseFloat(formData.get('price') as string);
  const stock = parseInt(formData.get('stock') as string, 10);
  const description = formData.get('description') as string;
  const categoryId = formData.get('categoryId') as string;
  const imageUrl = formData.get('imageUrl') as string;

  if (!id || !name || !slug || isNaN(price) || isNaN(stock) || !categoryId) {
    throw new Error('Missing required fields');
  }

  await db.update(products).set({
    name,
    slug,
    price,
    stock,
    description: description || null,
    categoryId,
    imageUrl: imageUrl || null,
  }).where(eq(products.id, id));

  revalidatePath('/admin/products');
  revalidatePath('/');
}

export async function deleteProduct(id: string) {
  const db = getDb();
  await db.delete(products).where(eq(products.id, id));
  revalidatePath('/admin/products');
  revalidatePath('/');
}