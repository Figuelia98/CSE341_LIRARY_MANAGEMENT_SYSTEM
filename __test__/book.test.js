const { ObjectId } = require('mongodb');
const { listBooks, createBook, updateBook, deleteBook } = require('../controllers/book');
const mongodb = require('../db/connection');

// Use a dummy book for ID-based tests
let testBookId;

beforeAll(async () => {
  // Initialize the DB (wrap callback into a Promise)
  await new Promise((resolve, reject) => {
    mongodb.initDb((err) => {
      if (err) reject(err);
      else resolve();
    });
  });

  // Insert a dummy book for read/update/delete tests
  const db = mongodb.getDb().db();
  const result = await db.collection('Books').insertOne({
    title: 'Test Book',
    author: 'Test Author',
    genre: 'Testing',
    isbn: '000-000-000',
    publicationYear: 2024,
    availableCopies: 3,
    totalCopies: 3
  });

  testBookId = result.insertedId;
});

afterAll(async () => {
  const db = mongodb.getDb().db();
  await db.collection('Books').deleteMany({ title: 'Test Book' });
});

describe('Simple status code tests for book controller', () => {

  it('createBook → should return 204 on success', async () => {
    const req = {
      body: {
        title: 'New Book',
        author: 'Author X',
        genre: 'Fiction',
        isbn: '123-456-789',
        publicationYear: 2023,
        availableCopies: 5,
        totalCopies: 5
      }
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn()
    };
    const next = jest.fn();

    await createBook(req, res, next);

    expect(res.status).toHaveBeenCalledWith(204);
    expect(res.send).toHaveBeenCalled();
  });

  it('updateBook → should return 204 if update successful', async () => {
    const req = {
      params: { id: testBookId.toString() },
      body: {
        title: 'Updated Book',
        author: 'Author Y',
        genre: 'Non-fiction',
        isbn: '987-654-321',
        publicationYear: 2025,
        availableCopies: 2,
        totalCopies: 5
      }
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn()
    };
    const next = jest.fn();

    await updateBook(req, res, next);

    expect(res.status).toHaveBeenCalledWith(204);
    expect(res.send).toHaveBeenCalled();
  });

  it('deleteBook → should return 204 if deleted', async () => {
    const req = { params: { id: testBookId.toString() } };
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn()
    };
    const next = jest.fn();

    await deleteBook(req, res, next);

    expect(res.status).toHaveBeenCalledWith(204);
    expect(res.send).toHaveBeenCalled();
  });

});
