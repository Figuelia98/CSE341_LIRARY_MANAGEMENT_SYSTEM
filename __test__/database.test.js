const mongodb = require('../db/connection');

beforeAll(async () => {
  await new Promise((resolve, reject) => {
    mongodb.initDb((err) => {
      if (err) reject(err);
      else resolve();
    });
  });
});

afterAll(async () => {
  // If you want to close the connection after tests
  const client = mongodb.getDb();
  if (client && client.close) {
    await client.close();
  }
});

describe('Simple DB connection tests', () => {
  it('initDb → should initialize DB without error', () => {
    const client = mongodb.getDb();
    expect(client).toBeDefined();
    expect(typeof client.db).toBe('function'); // Check that db() exists on client
  });

  it('getDb → should return the DB client', () => {
    const client = mongodb.getDb();
    expect(client).toBeDefined();
  });
});
