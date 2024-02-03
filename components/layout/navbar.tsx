"use client"

import React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { EraserIcon } from "@radix-ui/react-icons"

import { cn } from "@/lib/utils"
import LearnMore from "@/components/layout/learn-more"
import { ModeToggle } from "@/components/layout/mode-toggle"

export default function MainNav() {
  const pathname = usePathname()

  return (
    <header className="sticky top-0 z-50 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <nav
        className="flex items-center justify-between px-3 py-3"
        aria-label="Global"
      >
        <div className="flex items-center gap-x-12">
          <Link href="/" className="flex items-center space-x-2">
            <EraserIcon className="h-5 w-5 text-foreground" />
            <span className="overflow-auto font-semibold leading-tight tracking-tight">
              bg.remove
            </span>
          </Link>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
          >
            <span className="sr-only">Open main menu</span>
            {/* <Menu className="h-6 w-6" aria-hidden="true" /> */}
          </button>
        </div>
        <div className="flex items-center space-x-1">
          <ModeToggle />
          <LearnMore />
        </div>
      </nav>
    </header>
  )
}
