'use client';

import Image from 'next/image';
import { useCartStore } from '@/store/useCartStore';

interface ProductCardProps {
  product: {
    id: string;
    name: string;
    price: number;
    imageUrl: string | null;
    category?: { name: string } | null;
  };
}

export default function ProductCard({ product }: ProductCardProps) {
  const addItem = useCartStore((state) => state.addItem);

  const formattedPrice = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(product.price);

  return (
    <div className="group relative flex flex-col overflow-hidden rounded-lg border border-gray-200 bg-white dark:border-zinc-800 dark:bg-zinc-900 shadow-sm transition-all hover:shadow-md">
      <div className="aspect-h-4 aspect-w-3 bg-gray-200 dark:bg-zinc-800 sm:aspect-none sm:h-64 relative overflow-hidden">
        {product.imageUrl ? (
          <Image
            src={product.imageUrl}
            alt={product.name}
            fill
            className="h-full w-full object-cover object-center sm:h-full sm:w-full transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gray-100 dark:bg-zinc-800 text-gray-400">
            No Image Available
          </div>
        )}
      </div>
      <div className="flex flex-1 flex-col space-y-2 p-4">
        {product.category && (
          <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wider">{product.category.name}</p>
        )}
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          <span aria-hidden="true" className="absolute inset-0" />
          {product.name}
        </h3>
        <p className="text-base font-medium text-indigo-600 dark:text-indigo-400 pb-2">{formattedPrice}</p>

        <div className="mt-auto pt-4">
          <button
            onClick={(e) => {
              e.preventDefault();
              addItem({
                id: product.id,
                name: product.name,
                price: product.price,
                imageUrl: product.imageUrl,
              });
            }}
            className="relative z-10 flex w-full items-center justify-center rounded-md bg-black px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
