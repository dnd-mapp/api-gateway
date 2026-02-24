export function fromStringToArray(value: string | null) {
    if (!value) return null;
    return value.split(',');
}
