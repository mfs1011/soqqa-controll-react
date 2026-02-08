const BASE_URL =
    import.meta.env.VITE_API_URL

export async function apiFetch(
    path: string,
    options?: RequestInit
) {
    const res = await fetch(
        `${BASE_URL}${path}`,
        {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("accessToken")}`,
            },
            ...options,
        }
    )

    if (!res.ok)
        throw new Error("API error")

    return res.json()
}
