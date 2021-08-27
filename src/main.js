const Web3 = require("web3");
const ethers = require("ethers");
const ethProvider = require("eth-provider");

const run = async () => {
  // we use 'eth-provider' so frame works as expected
  // unfortunatly it returns an web3 provider so we wrap this again
  // to make it work with ethers
  const provider = new ethers.providers.Web3Provider(
    new Web3(ethProvider())._provider
  );
  const signer = provider.getSigner();

  const token = new ethers.Contract(
    process.argv[2],
    ["function transfer(address recipient, uint256 amount) external"],
    signer
  );
  const tx = await token.transfer(process.argv[3], process.argv[4]);
  console.log(tx);
};

run()
  .then(() => process.exit(0))
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });
