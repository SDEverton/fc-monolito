import express from 'express';
import { Sequelize } from 'sequelize-typescript';
import request from 'supertest';
import { InvoiceItemsModel } from '../../../modules/invoice/repository/invoice-items.model';
import { InvoiceModel } from '../../../modules/invoice/repository/invoice.model';
import InvoiceRepository from '../../../modules/invoice/repository/invoice.repository';
import GenerateInvoiceUseCase from '../../../modules/invoice/usecase/generate-invoice/generate-invoice.usecase';
import { invoiceRouter } from '../routes/invoice.route';

const app = express();
app.use(express.json());
app.use('/invoice', invoiceRouter);



describe('GET /invoice/:id', () => {
  let sequelize: Sequelize;

  beforeEach(async() => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });

    await sequelize.addModels([InvoiceModel, InvoiceItemsModel]);
    await sequelize.sync();
  });
  it('should return 200 OK', async () => {
    const usecase = new GenerateInvoiceUseCase(new InvoiceRepository())

    const invoiceDto = {
      name: 'John Doe',
      document: '12345678900',
      street: 'Rua A',
      complement: 'Complemento',
      city: 'Cidade',
      state: 'Estado',
      zipCode: '12345678',
      number: '123',
      items: [
        {
          id: '123',
          name: 'Item 1',
          price: 10
        }
      ]
    }

    const invoice = await usecase.execute(invoiceDto);

    const response = await request(app).get(`/invoice/${invoice.id}`);

    expect(response.status).toBe(200);
  });

  it('should return 500 if there is an error', async () => {
    const id = 'invalid';
    
    const response = await request(app).get(`/invoice/${id}`);

    expect(response.status).toBe(500);
  });
});