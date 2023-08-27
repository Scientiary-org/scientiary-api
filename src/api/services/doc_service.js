"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DocService = void 0;
var config_1 = require("../../../public/config/config");
var ethers_1 = require("ethers");
var Library_json_1 = require("../../../artifacts/contracts/Library.sol/Library.json");
var DocService = /** @class */ (function () {
    function DocService() {
    }
    DocService.prototype.create = function (newDoc) {
        return __awaiter(this, void 0, void 0, function () {
            var ethereum, provider, signer, LibraryContract, libraryTx;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        ethereum = window.ethereum;
                        if (!ethereum)
                            throw new Error("Ethreum object doesnt exist.");
                        provider = new ethers_1.ethers.BrowserProvider(ethereum);
                        return [4 /*yield*/, provider.getSigner()];
                    case 1:
                        signer = _a.sent();
                        LibraryContract = new ethers_1.ethers.Contract(config_1.contractAddress, Library_json_1.default.abi, signer);
                        return [4 /*yield*/, LibraryContract.addWork(newDoc.name, newDoc.year, newDoc.author, newDoc.ipfsHash)];
                    case 2:
                        libraryTx = _a.sent();
                        console.log(libraryTx);
                        return [2 /*return*/, libraryTx];
                }
            });
        });
    };
    DocService.prototype.fetchAll = function () {
        return __awaiter(this, void 0, void 0, function () {
            var ethereum, provider, signer, LibraryContract, works;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        ethereum = window.ethereum;
                        if (!ethereum)
                            throw new Error("Ethreum object doesnt exist.");
                        provider = new ethers_1.ethers.BrowserProvider(ethereum);
                        return [4 /*yield*/, provider.getSigner()];
                    case 1:
                        signer = _a.sent();
                        LibraryContract = new ethers_1.ethers.Contract(config_1.contractAddress, Library_json_1.default.abi, signer);
                        return [4 /*yield*/, LibraryContract.getWorkList()];
                    case 2:
                        works = _a.sent();
                        console.log(works);
                        return [2 /*return*/, works];
                }
            });
        });
    };
    DocService.prototype.findByUser = function (userId) {
        return __awaiter(this, void 0, void 0, function () {
            var ethereum, provider, signer, LibraryContract, worksByUser;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        ethereum = window.ethereum;
                        if (!ethereum)
                            throw new Error("Ethreum object doesnt exist.");
                        provider = new ethers_1.ethers.BrowserProvider(ethereum);
                        return [4 /*yield*/, provider.getSigner()];
                    case 1:
                        signer = _a.sent();
                        LibraryContract = new ethers_1.ethers.Contract(config_1.contractAddress, Library_json_1.default.abi, signer);
                        return [4 /*yield*/, LibraryContract.getWorksByAddress(userId)];
                    case 2:
                        worksByUser = _a.sent();
                        console.log(worksByUser);
                        return [2 /*return*/, worksByUser];
                }
            });
        });
    };
    DocService.prototype.delete = function (workId) {
        return __awaiter(this, void 0, void 0, function () {
            var ethereum, provider, signer, LibraryContract, deletedWork;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        ethereum = window.ethereum;
                        if (!ethereum)
                            throw new Error("Ethreum object doesnt exist.");
                        provider = new ethers_1.ethers.BrowserProvider(ethereum);
                        return [4 /*yield*/, provider.getSigner()];
                    case 1:
                        signer = _a.sent();
                        LibraryContract = new ethers_1.ethers.Contract(config_1.contractAddress, Library_json_1.default.abi, signer);
                        return [4 /*yield*/, LibraryContract.delete(workId)];
                    case 2:
                        deletedWork = _a.sent();
                        console.log(deletedWork);
                        return [2 /*return*/];
                }
            });
        });
    };
    DocService.prototype.findById = function (workId) {
        return __awaiter(this, void 0, void 0, function () {
            var ethereum, provider, signer, LibraryContract, foundWork;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        ethereum = window.ethereum;
                        if (!ethereum)
                            throw new Error("Ethreum object doesnt exist.");
                        provider = new ethers_1.ethers.BrowserProvider(ethereum);
                        return [4 /*yield*/, provider.getSigner()];
                    case 1:
                        signer = _a.sent();
                        LibraryContract = new ethers_1.ethers.Contract(config_1.contractAddress, Library_json_1.default.abi, signer);
                        return [4 /*yield*/, LibraryContract.getWorkById(workId)];
                    case 2:
                        foundWork = _a.sent();
                        console.log(foundWork);
                        return [2 /*return*/, foundWork];
                }
            });
        });
    };
    return DocService;
}());
exports.DocService = DocService;
function performDocumentOperations() {
    return __awaiter(this, void 0, void 0, function () {
        var ethereum, chainId, sepoliaChainId, accounts, error_1, docService, doc1, createdDoc1, doc2, createdDoc2, allDocs, docToDelete, updatedDocs, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 11, , 12]);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 4, , 5]);
                    ethereum = window.ethereum;
                    if (!ethereum) {
                        console.log("Metamask not detected");
                        return [2 /*return*/];
                    }
                    return [4 /*yield*/, ethereum.request({ method: 'eth_chainId' })];
                case 2:
                    chainId = _a.sent();
                    sepoliaChainId = '0xaa36a7';
                    if (chainId !== sepoliaChainId) {
                        alert("You are not connected to Sepolia network");
                        return [2 /*return*/];
                    }
                    return [4 /*yield*/, ethereum.request({ method: 'eth_requestAccounts' })];
                case 3:
                    accounts = _a.sent();
                    return [2 /*return*/, accounts[0]];
                case 4:
                    error_1 = _a.sent();
                    console.log("Error connecting to Metamask:", error_1);
                    return [3 /*break*/, 5];
                case 5:
                    docService = new DocService();
                    doc1 = { name: "Doc 1", year: "2023", author: "Author 1", ipfsHash: "ipfs-hash-1" };
                    return [4 /*yield*/, docService.create(doc1)];
                case 6:
                    createdDoc1 = _a.sent();
                    console.log("Created Document 1:", createdDoc1);
                    doc2 = { name: "Doc 2", year: "2023", author: "Author 2", ipfsHash: "ipfs-hash-2" };
                    return [4 /*yield*/, docService.create(doc2)];
                case 7:
                    createdDoc2 = _a.sent();
                    console.log("Created Document 2:", createdDoc2);
                    return [4 /*yield*/, docService.fetchAll()];
                case 8:
                    allDocs = (_a.sent()) || [];
                    console.log("All Documents:", allDocs);
                    docToDelete = allDocs[0];
                    return [4 /*yield*/, docService.delete(docToDelete._id || "")];
                case 9:
                    _a.sent();
                    console.log("Document deleted successfully.");
                    return [4 /*yield*/, docService.fetchAll()];
                case 10:
                    updatedDocs = _a.sent();
                    console.log("Documents after deletion:", updatedDocs);
                    return [3 /*break*/, 12];
                case 11:
                    error_2 = _a.sent();
                    console.error("Error:", error_2);
                    return [3 /*break*/, 12];
                case 12: return [2 /*return*/];
            }
        });
    });
}
performDocumentOperations();
