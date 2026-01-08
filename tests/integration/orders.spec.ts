import request from 'supertest';
import { createTestServer } from './setup/testServer';
import { connectTestDB, disconnectTestDB, clearDB } from './setup/mongodb';
import { App } from 'supertest/types';

describe('Orders API', () => {
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

  it('creates an order and updates stock', async () => {
    const customer = await request(app).post('/customers').send({
      name: 'Bob',
      location: 'EU'
    });

    const product = await request(app).post('/products').send({
      name: 'Test Bike',
      description: 'Example',
      price: 2000,
      stock: 10,
      category: 'bikes'
    });

    const order = await request(app).post('/orders').send({
      customerId: customer.body.id,
      products: [{ productId: product.body.id, quantity: 3 }]
    });

    expect(order.status).toBe(201);
    expect(order.body.total).toBeGreaterThan(0);

    const updated = await request(app).get('/products');
    expect(updated.body[0].stock).toBe(7);
  });

  it('returns 400 when stock is insufficient', async () => {
    const customer = await request(app).post('/customers').send({
      name: 'Bob',
      location: 'EU'
    });

    const product = await request(app).post('/products').send({
      name: 'Test bike',
      description: 'Example',
      price: 2000,
      stock: 2,
      category: 'bikes'
    });

    const res = await request(app).post('/orders').send({
      customerId: customer.body.id,
      products: [{ productId: product.body.id, quantity: 5 }]
    });

    expect(res.status).toBe(400);
    expect(res.body.message).toContain('Insufficient stock');
  });

  it('applies volume discount', async () => {
    const customer = await request(app).post('/customers').send({
      name: 'Bob',
      location: 'EU'
    });

    const product = await request(app).post('/products').send({
      name: 'Test Bike 2',
      description: 'Example',
      price: 100,
      stock: 100,
      category: 'bikes'
    });

    const order = await request(app).post('/orders').send({
      customerId: customer.body.id,
      products: [{ productId: product.body.id, quantity: 10 }]
    });

    expect(order.status).toBe(201);
    expect(order.body.total).toBeLessThan(1000);
  });
});
