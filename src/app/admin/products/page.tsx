import { getDb } from '@/lib/db';
import { categories } from '@/db/schema';
import ProductTable from './ProductTable';

export const runtime = 'edge';

export default async function AdminProductsPage() {
  const db = getDb();

  const allProducts = await db.query.products.findMany({
    with: { category: true },
    orderBy: (products, { desc }) => [desc(products.createdAt)],
  });

  const allCategories = await db.select().from(categories);

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Products</h1>
          <p className="text-gray-500 text-sm mt-1">Manage your store inventory.</p>
        </div>
      </div>

      <ProductTable products={allProducts} categories={allCategories} />
    </div>
  );
}