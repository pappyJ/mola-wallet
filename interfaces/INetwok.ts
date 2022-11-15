import { NETWORKS } from "interfaces/IRpc";

export default interface INetwork {
  chainId: number;

  chainName: string;
  nativeCurrency: {
    name: string;
    symbol: string;
    decimals: number;
  };
  rpcUrls: string;
  blockExplorer: string;
}
