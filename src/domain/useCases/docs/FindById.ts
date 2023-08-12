import { Doc } from "../../entities/Doc";
import { IDocService } from "../../ports/idoc_service";

export class FindById {
  constructor(private readonly docService: IDocService) {}

  async execute(workId: string): Promise<Doc | undefined> {
    return this.docService.findById(workId);
  }
}
