"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <header className="w-full border-b bg-white relative z-50">
        <div className="mx-auto flex h-16 items-center justify-between px-6 text-blue-950">
          <div className="flex items-center md:hidden -ml-4">
            <Button variant="ghost" size="icon" onClick={() => setOpen(true)}>
              <Menu className="h-5 w-8" />
            </Button>
            <span className="text-sm font-medium tracking-wide">MENÜ</span>
          </div>

          <div className="text-center">
            <Link href="/" className="text-lg font-bold">
              GEORGIA SİGORTA
            </Link>
          </div>

          <nav className="hidden md:flex items-center gap-6 text-sm font-bold">
            <Link href="/zorunlu-mu" className="hover:opacity-70">
              ZORUNLU MU?
            </Link>
            <Link href="/neden-onemli" className="hover:opacity-70">
              NEDEN ÖNEMLİ?
            </Link>
            <Link href="/blog" className="hover:opacity-70">
              BLOG
            </Link>
          </nav>
        </div>
      </header>

      {open && (
        <div
          className="fixed inset-0 bg-black/40 z-40"
          onClick={() => setOpen(false)}
        />
      )}

      <div
        className={`
          fixed top-0 left-0 h-full w-72 bg-white z-50
          transform transition-transform duration-300
          ${open ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        <div className="flex items-center justify-between px-6 py-4 border-b">
          <span className="font-bold text-blue-950">MENÜ</span>
          <Button variant="ghost" size="icon" onClick={() => setOpen(false)}>
            <X />
          </Button>
        </div>

        <nav className="flex flex-col gap-4 p-6 text-sm font-bold text-blue-950">
          <Link href="/zorunlu-mu" onClick={() => setOpen(false)}>
            ZORUNLU MU?
          </Link>
          <Link href="/neden-onemli" onClick={() => setOpen(false)}>
            NEDEN ÖNEMLİ?
          </Link>
          <Link href="/blog" onClick={() => setOpen(false)}>
            BLOG
          </Link>
        </nav>
      </div>
    </>
  );
}
