
import { Doc } from "../../domain/entities/Doc";
import { IDocService } from "../../domain/ports/idoc_service";

export class DocService implements IDocService {

    async create(newDoc: Doc, userId: string): Promise<Doc | undefined> {
        
        return createdDoc;
    }
}