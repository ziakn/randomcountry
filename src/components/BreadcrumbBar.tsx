"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function BreadcrumbBar({ items }: { items: { label: string; href?: string }[] }) {
  const pathname = usePathname();

  return (
    <nav className="py-4" aria-label="Breadcrumb">
      <ol className="flex items-center flex-wrap gap-1.5 text-sm">
        <li>
          <Link href="/" className="text-gray-400 hover:text-blue-600 dark:text-gray-500 dark:hover:text-blue-400 transition-colors flex items-center gap-1">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
            Home
          </Link>
        </li>
        {items.map((item, index) => (
          <li key={index} className="flex items-center gap-1.5 text-gray-500 dark:text-gray-400">
            <span>/</span>
            {item.href ? (
              <Link href={item.href} className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors capitalize">
                {item.label}
              </Link>
            ) : (
              <span className="text-gray-900 dark:text-white font-medium capitalize">{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}