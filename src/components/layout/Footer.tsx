export default function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-white py-8 dark:border-zinc-800 dark:bg-black mt-auto">
      <div className="mx-auto max-w-7xl px-4 text-center">
        <p className="text-sm text-gray-500 dark:text-gray-400">
          &copy; {new Date().getFullYear()} EdgeStore. Powered by Next.js & Cloudflare.
        </p>
      </div>
    </footer>
  );
}
