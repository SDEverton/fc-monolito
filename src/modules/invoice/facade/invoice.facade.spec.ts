import Id from '../../@shared/domain/value-object/id.value-object';
import InvoiceItems from '../domain/invoice-items.entity';
import InvoiceFacade, { UseCaseProps } from './invoice.facade';
import { FindInvoiceFacadeInputDTO, GenerateInvoiceFacadeInputDto } from './invoice.facade.interface';

const mockInput = {
  name: 'any_name',
  document: 'any_document',
  street: 'any_street',
  number: 'any_number',
  complement: 'any_complement',
  city: 'any_city',
  state: 'any_state',
  zipCode: 'any_zipCode',
  items: [
    new InvoiceItems({
      id: new Id('any_id'),
      name: 'any_name',
      price: 1,
    }),
  ],
};

describe('InvoiceFacade', () => {
  let facade: InvoiceFacade;
  let mockUseCaseProps: UseCaseProps;
  let mockGenerateInput: GenerateInvoiceFacadeInputDto;
  let mockFindInput: FindInvoiceFacadeInputDTO;
  
  mockFindInput = {
    id: 'any_id',
  };

  beforeEach(() => {
    mockUseCaseProps = {
      findUsecase: {
        execute: jest.fn(),
      },
      generateUsecase: {
        execute: jest.fn(),
      },
    };
    mockGenerateInput = mockInput;

    facade = new InvoiceFacade(mockUseCaseProps);
  });

  it('should generate an invoice', async () => {
    
    (mockUseCaseProps.generateUsecase.execute as jest.Mock).mockResolvedValue(mockInput);

    const output = await facade.generate(mockGenerateInput);

    expect(output).toEqual(mockInput);
    expect(mockUseCaseProps.generateUsecase.execute).toHaveBeenCalledWith(mockGenerateInput);
  });

  it('should find an invoice', async () => {
    const result = {
      id: 'any_id',
      name: 'any_name',
      document: 'any_document',
      street: 'any_street',
      number: 'any_number',
      complement: 'any_complement',
      city: 'any_city',
      state: 'any_state',
      zipCode: 'any_zipCode',
      items: [
        new InvoiceItems({
          id: new Id('any_id'),
          name: 'any_name',
          price: 1,
        }),
      ],
      total: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    (mockUseCaseProps.findUsecase.execute as jest.Mock).mockResolvedValue(result);

    const output = await facade.find(mockFindInput);

    expect(output).toEqual(result);
    expect(mockUseCaseProps.findUsecase.execute).toHaveBeenCalledWith(mockFindInput);
  });
});