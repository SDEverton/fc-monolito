import { Sequelize } from "sequelize-typescript";
import Address from '../../@shared/domain/value-object/address';
import Id from '../../@shared/domain/value-object/id.value-object';
import InvoiceItems from '../domain/invoice-items.entity';
import Invoice from '../domain/invoice.entity';
import { InvoiceItemsModel } from './invoice-items.model';
import { InvoiceModel } from './invoice.model';
import InvoiceRepository from './invoice.repository';

describe('InvoiceRepository', () => {
  let sequelize: Sequelize;
  let repository: InvoiceRepository;
  let mockInvoiceModel: typeof InvoiceModel;
  let mockInvoiceItemsModel: typeof InvoiceItemsModel;

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

  afterEach(async () => {
    await sequelize.close();
  });

  it('should save an invoice', async () => {
    const invoice = new Invoice({
      id: new Id('1'),
      name: 'Test',
      document: '123456789',
      address: new Address('Street', '123', 'Apt 4', 'City', 'State', '12345'),
      items: [ new InvoiceItems({ id: new Id('1'), name: 'Item 1', price: 10 })],
    });

    const repository = new InvoiceRepository();

    const generateSpy = jest.spyOn(repository, 'generate');

    const output = await repository.generate(invoice);

    expect(generateSpy).toHaveBeenCalled();
  });

  it('should find an invoice', async () => {
    const invoice = new Invoice({
      id: new Id('1'),
      name: 'Test',
      document: '123456789',
      address: new Address('Street', '123', 'Apt 4', 'City', 'State', '12345'),
      items: [ new InvoiceItems({ id: new Id('1'), name: 'Item 1', price: 10 })],
    });

    const repository = new InvoiceRepository();

    await repository.generate(invoice);

    const output = await repository.find(invoice.id.id);

    expect(output.id.id).toEqual(invoice.id.id);
  });
});