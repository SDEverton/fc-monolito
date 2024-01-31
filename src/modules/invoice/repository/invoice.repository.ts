import Address from "../../@shared/domain/value-object/address";
import Id from "../../@shared/domain/value-object/id.value-object";
import InvoiceItems from "../domain/invoice-items.entity";

import Invoice from "../domain/invoice.entity";

import InvoiceGateway from "../gateway/invoice.gateway";
import { InvoiceItemsModel } from "./invoice-items.model";
import { InvoiceModel } from "./invoice.model";

export default class InvoiceRepository implements InvoiceGateway {
  async generate(invoice: Invoice): Promise<void> {
    const response = await InvoiceModel.create({
      id: invoice.id.id,
      name: invoice.name,
      document: invoice.document,
      street: invoice.address.street,
      number: invoice.address.number,
      complement: invoice.address.complement,
      city: invoice.address.city,
      state: invoice.address.state,
      zipcode: invoice.address.zipCode,
      items: invoice.items,
      total: invoice.total,
      createdAt: invoice.createdAt,
      updatedAt: invoice.updatedAt,
    });

    if (!response) {
      throw new Error("Error on create invoice");
    }

    await InvoiceItemsModel.bulkCreate(
      invoice.items.map((item) => ({
        id: item.id.id,
        name: item.name,
        price: item.price,
        invoice_id: invoice.id.id,
      }))
    );
  }

  async find(id: string): Promise<Invoice> {
    const invoice = await InvoiceModel.findOne({
      where: { id },
      include: [InvoiceItemsModel],
    });

    if (!invoice) {
      throw new Error("Invoice not found");
    }

    return new Invoice({
      id: new Id(invoice['dataValues'].id),
      name: invoice['dataValues'].name,
      document: invoice['dataValues'].document,
      address: new Address(
        invoice['dataValues'].street,
        invoice['dataValues'].number,
        invoice['dataValues'].complement,
        invoice['dataValues'].city,
        invoice['dataValues'].state,
        invoice['dataValues'].zipcode
      ),
      items: invoice['dataValues'].invoiceItems.map((item: any) => new InvoiceItems({
        id: item['dataValues'].id,
        name: item['dataValues'].name,
        price: item['dataValues'].price,
      })),
      createdAt: invoice['dataValues'].createdAt,
      updatedAt: invoice['dataValues'].createdAt,
    });
  }
}
