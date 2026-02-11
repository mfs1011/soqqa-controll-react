import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { EllipsisVerticalIcon } from "lucide-react"
import React from "react"

// Har bir menyu elementi uchun interfeys
interface DropdownActionItem {
    label: string;
    icon?: React.ReactNode;
    onClick: () => void;
    variant?: "default" | "destructive";
    showSeparator?: boolean; // Elementdan keyin chiziq qo'yish uchun
}

interface ThreeDotsDropdownProps {
    actions: DropdownActionItem[];
}

export function ThreeDotsDropdown({ actions }: ThreeDotsDropdownProps) {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="size-8">
                    <EllipsisVerticalIcon className="size-4" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                {actions.map((item, index) => (
                    <React.Fragment key={index}>
                        <DropdownMenuItem
                            onClick={(e) => {
                                e.stopPropagation(); // Qator bosilib ketishini oldini oladi
                                item.onClick();
                            }}
                            variant={item.variant}
                            className="cursor-pointer gap-2"
                        >
                            {item.icon}
                            <span>{item.label}</span>
                        </DropdownMenuItem>
                        {item.showSeparator && <DropdownMenuSeparator />}
                    </React.Fragment>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    )
}