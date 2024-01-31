import InvoiceGateway from '../../gateway/invoice.gateway';
import { GenerateInvoiceUseCaseInputDto } from './generate-invoice.dto';
import GenerateInvoiceUseCase from './generate-invoice.usecase';

describe('GenerateInvoiceUseCase', () => {
  let usecase: GenerateInvoiceUseCase;
  let mockInvoiceRepository: InvoiceGateway;
  let mockInput: GenerateInvoiceUseCaseInputDto;

  beforeEach(() => {
    mockInvoiceRepository = {
      generate: jest.fn(),
      find: jest.fn(),
    };
    mockInput = {
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
    };

    usecase = new GenerateInvoiceUseCase(mockInvoiceRepository);
  });

  it('should generate an invoice', async () => {
    const result = {
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
      ],
      total: 10
    };
    (mockInvoiceRepository.generate as jest.Mock).mockResolvedValue(result);

    const output = await usecase.execute(mockInput);

    expect(output.city).toEqual(result.city);
    expect(output.complement).toEqual(result.complement);
    expect(output.document).toEqual(result.document);
    expect(output.name).toEqual(result.name);
    expect(output.number).toEqual(result.number);
    expect(output).toHaveProperty('id');
    expect(mockInvoiceRepository.generate).toHaveBeenCalled();
  });
});