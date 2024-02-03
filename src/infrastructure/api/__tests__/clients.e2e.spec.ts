import express from 'express';
import { Sequelize } from 'sequelize-typescript';
import request from 'supertest';
import { ClientModel } from '../../../modules/client-adm/repository/client.model';
import { clientsRouter } from '../routes/clients.route';

const app = express();
app.use(express.json());
app.use('/clients', clientsRouter);

describe('POST /clients', () => {
  let sequelize: Sequelize;

  beforeEach(async() => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });

    await sequelize.addModels([ClientModel]);
    await sequelize.sync();
  });
  it('should return 200 OK', async () => {
    const clientData = {
      name: 'Client Test',
      email: 'client@test.com',
      document: '123456789',
      address: {
        street: 'Client Street',
        number: '123',
        complement: 'Client Complement',
        city: 'Client City',
        state: 'Client State',
        zipCode: '12345-678',
      
      },
    };
    const response = await request(app).post('/clients').send(clientData);

    expect(response.status).toBe(200);
  });

  it('should return 500 if there is an error', async () => {
    const clientData = {
      name: '', // Dados inválidos para causar um erro
      email: 'client@test.com',
      document: '123456789',
      address: 'Client Address',
    };
    const response = await request(app).post('/clients').send(clientData);

    expect(response.status).toBe(500);
    // Aqui você pode adicionar mais expectativas sobre o corpo da resposta
  });
});