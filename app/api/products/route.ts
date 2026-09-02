import { db, initProductsTable } from '@/lib/db'

export async function GET() {
  await initProductsTable()
  const result = await db.execute('SELECT * FROM products ORDER BY created_at DESC')
  return Response.json(result.rows)
}

export async function POST(request: Request) {
  await initProductsTable()
  const body = await request.json()
  const { name, price, description } = body

  await db.execute({
    sql: 'INSERT INTO products (name, price, description) VALUES (?, ?, ?)',
    args: [name, price ?? null, description ?? null]
  })

  return Response.json({ success: true })
}
