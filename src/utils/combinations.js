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
  const prefixes = sorted.map(item => item[0]);
  const result = [];
  const path = new Array(k);
  const used = new Set();
  const stack = [];

  let pos = 0;
  let start = 0;

  while (pos < k) {
    while (start < sorted.length) {
      const prefix = prefixes[start];
      
      if (!used.has(prefix)) {
        path[pos] = sorted[start];
        used.add(prefix);
        stack.push(start);
        pos++;
        start++;
        break;
      }
      start++;
    }

    if (pos === k) {
      result.push([...path]);
      const lastIndex = stack.pop();
      used.delete(prefixes[lastIndex]);
      pos--;
      start = lastIndex + 1;
      continue;
    }

    if (start >= sorted.length) {
      if (stack.length === 0) break;
      const lastIndex = stack.pop();
      used.delete(prefixes[lastIndex]);
      pos--;
      start = lastIndex + 1;
    }
  }

  return result;
}