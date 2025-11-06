export function buildItems(prefixCounts) {
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  return prefixCounts.flatMap((count, i) =>
    Array.from({ length: count }, (_, n) => `${alphabet[i]}${n + 1}`)
  );
}

export function generateCombinations(items, k) {
  if (k <= 0) return [[]];
  if (!items?.length || k > items.length) return [];

  const sorted = [...items].sort();
  const result = [];
  const path = new Array(k);
  const usedPrefixes = new Set();

  function backtrack(start, depth) {
    if (depth === k) {
      result.push(path.slice());
      return;
    }

    let prevItem = null;
    for (let i = start; i < sorted.length; i++) {
      const item = sorted[i];
      if (item === prevItem) continue;
      prevItem = item;

      const prefix = item[0];
      if (usedPrefixes.has(prefix)) continue;

      usedPrefixes.add(prefix);
      path[depth] = item;
      backtrack(i + 1, depth + 1);
      usedPrefixes.delete(prefix);
    }
  }

  backtrack(0, 0);
  return result;
}