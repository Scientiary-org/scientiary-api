import { Request, Router } from "express";
import { Doc } from "../../domain/entities/Doc";
import { Create } from "../../domain/useCases/docs/Create";
import { FetchAll } from "../../domain/useCases/docs/FetchAll";
import { FindByUser } from "../../domain/useCases/docs/FindByUser";
import { Delete } from "../../domain/useCases/docs/Delete";
import { FindById } from "../../domain/useCases/docs/FindById";
import { DocService } from "../services/doc_service";

export const DocsRouter = Router();

DocsRouter.post(
    "/users/:userId/doc",
    async (request: Request<{ userId: string }, {}, Doc, {}>, response) => {
        const { body: doc } = request;
        const { userId } = request.params;
        try {
            const create = new Create(new DocService());
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
);

DocsRouter.get(
    "/docs",
    async (_request, response) => {
        try {
            const fetchAll = new FetchAll(new DocService());
            const docs = await fetchAll.execute();
            return response.status(200).json(docs);
        } catch (error) {
            return response.status(500).json({
                status: 500,
                message: error instanceof Error ? error.message : "An error occurred while fetching docs",
                date: new Date(),
            });
        }
    }
);

DocsRouter.get(
    "/users/:userId/docs",
    async (request, response) => {
        const { userId } = request.params;
        try {
            const findByUser = new FindByUser(new DocService());
            const docs = await findByUser.execute(userId);
            return response.status(200).json(docs);
        } catch (error) {
            return response.status(500).json({
                status: 500,
                message: error instanceof Error ? error.message : "An error occurred while fetching docs by user",
                date: new Date(),
            });
        }
    }
);

DocsRouter.delete(
    "/docs/:docId",
    async (request, response) => {
        const { docId } = request.params;
        try {
            const deleteDoc = new Delete(new DocService());
            await deleteDoc.execute(docId);
            return response.status(200).json({
                status: 200,
                message: "Doc deleted successfully",
                date: new Date(),
            });
        } catch (error) {
            return response.status(500).json({
                status: 500,
                message: error instanceof Error ? error.message : "An error occurred while deleting doc",
                date: new Date(),
            });
        }
    }
);

DocsRouter.get(
    "/docs/:docId",
    async (request, response) => {
        const { docId } = request.params;
        try {
            const findById = new FindById(new DocService());
            const doc = await findById.execute(docId);
            if (!doc) {
                return response.status(404).json({
                    status: 404,
                    message: "Doc not found",
                    date: new Date(),
                });
            }
            return response.status(200).json(doc);
        } catch (error) {
            return response.status(500).json({
                status: 500,
                message: error instanceof Error ? error.message : "An error occurred while fetching doc by ID",
                date: new Date(),
            });
        }
    }
);
