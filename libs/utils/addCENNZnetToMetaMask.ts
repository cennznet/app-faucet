export default async function addCENNZnetToMetaMask () {
  await global.ethereum.request({
    method: "wallet_addEthereumChain",
    params: [
      {
        chainId: "0xbb8",
        blockExplorerUrls: ["https://uncoverexplorer.com"],
        chainName: "CENNZnet Nikau",
        nativeCurrency: {
          name: "CPAY",
          symbol: "CPAY",
          decimals: 18,
        },
        rpcUrls: ["https://nikau.centrality.me/public"],
      },
    ],
  });
}