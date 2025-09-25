export async function createCombination(conn) {
  const [res] = await conn.query('INSERT INTO combinations (created_at) VALUES (NOW())');
  return res.insertId;
}

export async function insertCombinationSet(conn, combinationId, itemIds) {
  const [setRes] = await conn.query(
    'INSERT INTO combination_sets (combination_id) VALUES (?)',
    [combinationId]
  );
  const setId = setRes.insertId;
  if (itemIds.length) {
    const placeholders = itemIds.map(() => '(?, ?)').join(',');
    const values = [];
    for (const id of itemIds) values.push(setId, id);
    await conn.query(
      `INSERT INTO combination_items (set_id, item_id) VALUES ${placeholders}`,
      values
    );
  }
  return setId;
}

export async function saveResponse(conn, combinationId, payload) {
  await conn.query(
    'INSERT INTO responses (combination_id, response_json, created_at) VALUES (?, ?, NOW())',
    [combinationId, JSON.stringify(payload)]
  );
}

export async function getResponseByCombinationId(conn, id) {
  const [rows] = await conn.query(
    'SELECT response_json FROM responses WHERE combination_id = ? ORDER BY id DESC LIMIT 1',
    [id]
  );
  if (!rows.length) return null;
  try {
    return JSON.parse(rows[0].response_json);
  } catch {
    return rows[0].response_json;
  }
}


