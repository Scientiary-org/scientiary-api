import { Doc } from "../../domain/entities/Doc";
import { IDocService } from "../../domain/ports/idoc_service";
import {ethers} from "ethers";
import { contractAddress } from "../../../public/config/config"

declare let window: any;


export class DocService implements IDocService {

    async create(newDoc: Doc, userId: string): Promise<Doc | undefined> {
            const {ethereum} = window;
            if(!ethereum) throw new Error("Ethreum object doesnt exist.");
            const provider = new ethers.providers.Web3Provider(ethereum);
            const signer = provider.getSigner(); 
            const LibraryContract = new ethers.Contract(contractAddress,Library.abi,signer);
            let libraryTx = await LibraryContract.addWork(newDoc.name, newDoc.year, newDoc.author, newDoc.ipfsHash);

        return libraryTx;
    }
}