export function buildItems(prefixCounts) {
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  return prefixCounts.flatMap((count, i) =>
    Array.from({ length: count }, (_, n) => `${alphabet[i]}${n + 1}`)
  );
}

export function generateCombinations(items, k) {
  const sorted = [...items].sort();
  const go = (start, path, used) => {
    if (path.length === k) return [path];
    const out = [];
    for (let i = start; i < sorted.length; i++) {
      const item = sorted[i];
      const prefix = item[0];
      if (used.has(prefix)) continue;
      const nextUsed = new Set(used);
      nextUsed.add(prefix);
      out.push(...go(i + 1, [...path, item], nextUsed));
    }
    return out;
  };
  return go(0, [], new Set());
}


