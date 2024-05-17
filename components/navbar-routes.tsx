"use client";

import { UserButton, useAuth } from "@clerk/nextjs";
import { usePathname, useRouter } from "next/navigation";
import { LogOut } from "lucide-react";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { SearchInput } from "./search-input";
import { isAdmin } from "@/lib/admin";

export const NavbarRoutes = () => {
  const { userId } = useAuth();
  const pathname = usePathname();

  const isAdminPage = pathname?.startsWith("/admin");
  const isCoursePage = pathname?.includes("/courses");
  const isSearchPage = pathname === "/buscar";

  return (
    <>
      {isSearchPage && (
        <div className="hidden md:block">
          <SearchInput />
        </div>
      )}
      <div className="flex gap-x-2 ml-auto">
        {isAdminPage || isCoursePage ? (
          <Link href="/">
            <Button size="sm" variant="secondary">
              <LogOut className="h-4 w-4 mr-2" />
              Salir
            </Button>
          </Link>
        ) : isAdmin(userId) ? (
          <Link href="/admin/courses">
            <Button size="sm" variant="secondary">
              Modo Administrador
            </Button>
          </Link>
        ) : null }
        <UserButton afterSignOutUrl="/" />
      </div>
    </>
  );
};
