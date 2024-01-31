import express from 'express';
import { Sequelize } from 'sequelize-typescript';
import request from 'supertest';
import { ProductModel } from '../../../modules/product-adm/repository/product.model';
import { productsRouter } from '../routes/products.route';

const app = express();
app.use(express.json());
app.use('/products', productsRouter);

describe('POST /products', () => {
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
    const response = await request(app).post('/products').send(productData);

    expect(response.status).toBe(200);
  });

  it('should return 500 if there is an error', async () => {
    const productData = {
      stock: 10,
    };
    const response = await request(app).post('/products').send(productData);

    expect(response.status).toBe(500);
    // Aqui você pode adicionar mais expectativas sobre o corpo da resposta
  });
});