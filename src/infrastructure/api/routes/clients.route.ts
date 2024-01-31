import { Request, Response, Router } from "express";
import ClientRepository from "../../../modules/client-adm/repository/client.repository";
import AddClientUseCase from "../../../modules/client-adm/usecase/add-client/add-client.usecase";

export const clientsRouter = Router();

clientsRouter.post("/", async (req: Request, res: Response) => {
  const usecase = new AddClientUseCase(new ClientRepository());
  try {
    const clientsDto = {
      name: req.body.name,
      email: req.body.email,
      document: req.body.document,
      address: req.body.address,  
    }

    const products = await usecase.execute(clientsDto);
    res.status(200).send(products);
  } catch (error) {
    res.status(500).send(error);
  }
});