import { generateMnemonic } from 'bip39'


//function to generate nmemonic (12 word phrase) for wallet creation
export const createMnemonic = () => {
    return generateMnemonic(128).split(' ');
}