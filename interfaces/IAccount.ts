export interface IAccount {
  address: string;
  balance: number;
  balanceFiat: number;
  fiat: string;
  privateKey: string;
  addressList?: string[];
}
