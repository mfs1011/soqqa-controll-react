import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"

import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

import { Field, FieldLabel }
    from "@/components/ui/field"

interface PaginationMeta {
    total: number
    page: number
    lastPage: number
    limit: number
}

interface TablePaginationProps {
    meta: PaginationMeta
    limit: number,
    onPageChange: (page: number) => void
    onLimitChange?: (limit: number) => void
}

function generatePages(
    current: number,
    last: number
): (number | "...")[] {

    const pages: (number | "...")[] = []

    if (last <= 7) {
        return Array.from(
            { length: last },
            (_, i) => i + 1
        )
    }

    pages.push(1)

    if (current > 3)
        pages.push("...")

    const start =
        Math.max(2, current - 1)

    const end =
        Math.min(last - 1, current + 1)

    for (let i = start; i <= end; i++)
        pages.push(i)

    if (current < last - 2)
        pages.push("...")

    pages.push(last)

    return pages
}

export function TablePagination({
    meta,
    limit,
    onPageChange,
    onLimitChange,
}: TablePaginationProps) {
    const pages = generatePages(meta.page, meta.lastPage)

    const perPageOptions = [5, 10, 25, 50, 100]

    return (
        <div className="flex items-center justify-between gap-4">

            {/* Rows per page */}
            <Field
                orientation="horizontal"
                className="w-fit"
            >
                <FieldLabel>
                    Rows per page
                </FieldLabel>

                <Select
                    value={String(limit)}
                    onValueChange={(v) =>
                        onLimitChange?.(Number(v))
                    }
                >
                    <SelectTrigger className="w-20">
                        <SelectValue />
                    </SelectTrigger>

                    <SelectContent align="start">
                        <SelectGroup >
                            {perPageOptions.map((option) => (
                                <SelectItem
                                    key={option}
                                    value={String(option)}
                                >
                                    {option}
                                </SelectItem>
                            ))}
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </Field>

            {/* Pagination */}
            <Pagination className="mx-0 w-auto">
                <PaginationContent>

                    {/* Prev */}
                    <PaginationItem>
                        <PaginationPrevious
                            onClick={() =>
                                onPageChange(meta.page - 1)
                            }
                            className={
                                meta.page === 1
                                    ? "pointer-events-none opacity-50"
                                    : "cursor-pointer"
                            }
                        />
                    </PaginationItem>

                    {/* Page numbers */}
                    {pages.map((p, i) => (

                        <PaginationItem key={i}>

                            {p === "..." ? (
                                <PaginationEllipsis />
                            ) : (
                                <PaginationLink
                                    isActive={p === meta.page}
                                    onClick={() =>
                                        onPageChange(p)
                                    }
                                    className="cursor-pointer"
                                >
                                    {p}
                                </PaginationLink>
                            )}

                        </PaginationItem>
                    ))}

                    {/* Next */}
                    <PaginationItem>
                        <PaginationNext
                            onClick={() =>
                                onPageChange(meta.page + 1)
                            }
                            className={
                                meta.page === meta.lastPage
                                    ? "pointer-events-none opacity-50"
                                    : "cursor-pointer"
                            }
                        />
                    </PaginationItem>

                </PaginationContent>
            </Pagination>
        </div>
    )
}
