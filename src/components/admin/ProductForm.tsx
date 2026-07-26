'use client';

import { addProduct, editProduct } from '@/app/admin/products/actions';
import { useRef } from 'react';

interface ProductFormProps {
  categories: any[];
  product?: any | null;
  onSuccess?: () => void;
}

export default function ProductForm({ categories, product, onSuccess }: ProductFormProps) {
  const ref = useRef<HTMLFormElement>(null);

  const handleSubmit = async (formData: FormData) => {
    if (product) {
      formData.append('id', product.id);
      await editProduct(formData);
    } else {
      await addProduct(formData);
      ref.current?.reset();
    }

    if (onSuccess) {
      onSuccess();
    }
  };

  return (
    <form ref={ref} action={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Product Name *</label>
          <input type="text" defaultValue={product?.name || ''} name="name" id="name" required className="mt-1 block w-full rounded-md border border-gray-300 bg-white dark:border-gray-700 dark:bg-black px-3 py-2 text-sm shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 text-gray-900 dark:text-gray-100" />
        </div>
        <div>
          <label htmlFor="slug" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Slug *</label>
          <input type="text" defaultValue={product?.slug || ''} name="slug" id="slug" required className="mt-1 block w-full rounded-md border border-gray-300 bg-white dark:border-gray-700 dark:bg-black px-3 py-2 text-sm shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 text-gray-900 dark:text-gray-100" />
        </div>
        <div>
          <label htmlFor="price" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Price *</label>
          <input type="number" defaultValue={product?.price || ''} step="0.01" name="price" id="price" required className="mt-1 block w-full rounded-md border border-gray-300 bg-white dark:border-gray-700 dark:bg-black px-3 py-2 text-sm shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 text-gray-900 dark:text-gray-100" />
        </div>
        <div>
          <label htmlFor="stock" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Stock *</label>
          <input type="number" defaultValue={product?.stock ?? ''} name="stock" id="stock" required className="mt-1 block w-full rounded-md border border-gray-300 bg-white dark:border-gray-700 dark:bg-black px-3 py-2 text-sm shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 text-gray-900 dark:text-gray-100" />
        </div>
        <div>
          <label htmlFor="categoryId" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Category *</label>
          <select name="categoryId" defaultValue={product?.categoryId || ''} id="categoryId" required className="mt-1 block w-full rounded-md border border-gray-300 bg-white dark:border-gray-700 dark:bg-black px-3 py-2 text-sm shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 text-gray-900 dark:text-gray-100">
            <option value="">Select a category</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>{cat.name}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Image URL</label>
          <input type="url" defaultValue={product?.imageUrl || ''} name="imageUrl" id="imageUrl" className="mt-1 block w-full rounded-md border border-gray-300 bg-white dark:border-gray-700 dark:bg-black px-3 py-2 text-sm shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 text-gray-900 dark:text-gray-100" />
        </div>
      </div>
      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Description</label>
        <textarea name="description" defaultValue={product?.description || ''} id="description" rows={3} className="mt-1 block w-full rounded-md border border-gray-300 bg-white dark:border-gray-700 dark:bg-black px-3 py-2 text-sm shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 text-gray-900 dark:text-gray-100"></textarea>
      </div>
      <div className="flex justify-end space-x-2">
        {product && onSuccess && (
          <button type="button" onClick={onSuccess} className="rounded-md border border-gray-300 bg-white dark:bg-zinc-800 dark:border-gray-700 px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 focus:outline-none">
            Cancel
          </button>
        )}
        <button type="submit" className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
          {product ? 'Update Product' : 'Save Product'}
        </button>
      </div>
    </form>
  );
}