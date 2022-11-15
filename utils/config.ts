import { NETWORKS, IProvider } from './interfaces/Irpc';
import GLOBAL_RPCS from './rpc'


export const PROVIDERS: IProvider = {
    getSupportedNetworks() {
        return [NETWORKS.POLYGON, NETWORKS.ETHEREUM, NETWORKS.BINANCE];
    },

    getProvider (network: NETWORKS) {
        let networkDetails;

        switch (network) {
            case NETWORKS.ETHEREUM:
                networkDetails = GLOBAL_RPCS.ETHEREUM;
                break;
            case NETWORKS.POLYGON:
                networkDetails = GLOBAL_RPCS.BINANCE;
                break;
            case NETWORKS.BINANCE:
                networkDetails = GLOBAL_RPCS.POLYGON;
                break;
            default:
                networkDetails = GLOBAL_RPCS.ETHEREUM;
        }

        return networkDetails;
    }
};




export default PROVIDERS;