import express, { Express } from "express";
import { Sequelize } from "sequelize-typescript";
import { ClientModel } from "../../modules/client-adm/repository/client.model";
import { InvoiceItemsModel } from "../../modules/invoice/repository/invoice-items.model";
import { InvoiceModel } from "../../modules/invoice/repository/invoice.model";
import { ProductModel } from "../../modules/product-adm/repository/product.model";
import { checkoutRouter } from "./routes/checkout.route";
import { clientsRouter } from "./routes/clients.route";
import { invoiceRouter } from "./routes/invoice.route";
import { productsRouter } from "./routes/products.route";

export const app: Express = express();
app.use(express.json());
app.use('/products', productsRouter);
app.use('/clients', clientsRouter);
app.use('/checkout', checkoutRouter);
app.use('/invoice', invoiceRouter);

export let sequelize: Sequelize;

async function setupDb() {
  sequelize = new Sequelize({
    dialect: "sqlite",
    storage: ":memory:",
    logging: false,
  });
  await sequelize.addModels([ProductModel, ClientModel, InvoiceModel, InvoiceItemsModel]);
  await sequelize.sync();
}
setupDb();