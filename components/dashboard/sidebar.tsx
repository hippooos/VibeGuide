"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FolderOpen, PlusCircle, User, Zap } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/projects", label: "我的项目", icon: FolderOpen },
  { href: "/projects/new", label: "新建项目", icon: PlusCircle },
  { href: "/my", label: "我的", icon: User },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="flex h-full w-56 flex-col border-r bg-background px-3 py-6">
      <Link href="/" className="mb-8 flex items-center gap-2 px-2">
        <Zap className="h-5 w-5 text-primary" />
        <span className="text-lg font-bold">VibeGuide</span>
      </Link>
      <nav className="flex flex-col gap-1">
        {navItems.map(({ href, label, icon: Icon }) => (
          <Link
            key={href}
            href={href}
            className={cn(
              "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
              pathname === href || (href !== "/projects" && pathname.startsWith(href))
                ? "bg-primary/10 text-primary"
                : "text-muted-foreground hover:bg-muted hover:text-foreground"
            )}
          >
            <Icon className="h-4 w-4" />
            {label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
