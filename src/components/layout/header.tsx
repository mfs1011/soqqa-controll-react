import { Button } from "../ui/button";
import { BellIcon, SquarePlusIcon } from "lucide-react";
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip"

export default function Header() {
    return (
        <header className="h-14 bg-white dark:bg-card border-b flex items-center px-6">
            <h1 className="font-semibold">
                Dashboard
            </h1>

            <div className="ml-auto flex items-center gap-4">
                <Tooltip>
                    <TooltipTrigger asChild>
                        <Button variant="default" size="sm" className="ml-4 flex items-center gap-2">
                            <SquarePlusIcon />
                            Transaction / Transfer
                        </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                        <p>Add new transaction or transfer</p>
                    </TooltipContent>
                </Tooltip>

                <Tooltip>
                    <TooltipTrigger asChild>
                        <Button variant="ghost" size="sm" className="flex items-center gap-2 relative rounded-full size-8">
                            <div className="absolute size-2 bg-teal-500 rounded-full top-1.5 right-2" />
                            <BellIcon />
                        </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                        <p>Notifications</p>
                    </TooltipContent>
                </Tooltip>
            </div>
        </header>
    )
}
