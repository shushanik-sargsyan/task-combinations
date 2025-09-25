import { Router } from "express";
import { z } from "zod";
import { validate } from "../middleware/validate.js";
import { generate, getCombination } from "../services/generateService.js";

const router = Router();

const BodySchema = z.object({
  items: z.array(z.number().int().nonnegative()),
  length: z.number().int().positive(),
});

router.post('/', validate(BodySchema), async (req, res) => {
  const { items: counts, length } = req.validated;
  try {
    const result = await generate(counts, length);
    res.json(result);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

export default router;
router.get('/:id', async (req, res) => {
  const id = Number(req.params.id);
  if (!Number.isInteger(id) || id <= 0) {
    return res.status(400).json({ error: 'Invalid id' });
  }
  try {
    const payload = await getCombination(id);
    if (!payload) return res.status(404).json({ error: 'Not found' });
    res.json(payload);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});


