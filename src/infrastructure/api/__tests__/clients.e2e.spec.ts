import express from 'express';
import request from 'supertest';
import { clientsRouter } from '../routes/clients.route';

const app = express();
app.use(express.json());
app.use('/clients', clientsRouter);

describe('POST /clients', () => {
  it('should return 200 OK', async () => {
    const clientData = {
      name: 'Client Test',
      email: 'client@test.com',
      document: '123456789',
      address: 'Client Address',
    };
    const response = await request(app).post('/clients').send(clientData);

    expect(response.status).toBe(200);
    // Aqui você pode adicionar mais expectativas sobre o corpo da resposta
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