import { getDb } from '@/lib/db';
import ProductCard from '@/components/product/ProductCard';

export const runtime = 'edge';

export default async function Home() {
  const db = getDb();

  // Fetch products along with their category name
  const products = await db.query.products.findMany({
    with: {
      category: true,
    },
  });

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
      <div className="sm:flex sm:items-baseline sm:justify-between mb-8">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Our Latest Products</h2>
        <a href="/categories" className="hidden text-sm font-semibold text-indigo-600 hover:text-indigo-500 sm:block dark:text-indigo-400 dark:hover:text-indigo-300">
          Browse all categories
          <span aria-hidden="true"> &rarr;</span>
        </a>
      </div>

      {products.length === 0 ? (
        <div className="text-center py-24">
          <p className="text-lg text-gray-500 dark:text-gray-400">No products found.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
