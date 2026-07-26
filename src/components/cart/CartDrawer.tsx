'use client';

import { useCartStore } from '@/store/useCartStore';
import Image from 'next/image';

export default function CartDrawer() {
  const { items, isOpen, closeCart, removeItem, updateQuantity, getTotals } = useCartStore();
  const { totalItems, totalPrice } = getTotals();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div className="absolute inset-0 bg-black bg-opacity-50 transition-opacity" onClick={closeCart} />

      <div className="fixed inset-y-0 right-0 flex max-w-full">
        <div className="w-screen max-w-md transform transition-transform ease-in-out duration-300">
          <div className="flex h-full flex-col bg-white shadow-xl dark:bg-zinc-900">
            <div className="flex items-center justify-between px-4 py-6 sm:px-6">
              <h2 className="text-lg font-medium text-gray-900 dark:text-white">Shopping cart</h2>
              <button
                type="button"
                className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
                onClick={closeCart}
              >
                <span className="sr-only">Close panel</span>
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
              {items.length === 0 ? (
                <p className="text-center text-gray-500 dark:text-gray-400 mt-10">Your cart is empty.</p>
              ) : (
                <ul role="list" className="-my-6 divide-y divide-gray-200 dark:divide-zinc-800">
                  {items.map((item) => (
                    <li key={item.id} className="flex py-6">
                      <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200 dark:border-zinc-800 relative bg-gray-100 dark:bg-zinc-800">
                        {item.imageUrl ? (
                          <Image src={item.imageUrl} alt={item.name} fill className="object-cover object-center" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-gray-400">No Image</div>
                        )}
                      </div>

                      <div className="ml-4 flex flex-1 flex-col">
                        <div>
                          <div className="flex justify-between text-base font-medium text-gray-900 dark:text-white">
                            <h3>{item.name}</h3>
                            <p className="ml-4">${item.price.toFixed(2)}</p>
                          </div>
                        </div>
                        <div className="flex flex-1 items-end justify-between text-sm">
                          <div className="flex items-center space-x-2">
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="px-2 py-1 bg-gray-200 dark:bg-zinc-700 rounded text-gray-700 dark:text-gray-200"
                            >-</button>
                            <span className="text-gray-500 dark:text-gray-400">Qty {item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="px-2 py-1 bg-gray-200 dark:bg-zinc-700 rounded text-gray-700 dark:text-gray-200"
                            >+</button>
                          </div>

                          <div className="flex">
                            <button
                              type="button"
                              onClick={() => removeItem(item.id)}
                              className="font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300"
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div className="border-t border-gray-200 dark:border-zinc-800 px-4 py-6 sm:px-6">
              <div className="flex justify-between text-base font-medium text-gray-900 dark:text-white">
                <p>Subtotal ({totalItems} items)</p>
                <p>${totalPrice.toFixed(2)}</p>
              </div>
              <p className="mt-0.5 text-sm text-gray-500 dark:text-gray-400">Shipping and taxes calculated at checkout.</p>
              <div className="mt-6">
                <button
                  disabled={items.length === 0}
                  className="flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Checkout
                </button>
              </div>
              <div className="mt-6 flex justify-center text-center text-sm text-gray-500 dark:text-gray-400">
                <p>
                  or{' '}
                  <button
                    type="button"
                    className="font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300"
                    onClick={closeCart}
                  >
                    Continue Shopping<span aria-hidden="true"> &rarr;</span>
                  </button>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
