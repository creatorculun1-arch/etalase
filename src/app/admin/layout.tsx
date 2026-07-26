import Link from 'next/link';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-1 flex-col md:flex-row w-full max-w-full">
      <aside className="w-full md:w-64 bg-gray-900 text-white flex-shrink-0 flex flex-col min-h-full h-auto z-10 p-4 sticky top-0 md:h-screen">
        <h2 className="text-2xl font-bold mb-8 tracking-tight">Admin Panel</h2>
        <nav className="flex flex-col space-y-2">
          <Link href="/admin/products" className="block px-4 py-2 rounded transition-colors hover:bg-gray-800 focus:bg-gray-800">
            Products
          </Link>
          <Link href="/admin/orders" className="block px-4 py-2 rounded transition-colors hover:bg-gray-800 focus:bg-gray-800">
            Orders
          </Link>
          <div className="pt-8 mt-auto">
            <Link href="/" className="block px-4 py-2 text-sm text-gray-400 hover:text-white transition-colors">
              &larr; Back to Store
            </Link>
          </div>
        </nav>
      </aside>
      <main className="flex-1 p-6 md:p-10 bg-gray-50 dark:bg-zinc-950 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
