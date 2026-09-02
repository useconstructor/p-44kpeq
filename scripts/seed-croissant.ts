import { db, initProductsTable } from '../lib/db';

async function seedCroissant() {
  await initProductsTable();

  const existing = await db.execute({
    sql: 'SELECT id FROM products WHERE name = ?',
    args: ['Croissant de mantequilla'],
  });

  if (existing.rows.length === 0) {
    await db.execute({
      sql: 'INSERT INTO products (name, price, currency, description) VALUES (?, ?, ?, ?)',
      args: [
        'Croissant de mantequilla',
        35,
        'MXN',
        'Croissant hojaldrado tradicional francés',
      ],
    });
    console.log('Product "Croissant de mantequilla" added successfully');
  } else {
    console.log('Product "Croissant de mantequilla" already exists');
  }
}

seedCroissant().catch(console.error);
