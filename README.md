## Task Combinations API

Node.js + Express + MySQL2 service that generates item combinations with the rule that items sharing the same starting letter cannot appear together. Results are stored using MySQL transactions and returned as `{ id, combination }`.

### Requirements
- Node 18+ (recommended Node 20 LTS)
- MySQL 8+

### Setup
1. Create the database and tables:
```sql
-- run in MySQL client
SOURCE schema.sql;
```
2. Copy env file and set credentials:
```bash
cp .env.example .env
# edit .env values for your local MySQL
```
3. Install dependencies and start:
```bash
npm install
npm run dev
```

### Endpoint
- POST `/generate`

Body:
```json
{ "items": [1, 2, 1], "length": 2 }
```

Example response:
```json
{
  "id": 1,
  "combination": [["A1","B1"],["A1","B2"],["A1","C1"],["B1","C1"],["B2","C1"]]
}
```

### Schema Overview
- `items(id, name)`
- `combinations(id, created_at)`
- `combination_sets(id, combination_id)`
- `combination_items(set_id, item_id)`
- `responses(id, combination_id, response_json, created_at)`
