import { Doc } from "../../entities/Doc";
import { IDocService } from "../../ports/idoc_service";

export class FindByUser {
  constructor(private readonly docService: IDocService) {}

  async execute(userId: string): Promise<Doc[] | undefined> {
    return this.docService.findByUser(userId);
  }
}
