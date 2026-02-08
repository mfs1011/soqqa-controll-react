/* =========================================================
   Global Formatters — Finance / Dashboard Friendly
   ========================================================= */

/* -----------------------------
   NUMBER FORMATTER
----------------------------- */
export function formatNumber(
    value: number,
    locale: string = "en-US"
): string {
    return new Intl.NumberFormat(
        locale
    ).format(value)
}

/* -----------------------------
   COMPACT NUMBER (1K, 2M)
   Dashboard stats uchun
----------------------------- */
export function formatCompactNumber(
    value: number,
    locale: string = "en"
): string {
    return new Intl.NumberFormat(
        locale,
        {
            notation: "compact",
            maximumFractionDigits: 1,
        }
    ).format(value)
}

/* -----------------------------
   CURRENCY FORMATTER
   Default: USD
----------------------------- */
export function formatCurrency(
    value: number,
    currency: string = "USD",
    locale: string = "en-US"
): string {
    return new Intl.NumberFormat(
        locale,
        {
            style: "currency",
            currency,
        }
    ).format(value)
}

/* -----------------------------
   UZS (So‘m) FORMATTER
   Uzbekistan project uchun
----------------------------- */
export function formatCurrencyUZS(
    value: number
): string {
    return new Intl.NumberFormat(
        "uz-UZ",
        {
            style: "currency",
            currency: "UZS",
            maximumFractionDigits: 0,
        }
    ).format(value)
}

/* -----------------------------
   SHORT DATE
   Feb 03, 2026
----------------------------- */
export function formatDate(
    date: string | Date,
    locale: string = "en-US"
): string {
    return new Intl.DateTimeFormat(
        locale,
        {
            year: "numeric",
            month: "short",
            day: "2-digit",
        }
    ).format(new Date(date))
}

/* -----------------------------
   COMPACT DATE
   Feb 03
----------------------------- */
export function formatDateCompact(
    date: string | Date,
    locale: string = "en-US"
): string {
    return new Intl.DateTimeFormat(
        locale,
        {
            month: "short",
            day: "2-digit",
        }
    ).format(new Date(date))
}

/* -----------------------------
   DATE + TIME
   Feb 03, 2026 14:22
----------------------------- */
export function formatDateTime(
    date: string | Date,
    locale: string = "en-US"
): string {
    return new Intl.DateTimeFormat(
        locale,
        {
            year: "numeric",
            month: "short",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
        }
    ).format(new Date(date))
}
