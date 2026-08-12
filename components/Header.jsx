"use client";

import Link from "next/link";
import { useState } from "react";
import { converterTools } from "@/features/converters/toolsList";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="relative z-50 border-b border-gray-100 bg-gradient-to-b from-primary-50/60 to-white shadow-sm">
      <div className="flex items-center justify-between gap-4 px-6 py-4 sm:px-10">
        <Link
          href="/"
          className="text-xl font-semibold tracking-tight text-primary-600"
        >
          Utility Platform
        </Link>

        <nav className="hidden items-center gap-x-5 md:flex">
          {converterTools.map((tool) => (
            <Link
              key={tool.href}
              href={tool.href}
              className="text-sm font-medium text-gray-600 transition-colors hover:text-primary-600"
            >
              {tool.name}
            </Link>
          ))}
        </nav>

        <button
          type="button"
          onClick={() => setIsMenuOpen((open) => !open)}
          aria-expanded={isMenuOpen}
          aria-controls="mobile-menu"
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="flex h-10 w-10 items-center justify-center rounded-lg text-gray-600 transition-colors hover:bg-primary-50 hover:text-primary-600 md:hidden"
        >
          {isMenuOpen ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.8}
              stroke="currentColor"
              className="h-6 w-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18 18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.8}
              stroke="currentColor"
              className="h-6 w-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5M3.75 17.25h16.5"
              />
            </svg>
          )}
        </button>
      </div>

      {isMenuOpen && (
        <>
          <div
            aria-hidden="true"
            onClick={() => setIsMenuOpen(false)}
            className="fixed inset-0 z-30 bg-black/20 md:hidden"
          />
          <nav
            id="mobile-menu"
            className="absolute inset-x-0 top-full z-40 flex flex-col gap-1 border-t border-gray-100 bg-white px-6 pb-4 pt-2 shadow-lg sm:px-10 md:hidden"
          >
            {converterTools.map((tool) => (
              <Link
                key={tool.href}
                href={tool.href}
                onClick={() => setIsMenuOpen(false)}
                className="rounded-lg px-3 py-2 text-sm font-medium text-gray-600 transition-colors hover:bg-primary-50 hover:text-primary-600"
              >
                {tool.name}
              </Link>
            ))}
          </nav>
        </>
      )}
    </header>
  );
}
