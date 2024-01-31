import Address from "../../@shared/domain/value-object/address";
import InvoiceItems from "../domain/invoice-items.entity";

export interface FindInvoiceFacadeInputDTO {
  id: string;
}

export interface FindInvoiceFacadeOutputDTO {
  id: string;
  name: string;
  document: string;
  address: Address;
  items: InvoiceItems[];
  total: number;
  createdAt: Date;
}

export interface GenerateInvoiceFacadeInputDto {
  name: string;
  document: string;
  street: string;
  number: string;
  complement: string;
  city: string;
  state: string;
  zipCode: string;
  items: InvoiceItems[];
}

export interface GenerateInvoiceFacadeOutputDto {
  id: string;
  name: string;
  document: string;
  street: string;
  number: string;
  complement: string;
  city: string;
  state: string;
  zipCode: string;
  items: InvoiceItems[];
  total: number;
}

export default interface InvoiceFacadeInterface {
  find(input: FindInvoiceFacadeInputDTO): Promise<FindInvoiceFacadeOutputDTO>;
  generate(input: GenerateInvoiceFacadeInputDto): Promise<GenerateInvoiceFacadeOutputDto>;
}
