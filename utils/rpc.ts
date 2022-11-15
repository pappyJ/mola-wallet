import { NETWORKS } from './interfaces/IRpc';

export default  {

    POLYGON: {
        network: NETWORKS.POLYGON,
        jsonRpc:process.env.polygon_rpc
    },

    ETHEREUM: {
        network: NETWORKS.ETHEREUM,
        jsonRpc: process.env.ethereum_rpc
    },

    BINANCE: {
        network: NETWORKS.BINANCE,
        jsonRpc: process.env.binance_rpc
    }

}