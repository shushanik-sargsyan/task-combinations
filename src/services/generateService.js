import { pool } from "../db/pool.js";
import { withTransaction } from "../db/tx.js";
import { buildItems, generateCombinations } from "../utils/combinations.js";
import { ensureItems } from "../repositories/itemRepository.js";
import { createCombination, insertCombinationSet, saveResponse, getResponseByCombinationId } from "../repositories/combinationRepository.js";

const tx = withTransaction(pool);

export async function generate(prefixCounts, length) {
  const items = buildItems(prefixCounts);
  const combos = generateCombinations(items, length);
  return tx(async (conn) => {
    const nameToId = await ensureItems(conn, items);
    const combinationId = await createCombination(conn);
    for (const combo of combos) {
      const itemIds = combo.map((n) => nameToId.get(n));
      await insertCombinationSet(conn, combinationId, itemIds);
    }
    await saveResponse(conn, combinationId, { id: combinationId, combination: combos });
    return { id: combinationId, combination: combos };
  });
}

export async function getCombination(id) {
  const conn = await pool.getConnection();
  try {
    return await getResponseByCombinationId(conn, id);
  } finally {
    conn.release();
  }
}



