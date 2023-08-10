import { Request, Router } from "express";

import { Doc } from "../../domain/entities/Doc";
import { Create } from "../../domain/useCases/docs/Create";
import { IDocService } from "../../domain/ports/idoc_service";


export const DocsRouter = Router();

DocsRouter.post(
    "/users/:userId/doc",
    async (request: Request<{userId: string}, {}, Doc, {}>, response) => {
        const { body: doc } = request;
        const {userId} = request.params;
        try {
            const create = new Create()
            const registeredDoc = await create.execute(doc, userId)
            return response.status(200).json(registeredDoc);
        } catch (error: any) {
            return response.status(400).json({
              status: 400,
              message: error?.message || "Doc was not registered",
              date: new Date(),
            });
          }
    }
)