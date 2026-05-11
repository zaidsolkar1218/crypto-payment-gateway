async function main() {
    const [deployer] = await ethers.getSigners();
    console.log("Deploying with wallet:", deployer.address);
  
    const PaymentGateway = await ethers.getContractFactory("PaymentGateway");
  
    const paymentGateway = await PaymentGateway.deploy();
  
    await paymentGateway.waitForDeployment();
  
    console.log("PaymentGateway deployed to:", await paymentGateway.getAddress());
  }
  
  main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });