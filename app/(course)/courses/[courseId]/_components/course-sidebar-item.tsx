"use client";

import { cn } from "@/lib/utils";
import { CheckCircle, PlayCircle } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

interface CourseSidebarItemProps {
    label: string;
    id: string;
    isCompleted: boolean;
    courseId: string;
};

export const CourseSidebarItem = ({
    label,
    id,
    isCompleted,
    courseId,
}: CourseSidebarItemProps) => {
    const pathname = usePathname();
    const router = useRouter();

    const Icon = isCompleted ? CheckCircle : PlayCircle;
    const isActive = pathname?.includes(id);

    const onClick = () => {
        router.push(`/courses/${courseId}/chapters/${id}`);
    }

    return (
        <button
            onClick={onClick}
            type="button"
            className={cn(
                "flex items-center gap-x-2 text-[#2b686d] text-sm font-[500] pl-6 transition-all hover:text-[#b4549c] hover:bg-[#FFFF00] hover:bg-opacity-20",
                isActive && "text-[#255a5e] bg-[#FFFF00]/20 hover:bg-[#FFFF00]/20 hover:text-[#b4549c]",
                isCompleted && "text-emerald-700 hover:text-emerald-700",
                isCompleted && isActive && "bg-emerald-200/20",
            )}
        >
            <div className="flex items-center gap-x-2 py-4">
                <Icon
                    size={22}
                    className={cn(
                    "text-[#2b686d]",
                    isActive && "text-[#b4549c]",
                    isCompleted && "text-emerald-700"
                )}
                />
                {label}
            </div>
            <div className={cn(
                "ml-auto opacity-0 border-2 border-[#FFFF00] h-full transition-all", isActive && "opacity-100", isCompleted && "border-emerald-700"
            )} />
        </button>
    )
}