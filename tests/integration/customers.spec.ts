import request from 'supertest';
import { createTestServer } from './setup/testServer';
import { connectTestDB, disconnectTestDB, clearDB } from './setup/mongodb';
import { App } from 'supertest/types';

describe('Customers API', () => {
  let app: App;

  beforeAll(async () => {
    await connectTestDB();
    app = createTestServer();
  });

  afterAll(async () => {
    await disconnectTestDB();
  });

  beforeEach(async () => {
    await clearDB();
  });

  it('creates a customer', async () => {
    const res = await request(app)
      .post('/customers')
      .send({
        name: 'Alice',
        location: 'EU'
      });

    expect(res.status).toBe(201);
    expect(res.body.id).toBeDefined();
  });
});
