export function slicePage<T>(items: T[], page: number, size = 10) {
  const p = Math.max(1, page);
  const start = (p - 1) * size;
  return items.slice(start, start + size);
}

export function pageCount(total: number, size = 10) {
  return Math.max(1, Math.ceil(total / size));
}
