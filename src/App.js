import React, { useState } from 'react';
import Web3 from "web3";
import WalletConnectProvider from "@walletconnect/web3-provider";

function App() {
  const provider = new WalletConnectProvider({
    infuraId: "12c6b7cde8a74882bb675653d166a2bf", // Required
  });
  
  //  Enable session (triggers QR Code modal)
  
  
  //  Create Web3
  const [account,setAccount] = useState(null);

  const getProviderEnable = async () => {
    await provider.enable();
    const web3 = new Web3(provider);
    console.log(web3);
    const accounts = await web3.eth.getAccounts();

    console.log(accounts);
    setAccount(accounts[0]);
    // Subscribe to accounts change
  provider.on("accountsChanged", (accounts) => {
    console.log(accounts);
  });

  // Subscribe to chainId change
  provider.on("chainChanged", (chainId) => {
    console.log(chainId);
  });

  // Subscribe to session connection
  provider.on("connect", () => {
    console.log("connect");
  });

  // Subscribe to session disconnection
  provider.on("disconnect", (code, reason) => {
    console.log(code, reason);
  });
  }
  return (
    <div>
      <button onClick={getProviderEnable}>Activate</button>
      {account && <div>Account : {account}</div>}
    </div>
  );
}

export default App;
