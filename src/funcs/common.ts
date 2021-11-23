export const definedObject = (
  o: Record<string, unknown>,
): Record<string, unknown> =>
  Object.fromEntries(
    Object.entries(o).filter(([, value]) => value !== undefined),
  );
