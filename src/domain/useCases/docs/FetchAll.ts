import { Doc } from "../../entities/Doc";
import { IDocService } from "../../ports/idoc_service";

export class FetchAll {
  constructor(private readonly docService: IDocService) {}

  async execute(): Promise<Doc[] | undefined> {
    return this.docService.fetchAll();
  }
}
