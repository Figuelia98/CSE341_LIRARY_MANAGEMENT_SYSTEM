const { ObjectId } = require('mongodb');
const { listBorrowers, getBorrower, createBorrower, updateBorrower, deleteBorrower } = require('../controllers/borrower');
const mongodb = require('../db/connection');

// Use a dummy borrower for ID-based tests
let testBorrowerId;

beforeAll(async () => {
  // Initialize the DB (wrap callback into a Promise)
  await new Promise((resolve, reject) => {
    mongodb.initDb((err) => {
      if (err) reject(err);
      else resolve();
    });
  });

  // Insert a dummy borrower for read/update/delete tests
  const db = mongodb.getDb().db();
  const result = await db.collection('Borrowers').insertOne({
    firstName: 'Test',
    lastName: 'Borrower',
    email: 'test.borrower@example.com',
    phoneNumber: '123-456-7890',
    borrowedBooks: []
  });

  testBorrowerId = result.insertedId;
});

afterAll(async () => {
  const db = mongodb.getDb().db();
  await db.collection('Borrowers').deleteMany({ email: 'test.borrower@example.com' });
});

describe('Simple status code tests for borrower controller', () => {

  it('listBorrowers → should return status 200', async () => {
    const req = {};
    const res = {
      setHeader: jest.fn(),
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
    const next = jest.fn();

    await listBorrowers(req, res, next);

    expect(res.status).toHaveBeenCalledWith(200);
  });

  it('createBorrower → should return 204 on success', async () => {
    const req = {
      body: {
        firstName: 'New',
        lastName: 'Borrower',
        email: 'new.borrower@example.com',
        phoneNumber: '987-654-3210',
        borrowedBooks: []
      }
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn()
    };
    const next = jest.fn();

    await createBorrower(req, res, next);

    expect(res.status).toHaveBeenCalledWith(204);
    expect(res.send).toHaveBeenCalled();
  });

  it('updateBorrower → should return 204 if update successful', async () => {
    const req = {
      params: { id: testBorrowerId.toString() },
      body: {
        firstName: 'Updated',
        lastName: 'Borrower',
        email: 'updated.borrower@example.com',
        phoneNumber: '555-555-5555',
        borrowedBooks: []
      }
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn()
    };
    const next = jest.fn();

    await updateBorrower(req, res, next);

    expect(res.status).toHaveBeenCalledWith(204);
    expect(res.send).toHaveBeenCalled();
  });

  it('deleteBorrower → should return 204 if deleted', async () => {
    const req = { params: { id: testBorrowerId.toString() } };
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn()
    };
    const next = jest.fn();

    await deleteBorrower(req, res, next);

    expect(res.status).toHaveBeenCalledWith(204);
    expect(res.send).toHaveBeenCalled();
  });

});
