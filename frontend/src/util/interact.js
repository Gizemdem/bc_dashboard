// export const progressPaymentContract;
require('dotenv').config();
const alchemyKey = process.env.REACT_APP_ALCHEMY_KEY;
const { createAlchemyWeb3 } = require("@alch/alchemy-web3");
const web3 = createAlchemyWeb3(alchemyKey); 
const contractABI = require("../contract-abi.json");
const contractAddress = "0xd86821A4fc330f485d3EcF10f9599627008BBdcA";

export const progressPaymentContract = new web3.eth.Contract(
    contractABI,
    contractAddress
);
//metamask connection
export const connectWallet = async () => {
if (window.ethereum) {
    try {
    const addressArray = await window.ethereum.request({
        method: "eth_requestAccounts",
    });
    const obj = {
        status: "👆🏽 Write a message in the text-field above.",
        address: addressArray[0],
    };
    return obj;
    } catch (err) {
    return {
        address: "",
        status: "😥 " + err.message,
    };
    }
} else {
    return {
    address: "",
    status: (
        <span>
        <p>
            {" "}
            🦊{" "}
            <a target="_blank" href={`https://metamask.io/download`} rel="noreferrer">
            You must install Metamask, a virtual Ethereum wallet, in your
            browser.
            </a>
        </p>
        </span>
    ),
    };
}
};

export const getCurrentWalletConnected = async () => {
    if (window.ethereum) {
      try {
        const addressArray = await window.ethereum.request({
          method: "eth_accounts",
        });
        if (addressArray.length > 0) {
          return {
            address: addressArray[0],
            status: "👆🏽 Write a message in the text-field above.",
          };
        } else {
          return {
            address: "",
            status: "🦊 Connect to Metamask using the top right button.",
          };
        }
      } catch (err) {
        return {
          address: "",
          status: "😥 " + err.message,
        };
      }
    } else {
      return {
        address: "",
        status: (
          <span>
            <p>
              {" "}
              🦊{" "}
              <a target="_blank" href={`https://metamask.io/download`} rel="noreferrer">
                You must install Metamask, a virtual Ethereum wallet, in your
                browser.
              </a>
            </p>
          </span>
        ),
      };
    }
  };

export const setConstructionElements = async (address, elementIDs, elementcosts) => {
  //set up transaction parameters
 const transactionParameters = {
    to: contractAddress, // Required except during contract publications.
    from: address, // must match user's active address.
    data: progressPaymentContract.methods.setConstructionElements(elementIDs,elementcosts).encodeABI(),
  };

//sign the transaction
  try {
    const txHash = await window.ethereum.request({
      method: "eth_sendTransaction",
      params: [transactionParameters],
    });
    return {
      status: (
        <span>
          ✅{" "}
          <a target="_blank" href={`https://goerli.etherscan.io/tx/${txHash}`} rel="noreferrer">
            View the status of your transaction on Etherscan!
          </a>
          <br />
          ℹ️ Once the transaction is verified by the network, the message will
          be updated automatically.
        </span>
      ),
    };
  } catch (error) {
    return {
      status: "😥 " + error.message,
    };
  }
};

