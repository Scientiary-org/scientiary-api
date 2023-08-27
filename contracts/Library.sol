// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

contract Library {
    struct Work {
        uint id;
        string name;
        uint year;
        string author;
        string ipfsHash;
    }

    Work[] public workList;
    mapping(uint256 => address) workToOwner;
    mapping(address => uint256[]) private worksByAddress; // Store the list of work IDs added by each address
    mapping(address => mapping(uint256 => bool)) private addedWorkIds; // Keep track of added works per address

    event DeleteWork(address recipient, uint workId);

    function addWork(string memory name, uint16 year, string memory author, string memory ipfsHash) external {
        uint workId = workList.length;
        workList.push(Work(workId, name, year, author, ipfsHash));
        workToOwner[workId] = msg.sender;

        // Add the work ID to the sender's addedWorkIds mapping
        addedWorkIds[msg.sender][workId] = true;
        // Add the work ID to the sender's worksByAddress list
        worksByAddress[msg.sender].push(workId);
    }

    function getWorksByAddress(address _address) public view returns (Work[] memory) {
        uint256[] memory workIds = worksByAddress[_address];
        Work[] memory works = new Work[](workIds.length);

        uint256 validWorkCount = 0;

        for (uint i = 0; i < workIds.length; i++) {
            uint256 workId = workIds[i];

            // Check if the work ID is within the range of the workList array
            if (workId < workList.length) {
                // Check if the work ID is not added already
                if (addedWorkIds[_address][workId]) {
                    works[validWorkCount] = workList[workId];
                    validWorkCount++;
                }
            }
        }

        // Resize the works array to exclude any uninitialized elements
        if (validWorkCount < workIds.length) {
            assembly {
                mstore(works, validWorkCount)
            }
        }

        return works;
    }

    function getWorkById(uint256 workId) public view returns (Work memory) {
        require(workId < workList.length, "Invalid work ID");
        return workList[workId];
    }

    function deleteWork(uint256 workId) external {
        require(workId < workList.length, "Invalid work ID");

        delete workList[workId];
        delete workToOwner[workId];
        delete addedWorkIds[msg.sender][workId];

        // Remove the work ID from the sender's worksByAddress list
        uint256[] storage workIds = worksByAddress[msg.sender];
        for (uint256 i = 0; i < workIds.length; i++) {
            if (workIds[i] == workId) {
                workIds[i] = workIds[workIds.length - 1];
                workIds.pop();
                break;
            }
        }

        emit DeleteWork(msg.sender, workId);
    }

    function getWorkList() public view returns (Work[] memory) {
        return workList;
    }

    
}

