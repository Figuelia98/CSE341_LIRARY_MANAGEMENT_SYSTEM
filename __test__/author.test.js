const { ObjectId } = require('mongodb');
const { listAuthors, getAuthor, createAuthor, updateAuthor, deleteAuthor } = require('../controllers/author');
const mongodb = require('../db/connection');

// Use a dummy author for ID-based tests
let testAuthorId;

beforeAll(async () => {
  // Initialize the DB (wrap callback into a Promise)
  await new Promise((resolve, reject) => {
    mongodb.initDb((err) => {
      if (err) reject(err);
      else resolve();
    });
  });

  // Insert a dummy author for read/update/delete tests
  const db = mongodb.getDb().db();
  const result = await db.collection('Authors').insertOne({
    name: 'Test Author',
    biography: 'Testing...',
    birthdate: '2000-01-01',
    nationality: 'Testland'
  });

  testAuthorId = result.insertedId;
});

afterAll(async () => {
  const db = mongodb.getDb().db();
  await db.collection('Authors').deleteMany({ name: 'Test Author' });
});

describe('Simple status code tests for author controller', () => {

  it('listAuthors → should return status 200', async () => {
    const req = {};
    const res = {
      setHeader: jest.fn(),
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
    const next = jest.fn();

    await listAuthors(req, res, next);

    expect(res.status).toHaveBeenCalledWith(200);
  });

  it('createAuthor → should return 204 on success', async () => {
    const req = {
      body: {
        name: 'New Author',
        biography: 'Writer of tests',
        birthdate: '1999-05-05',
        nationality: 'Testville'
      }
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn()
    };
    const next = jest.fn();

    await createAuthor(req, res, next);

    expect(res.status).toHaveBeenCalledWith(204);
    expect(res.send).toHaveBeenCalled();
  });

  it('updateAuthor → should return 204 if update successful', async () => {
    const req = {
      params: { id: testAuthorId.toString() },
      body: {
        name: 'Updated Author',
        biography: 'Updated',
        birthdate: '2001-01-01',
        nationality: 'Updatedland'
      }
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn()
    };
    const next = jest.fn();

    await updateAuthor(req, res, next);

    expect(res.status).toHaveBeenCalledWith(204);
    expect(res.send).toHaveBeenCalled();
  });

  it('deleteAuthor → should return 204 if deleted', async () => {
    const req = { params: { id: testAuthorId.toString() } };
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn()
    };
    const next = jest.fn();

    await deleteAuthor(req, res, next);

    expect(res.status).toHaveBeenCalledWith(204);
    expect(res.send).toHaveBeenCalled();
  });

});