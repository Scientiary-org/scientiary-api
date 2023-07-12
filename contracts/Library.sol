// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract Library {

    struct Work {
        uint id;
        string name;
        uint year;
        string author;
    }

    Work[] private workList;

    mapping(uint256 => address) workToOwner;

    event AddWork(address recipient, uint workId);

    function addWork(string memory name, uint16 year, string memory author) external {
        uint workId = workList.length;
        workList.push(Work(workId, name, year, author));
        workToOwner[workId] = msg.sender;
        emit AddWork(msg.sender, workId);
    }

    function getWorkList() public view returns (Work[] memory){
        Work[] memory temporary = new Work[](workList.length);

        uint counter = 0;

        for(uint i=0; i<workList.length; i++){
            if(workToOwner[i] == msg.sender){
                temporary[counter] = workList[i];
                counter++;
            }
        }

        Work[] memory result = new Work[](counter);
        for(uint i=0; i<counter; i++){
            result[i] = temporary[i];
        }

        return result;
    }

}