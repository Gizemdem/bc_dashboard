async function main() {
    const ProgressPayment = await ethers.getContractFactory("ProgressPayment");
 
    // Start deployment, returning a promise that resolves to a contract object
    const progress_payment = await ProgressPayment.deploy();   
    console.log("Contract deployed to address:", progress_payment.address);
 }
 
 main()
   .then(() => process.exit(0))
   .catch(error => {
     console.error(error);
     process.exit(1);
   });