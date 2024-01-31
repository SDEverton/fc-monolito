import { Request, Response, Router } from "express";
import ProductRepository from "../../../modules/product-adm/repository/product.repository";
import CheckStockUseCase from "../../../modules/product-adm/usecase/check-stock/check-stock.usecase";

export const checkoutRouter = Router();

checkoutRouter.post("/", async (req: Request, res: Response) => {
  const usecase = new CheckStockUseCase(new ProductRepository());
  try {
    const clientsDto = {
      productId: req.body.productId,
    }

    const products = await usecase.execute(clientsDto);
    res.status(200).send(products);
  } catch (error) {
    res.status(500).send(error);
  }
});