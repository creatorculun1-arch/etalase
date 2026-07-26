'use client';

import Link from 'next/link';
import { useCartStore } from '@/store/useCartStore';
import CartDrawer from '../cart/CartDrawer';

export default function Navbar() {
  const { openCart, getTotals } = useCartStore();
  const { totalItems } = getTotals();

  return (
    <nav className="border-b border-gray-200 bg-white px-4 py-4 dark:border-zinc-800 dark:bg-black">
      <div className="mx-auto flex max-w-7xl items-center justify-between">
        <Link href="/" className="text-xl font-bold tracking-tight text-black dark:text-white">
          EdgeStore
        </Link>
        <div className="flex items-center space-x-6">
          <Link href="/" className="text-sm font-medium text-gray-600 hover:text-black dark:text-gray-300 dark:hover:text-white">
            Home
          </Link>
          <Link href="/categories" className="text-sm font-medium text-gray-600 hover:text-black dark:text-gray-300 dark:hover:text-white">
            Categories
          </Link>
          <button
            onClick={openCart}
            className="relative p-2 text-gray-600 hover:text-black dark:text-gray-300 dark:hover:text-white"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
            </svg>
            {totalItems > 0 && (
              <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/4 -translate-y-1/4 bg-indigo-600 rounded-full">
                {totalItems}
              </span>
            )}
          </button>
        </div>
      </div>
      <CartDrawer />
    </nav>
  );
}
