import Web3 from "web3";
import {
  convertToWei,
  walletTransactionBalanceValidate,
  getBufferedGasLimit,
} from "./tools";

/*
    @info This method is used to send Native (ETH,MATIC,BNB) token to someone
    @param amountToSend -> This is the amount entered by the user in frontend , its in string format
    @param decimals -> its the decimals of the token selected by the user to send to someone
    @param recipientAddress -> recipient wallet address
    @params enderWalletAddress -> sender's wallet address
    @param sendersPrivateKey -> private key of sender
*/
export const sendNativeToken = async (
  provider: Web3,
  amountToSend: number | string,
  decimals: number,
  recipientAddress: string,
  senderWalletAddress: string,
  sendersPrivateKey: string,
  gasPriority: number,
  gasLimitCustom: number
) => {
  try {
    // convert amount to send from string to wei format
    const amountInWei = convertToWei(amountToSend.toString(), decimals);

    // get the estimated gas for transaction
    const gasLimit = await provider.eth.estimateGas({
      to: recipientAddress,
      from: senderWalletAddress,
      value: amountInWei,
    });

    //bufferGasLimit for transaction time

    const gasPriorityBuffer = getBufferedGasLimit(gasLimit, gasPriority);

    // if user has sufficient balance for the transaction
    await walletTransactionBalanceValidate(
      provider,
      gasLimitCustom.toString() || gasPriorityBuffer.toString(),
      senderWalletAddress,
      true,
      amountInWei
    );

    const tx = {
      gas: provider.utils.toHex(gasLimit.toString()),
      to: recipientAddress,
      value: amountInWei.toString(),
      from: senderWalletAddress,
    };

    // signing transaction
    const signedTx = await provider.eth.accounts.signTransaction(
      tx,
      sendersPrivateKey
    );

    // send transaction
    return await provider.eth.sendSignedTransaction(signedTx.rawTransaction!);
  } catch (error: any) {
    throw new Error(error);
  }
};
