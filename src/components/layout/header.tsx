import { Button } from "../ui/button";
import { SquarePlusIcon } from "lucide-react";
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

            <div className="ml-auto">
                <Tooltip>
                    <TooltipTrigger asChild>
                        <Button variant="default" size="sm" className="ml-4 flex items-center gap-2">
                            <SquarePlusIcon className="ml-2" />
                            Transaction / Transfer
                        </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                        <p>Add new transaction or transfer</p>
                    </TooltipContent>
                </Tooltip>
            </div>
        </header>
    )
}
