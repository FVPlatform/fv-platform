"use client";

import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

interface SidebarItemProps {
    icon: LucideIcon;
    label: string;
    href: string;
};

export const SidebarItem = ({
    icon: Icon,
    label,
    href,
}: SidebarItemProps) => {
    const pathname = usePathname();
    const router = useRouter();

    const isActive =
        (pathname === "/" && href === "/") ||
        pathname === href ||
        pathname?.startsWith(`${href}/`);

    const onClick = () => {
        router.push(href);
    }

    return (
        <button
            onClick={onClick}
            type="button"
            className={cn(
                "flex items-center gap-x-2 text-[#2b686d] text-sm font-semibold pl-6 transition-all hover:text-[#b4549c] hover:bg-[#FFFF00]/20",
                isActive && "text-[#255a5e] bg-[#FFFF00]/20 hover:bg-[#FFFF00]/20 hover:text-[#b4549c]"
            )}
        >
        <div className="flex items-center gap-x-2 py-4">
            <Icon
                size={22}
                className={cn(
                    "text-[#2b686d]",
                    isActive && "text-[#b4549c]"
                )}
            />
            {label}
        </div>  
        <div
            className={cn(
                "ml-auto opacity-0 border-2 border-[#FFFF00] h-full transition-all", isActive && "opacity-100"
            )}    
        /> 
        </button>

    )
}