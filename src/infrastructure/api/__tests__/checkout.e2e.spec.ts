import express from 'express';
import request from 'supertest';
import { checkoutRouter } from '../routes/checkout.route';

const app = express();
app.use(express.json());
app.use('/checkout', checkoutRouter);

describe('POST /checkout', () => {
  it('should return 200 OK', async () => {
    const productData = {
      name: 'Product Test',
      description: 'Product Description',
      purchasePrice: 100,
      stock: 10,
    };
    const { body } = await request(app).post('/products').send(productData);
    const response = await request(app).post('/checkout').send({ productId: body.id });

    expect(response.status).toBe(200);
  });

  it('should return 500 if there is an error', async () => {
    const productId = 'invalid'; // Substitua por um ID de produto inválido
    const response = await request(app).post('/checkout').send({ productId });

    expect(response.status).toBe(500);
    // Aqui você pode adicionar mais expectativas sobre o corpo da resposta
  });
});