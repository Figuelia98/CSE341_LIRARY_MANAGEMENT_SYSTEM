const { ObjectId } = require('mongodb');
const { listGenres, getGenre, createGenre, updateGenre, deleteGenre } = require('../controllers/genre');
const mongodb = require('../db/connection');

// Use a dummy genre for ID-based tests
let testGenreId;

beforeAll(async () => {
  // Initialize the DB (wrap callback into a Promise)
  await new Promise((resolve, reject) => {
    mongodb.initDb((err) => {
      if (err) reject(err);
      else resolve();
    });
  });

  // Insert a dummy genre for read/update/delete tests
  const db = mongodb.getDb().db();
  const result = await db.collection('Genres').insertOne({
    name: 'Test Genre',
    description: 'A genre used for testing'
  });

  testGenreId = result.insertedId;
});

afterAll(async () => {
  const db = mongodb.getDb().db();
  await db.collection('Genres').deleteMany({ name: 'Test Genre' });
});

describe('Simple status code tests for genre controller', () => {

  it('listGenres → should return status 200', async () => {
    const req = {};
    const res = {
      setHeader: jest.fn(),
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
    const next = jest.fn();

    await listGenres(req, res, next);

    expect(res.status).toHaveBeenCalledWith(200);
  });

  it('createGenre → should return 204 on success', async () => {
    const req = {
      body: {
        name: 'New Genre',
        description: 'Genre description for tests'
      }
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn()
    };
    const next = jest.fn();

    await createGenre(req, res, next);

    expect(res.status).toHaveBeenCalledWith(204);
    expect(res.send).toHaveBeenCalled();
  });

  it('updateGenre → should return 204 if update successful', async () => {
    const req = {
      params: { id: testGenreId.toString() },
      body: {
        name: 'Updated Genre',
        description: 'Updated description'
      }
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn()
    };
    const next = jest.fn();

    await updateGenre(req, res, next);

    expect(res.status).toHaveBeenCalledWith(204);
    expect(res.send).toHaveBeenCalled();
  });

  it('deleteGenre → should return 204 if deleted', async () => {
    const req = { params: { id: testGenreId.toString() } };
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn()
    };
    const next = jest.fn();

    await deleteGenre(req, res, next);

    expect(res.status).toHaveBeenCalledWith(204);
    expect(res.send).toHaveBeenCalled();
  });

});
