import { Doc } from "../../domain/entities/Doc";
import { IDocService } from "../../domain/ports/idoc_service";
import { contractAddress } from "../../../public/config/config";
import { ethers } from 'ethers';
import Library from '../../../artifacts/contracts/Library.sol/Library.json'

declare let window: any;

export class DocService implements IDocService {

    async create(newDoc: Doc): Promise<Doc | undefined> {
            const {ethereum} = window;
            if(!ethereum) throw new Error("Ethreum object doesnt exist.");
            const provider = new ethers.BrowserProvider(ethereum);
            const signer = await provider.getSigner(); 
            const LibraryContract = new ethers.Contract(contractAddress,Library.abi,signer);
            let libraryTx = await LibraryContract.addWork(newDoc.name, newDoc.year, newDoc.author, newDoc.ipfsHash);
            console.log(libraryTx);

        return libraryTx;
    }

    async fetchAll(): Promise<Doc[] | undefined> {
            const {ethereum} = window;
            if(!ethereum) throw new Error("Ethreum object doesnt exist.");
            const provider = new ethers.BrowserProvider(ethereum);
            const signer = await provider.getSigner();
            const LibraryContract = new ethers.Contract(contractAddress,Library.abi,signer);
            let works = await LibraryContract.getWorkList();
            console.log(works);

        return works;
    }

    async findByUser(userId: string): Promise<Doc[] | undefined> {
            const {ethereum} = window;
            if(!ethereum) throw new Error("Ethreum object doesnt exist.");
            const provider = new ethers.BrowserProvider(ethereum);
            const signer = await provider.getSigner();
            const LibraryContract = new ethers.Contract(contractAddress,Library.abi,signer);
            let worksByUser = await LibraryContract.getWorksByAddress(userId);
            console.log(worksByUser);

        return worksByUser;
    }

    async delete(workId: string): Promise<void> {
            const {ethereum} = window;
            if(!ethereum) throw new Error("Ethreum object doesnt exist.");
            const provider = new ethers.BrowserProvider(ethereum);
            const signer = await provider.getSigner();
            const LibraryContract = new ethers.Contract(contractAddress,Library.abi,signer);
            let deletedWork = await LibraryContract.deleteWork(workId);
            console.log(deletedWork);

    }
    
    async findById(workId: string): Promise<Doc | undefined> {
            const {ethereum} = window;
            if(!ethereum) throw new Error("Ethreum object doesnt exist.");
            const provider = new ethers.BrowserProvider(ethereum);
            const signer = await provider.getSigner();
            const LibraryContract = new ethers.Contract(contractAddress,Library.abi,signer);
            let foundWork = await LibraryContract.getWorkById(workId);
            console.log(foundWork);

        return foundWork;
    }
}

