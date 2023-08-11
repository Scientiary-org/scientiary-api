const {expect} = require("chai");
const {ethers} = require("hardhat");

function getRandomInt(min: number, max: number){
    return Math.floor(Math.random() * (max - min)) + min;
}

describe("Library Contract", function(){
    let Library;
    let library: { addWork: (arg0: string, arg1: string, arg2: string) => any; getWorkList: () => any; };
    let owner: { address: any; };

    const numWorks = 4;

    let workList: { name: string; year: string; author: string; }[];


    function verifyWork(workChain: {
        author: any; name: any; year: { toString: () => any; }; 
}, work: { name: any; year: { toString: () => any; }; author: any; }){
       expect(work.name).to.equal(workChain.name)
       expect(work.year.toString()).to.equal(workChain.year.toString());
       expect(work.author).to.equal(workChain.author);
    }

    function verifyWorkList(worksFromChain: string | any[], workList: string | any[]){
        expect(worksFromChain.length).to.not.equal(0);
        expect(worksFromChain.length).to.equal(workList.length);

        for(let i=0; i < workList.length; i++)
        {
            const workChain = worksFromChain[i];
            const work = workList[i];
            verifyWork(workChain, work);
        }
    }

    this.beforeEach(async function(){
        Library = await ethers.getContractFactory("Library");
        library = await Library.deploy();
        [owner] = await ethers.getSigners();

        workList = [];

        for(let i = 0; i < numWorks; i++){
            let work = {
                'name': getRandomInt(1, 1000).toString(),
                'year': getRandomInt(1800, 2023).toString(),
                'author': getRandomInt(1, 1000).toString()
            };

            await library.addWork(work.name, work.year, work.author);
            workList.push(work);
        }
    });

    describe("Add a Work", function(){
        it("Should emit AddWork event", async function(){
            let work = {
                'name': getRandomInt(1, 1000).toString(),
                'year': getRandomInt(1800, 2023).toString(),
                'author': getRandomInt(1, 1000).toString()
            };

            await expect(await library.addWork(work.name, work.year, work.author)).to.emit(library, "AddWork").withArgs(owner.address, numWorks);
            
        }); 

    });

    describe("Get Works", function(){
        it("Should return the correct works", async function(){
            const worksFromChain = await library.getWorkList();
            expect(worksFromChain.length).to.equal(numWorks);
            verifyWorkList(worksFromChain, workList);
        })
    });

})