import { NETWORKS } from 'interfaces/IRpc';

export default  {

    POLYGON: {
        network: NETWORKS.POLYGON,
        jsonRpc:process.env.NEXT_PUBLIC_POLYGON_RPC
    },

    ETHEREUM: {
        network: NETWORKS.ETHEREUM,
        jsonRpc: process.env.NEXT_PUBLIC_ETHEREUM_RPC
    },

    BINANCE: {
        network: NETWORKS.BINANCE,
        jsonRpc: process.env.NEXT_PUBLIC_BINANCE_RPC
    }

}