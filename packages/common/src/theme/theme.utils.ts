export function createSizePxConstants<T extends Record<string, number>>(
  whitespace: T
): { readonly [K in keyof T]: `${T[K]}px` } {
  return Object.fromEntries(
    Object.entries(whitespace).map(([key, value]) => [
      key,
      `${value}px` as const,
    ])
  ) as { readonly [K in keyof T]: `${T[K]}px` };
}
