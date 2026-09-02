import { db, initProductsTable } from '../lib/db';

async function seedPastelChocolate() {
  await initProductsTable();

  const existing = await db.execute({
    sql: 'SELECT id FROM products WHERE name = ?',
    args: ['Pastel de chocolate'],
  });

  if (existing.rows.length === 0) {
    await db.execute({
      sql: 'INSERT INTO products (name, price, currency, description) VALUES (?, ?, ?, ?)',
      args: [
        'Pastel de chocolate',
        320,
        'MXN',
        'Pastel de tres pisos con ganache de chocolate belga',
      ],
    });
    console.log('Product "Pastel de chocolate" added successfully');
  } else {
    console.log('Product "Pastel de chocolate" already exists');
  }
}

seedPastelChocolate().catch(console.error);
