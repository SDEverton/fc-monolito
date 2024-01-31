import Id from '../../../@shared/domain/value-object/id.value-object';
import InvoiceGateway from '../../gateway/invoice.gateway';
import { FindInvoiceUseCaseInputDTO } from './find-invoice.dto';
import FindInvoiceUseCase from './find-invoice.usecase';

describe('FindInvoiceUseCase', () => {
  let usecase: FindInvoiceUseCase;
  let mockInvoiceRepository: InvoiceGateway;
  let mockInput: FindInvoiceUseCaseInputDTO;

  beforeEach(() => {
    mockInvoiceRepository = {
      find: jest.fn(),
      generate: jest.fn(),
    };
    mockInput = {
      id: '123'
    };

    usecase = new FindInvoiceUseCase(mockInvoiceRepository);
  });

  it('should find an invoice', async () => {
    const result = {
      id: new Id('123'),
      name: 'John Doe',
      document: '12345678900',
      address: 'Rua A, 123',
      items: [
        {
          id: new Id('123'),
          name: 'Item 1',
          price: 10
        }
      ],
      total: 10,
      createdAt: new Date()
    };
    (mockInvoiceRepository.find as jest.Mock).mockResolvedValue(result);

    const output = await usecase.execute(mockInput);

    expect(output.id).toEqual(result.id.id);
    expect(output.name).toEqual(result.name);
    expect(output.document).toEqual(result.document);
    expect(output.address).toEqual(result.address);
    expect(mockInvoiceRepository.find).toHaveBeenCalledWith(mockInput.id);
  });
});