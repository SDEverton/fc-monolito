import express from 'express';
import { Sequelize } from 'sequelize-typescript';
import request from 'supertest';
import { ProductModel } from '../../../modules/product-adm/repository/product.model';
import { checkoutRouter } from '../routes/checkout.route';
import { productsRouter } from '../routes/products.route';

const app = express();
app.use(express.json());
app.use('/products', productsRouter);
app.use('/checkout', checkoutRouter);

describe('POST /checkout', () => {
  let sequelize: Sequelize;

  beforeEach(async() => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });

    await sequelize.addModels([ProductModel]);
    await sequelize.sync();
  });

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
  });
});