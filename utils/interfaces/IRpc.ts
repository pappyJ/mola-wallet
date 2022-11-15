
export enum NETWORKS { ETHEREUM = "ETHEREUM" , POLYGON = "POLYGON" , BINANCE = "BINANCE"};

export interface IProvider {
    getSupportedNetworks: () =>  NETWORKS[];

    getProvider: (network: NETWORKS) => {
        network: NETWORKS,
        jsonRpc: any
    };
}