

const Wallet = async() => {
    if(typeof window != "undefined" && typeof window.ethereum != "undefined"){
        try {
            // Metamask is installed
            const accounts = await window.ethereum.request({method:"eth_requestAccounts"})
            console.log(accounts[0]);
        } catch (err) {
            console.error(err.message);
        }
    } else {
        // Metamask is not install
        console.log("please install metamask")
    }
};
export default Wallet