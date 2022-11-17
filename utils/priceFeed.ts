import Axios from "./axios";

export const getCoinUSD = async (coin: string) => {
  try {
    const response = await Axios.get(
      `https://api.dexscreener.io/latest/dex/search/?q=${coin}`
    );

    if (response.status !== 200) {
      return {
        error: {
          message: response,
        },
      };
    } else {
      return {
        value: response.data.pairs[0].priceUsd,
      };
    }
  } catch (error) {
    console.log(error);
    return {
      error: {
        message: `Error getting USD  value of ${coin}`,
      },
    };
  }
};
