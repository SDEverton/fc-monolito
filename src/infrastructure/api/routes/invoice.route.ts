import { Request, Response, Router } from "express";
import InvoiceRepository from "../../../modules/invoice/repository/invoice.repository";
import FindInvoiceUseCase from "../../../modules/invoice/usecase/find-invoice/find-invoice.usecase";

export const invoiceRouter = Router();

invoiceRouter.get("/:id", async (req: Request, res: Response) => {
  const usecase = new FindInvoiceUseCase(new InvoiceRepository());
  try {
    const invoiceDto = {
      id: req.params.id,
    }

    const products = await usecase.execute(invoiceDto);
    res.status(200).send(products);
  } catch (error) {
    res.status(500).send(error);
  }
});