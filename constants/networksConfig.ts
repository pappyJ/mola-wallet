import { NETWORKS } from "interfaces/IRpc";

const networksConfig = {
  [NETWORKS.ETHEREUM]: {
    chainId: Number(process.env.NEXT_PUBLIC_ETH_CHAIN_ID)!,

    chainName: process.env.NEXT_PUBLIC_ETH_NAME!,
    nativeCurrency: {
      name: NETWORKS.ETHEREUM,
      symbol: process.env.NEXT_PUBLIC_ETH_SYMBOL!,
      decimals:Number(process.env.NEXT_PUBLIC_ETH_DECIMAL)!,
    },
    rpcUrls: process.env.NEXT_PUBLIC_NEXT_PUBLIC_ETHEREUM_RPC!,
    blockExplorer: process.env.NEXT_PUBLIC_ETH_EXPLORER!,
  },

  [NETWORKS.BINANCE]: {
    chainId: Number(process.env.NEXT_PUBLIC_BSC_CHAIN_ID)!,

    chainName: process.env.NEXT_PUBLIC_BSC_NAME!,
    nativeCurrency: {
      name: NETWORKS.BINANCE!,
      symbol: process.env.NEXT_PUBLIC_BSC_SYMBOL!,
      decimals: Number(process.env.NEXT_PUBLIC_BSC_DECIMAL)!,
    },
    rpcUrls: process.env.NEXT_PUBLIC_BINANCE_RPC!,
    blockExplorer: process.env.NEXT_PUBLIC_BSC_EXPLORER!,
  },

  [NETWORKS.POLYGON]: {
    chainId: Number(process.env.NEXT_PUBLIC_POLYGON_CHAIN_ID)!,

    chainName: process.env.NEXT_PUBLIC_POLYGON_NAME!,
    nativeCurrency: {
      name: NETWORKS.POLYGON!,
      symbol: process.env.NEXT_PUBLIC_POLYGON_SYMBOL!,
      decimals: Number(process.env.NEXT_PUBLIC_POLYGON_DECIMAL)!,
    },
    rpcUrls: process.env.NEXT_PUBLIC_POLYGON_RPC!,
    blockExplorer: process.env.NEXT_PUBLIC_POLYGON_EXPLORER!,
  },
};

export default networksConfig;