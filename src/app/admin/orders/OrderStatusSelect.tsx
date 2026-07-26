'use client';

import { updateOrderStatus } from './actions';
import { useTransition } from 'react';

export default function OrderStatusSelect({ orderId, currentStatus }: { orderId: string, currentStatus: string }) {
  const [isPending, startTransition] = useTransition();

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newStatus = e.target.value;
    const formData = new FormData();
    formData.append('id', orderId);
    formData.append('status', newStatus);

    startTransition(() => {
      updateOrderStatus(formData);
    });
  };

  return (
    <select
      name="status"
      defaultValue={currentStatus}
      disabled={isPending}
      className="text-sm border-gray-300 dark:border-gray-700 dark:bg-zinc-800 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 disabled:opacity-50"
      onChange={handleChange}
    >
      <option value="pending">Pending</option>
      <option value="paid">Paid</option>
      <option value="shipped">Shipped</option>
    </select>
  );
}