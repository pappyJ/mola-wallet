import Web3 from "web3";
import { hdkey } from 'ethereumjs-wallet';
import { generateMnemonic, mnemonicToSeedSync } from 'bip39';
import saveFile from 'js-file-download'
import PROVIDERS from './config';
import { NETWORKS } from './Irpc';

let web3: Web3;

export const getWeb3Connection = (network: NETWORKS) => {
    const selectProvider = PROVIDERS.getProvider(network);

    const connection = new Web3(selectProvider.jsonRpc);

    web3 = connection;

    return connection;
}

(() => getWeb3Connection(NETWORKS.ETHEREUM))();


//function to generate nmemonic (12 word phrase) for wallet creation
export const createMnemonic = () => {
    return generateMnemonic(128).split(' ');
}

const accessWalletUsingMnemonic = async (mnemonics: string) => {
    const wallet_hdpath = process.env.WALLET_PATH;

    const seed = mnemonicToSeedSync(mnemonics);
    
    const hdwallet = hdkey.fromMasterSeed(seed);

    const wallet = hdwallet.derivePath(wallet_hdpath!).getWallet();

    const createdWallet = web3.eth.accounts.wallet.add(wallet.getPrivateKeyString());

    return createdWallet;
}

const encryptWallet = async (privateKey: string, walletPassword: string) => {
    const encryptedWallet =  web3.eth.accounts.encrypt(privateKey, walletPassword);
    return encryptedWallet;
};

export const generateWalletUsingKeyStore = async (password: string) => {
    const mnemonics =  createMnemonic();

    const mnemonicsInString = mnemonics.join(' ');

    const wallet = await accessWalletUsingMnemonic(mnemonicsInString);

    const encryptedWallet = await encryptWallet(wallet.privateKey, password);

    return Buffer.from(JSON.stringify(encryptedWallet)).toString('base64');
}

export const storeWalletKey = (element: string | ArrayBuffer | ArrayBufferView | Blob, name: string) => {
    saveFile(element, name);
};
