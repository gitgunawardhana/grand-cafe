import request from 'supertest';
import app from '../index';
import Order from '../models/Order';

describe('viewOrder Controller Test', () => {
  beforeEach(async () => {
    await Order.deleteMany();
  });

  it('should view all orders', async () => {
    const sampleOrder1 = {
      id: 'order123',
      user: 'Test User 1',
      items: [],
      email: 'test1@example.com',
      amount: 99.99,
      status: 'Pending',
      payment: 'Credit Card',
    };
    const sampleOrder2 = {
      id: 'order456',
      user: 'Test User 2',
      items: [],
      email: 'test2@example.com',
      amount: 59.99,
      status: 'Processing',
      payment: 'PayPal',
    };
    await Order.create(sampleOrder1, sampleOrder2);

    const response = await request(app).get('/api/order/viewOrder');

    expect(response.status).toBe(200);
    expect(response.body.messege).toBe("Success");
    expect(response.body.data).toHaveLength(2);
    // Add more assertions based on your Order model fields
  });

});
