import { Doc } from "../../entities/Doc";
import { IDocService } from "../../ports/idoc_service";

export class Create {
  constructor(private readonly registerDocService: IDocService) {}

  async execute(newDoc: Doc, userId: string): Promise<Doc | undefined> {
    return this.registerDocService.create(newDoc, userId);
  }
}
