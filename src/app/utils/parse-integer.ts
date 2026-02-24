export function parseInteger(value: string | null, fallback: number) {
    if (!value) return fallback;
    const parsed = Number.parseInt(value, 10);

    if (Number.isNaN(parsed)) return fallback;
    return parsed;
}
