import { Doc } from "../entities/Doc";

export interface IDocService {
    create(newDoc: Doc, userId: string): Promise<Doc | undefined>;
    // findByUser( userId: string): Promise<Doc | undefined>;
    // fetchAll(): Promise<Doc[]>;
    // delete(id: string): Promise<void>;
    // findById(id: string): Promise<Doc | undefined>;
}
