import request from 'supertest';
import { createTestServer } from './setup/testServer';
import { connectTestDB, disconnectTestDB, clearDB } from './setup/mongodb';
import { App } from 'supertest/types';

describe('Products API', () => {
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

  it('creates a product', async () => {
    const res = await request(app)
      .post('/products')
      .send({
        name: 'Test bike',
        description: 'Example',
        price: 2000,
        stock: 10,
        category: 'bikes'
      });

    expect(res.status).toBe(201);
    expect(res.body.id).toBeDefined();
    expect(res.body.name).toBe('Test bike');
  });

  it('returns list of products', async () => {
    await request(app).post('/products').send({
      name: 'Test Bike 2',
      description: 'Example',
      price: 1000,
      stock: 5,
      category: 'bikes'
    });

    const res = await request(app).get('/products');

    expect(res.status).toBe(200);
    expect(res.body.length).toBe(1);
    expect(res.body[0].name).toBe('Test Bike 2');
  });
});
