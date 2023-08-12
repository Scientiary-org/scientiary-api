import { IDocService } from "../../ports/idoc_service";

export class Delete {
  constructor(private readonly docService: IDocService) {}

  async execute(workId: string): Promise<void> {
    await this.docService.delete(workId);
  }
}
