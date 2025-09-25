export async function ensureItems(conn, itemNames) {
  if (!itemNames.length) return new Map();
  const [existing] = await conn.query(
    'SELECT id, name FROM items WHERE name IN (?)',
    [itemNames]
  );
  const nameToId = new Map();
  for (const row of existing) nameToId.set(row.name, row.id);
  const newItems = itemNames.filter((i) => !nameToId.has(i));
  if (newItems.length) {
    const placeholders = newItems.map(() => '(?)').join(',');
    await conn.query(`INSERT INTO items (name) VALUES ${placeholders}`, newItems);
    const [rows2] = await conn.query('SELECT id, name FROM items WHERE name IN (?)', [itemNames]);
    nameToId.clear();
    for (const row of rows2) nameToId.set(row.name, row.id);
  }
  return nameToId;
}


