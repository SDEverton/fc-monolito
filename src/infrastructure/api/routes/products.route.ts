import { Request, Response, Router } from "express";
import ProductRepository from "../../../modules/product-adm/repository/product.repository";
import AddProductUseCase from "../../../modules/product-adm/usecase/add-product/add-product.usecase";

export const productsRouter = Router();

productsRouter.post("/", async (req: Request, res: Response) => {
  const usecase = new AddProductUseCase(new ProductRepository());
  try {
    const productsDto = {
      name: req.body.name,
      description: req.body.description,
      purchasePrice: req.body.purchasePrice,
      stock: req.body.stock,
    }

    const products = await usecase.execute(productsDto);
    res.status(200).send(products);
  } catch (error) {
    res.status(500).send(error);
  }
});