// interact.js

const API_KEY = process.env.API_KEY;
const PRIVATE_KEY = process.env.PRIVATE_KEY;
const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS;

// For Hardhat 
const contract = require("../artifacts/contracts/ProgressPayment.sol/ProgressPayment.json");
console.log(JSON.stringify(contract.abi));// interact.js

// Provider
const alchemyProvider = new ethers.providers.AlchemyProvider(network="goerli", API_KEY);

// Signer
const signer = new ethers.Wallet(PRIVATE_KEY, alchemyProvider);

// Contract
const progressPaymentContract = new ethers.Contract(CONTRACT_ADDRESS, contract.abi, signer);

async function main(){
    const objectIDsArray =  await progressPaymentContract.setConstructionElements(["a", "b","c"], [50,30,40]);
    console.log("Element List" + objectIDsArray);

    const objectPrice = await progressPaymentContract.checkPriceById("b");
    console.log("b price is" + objectPrice);
}
main();