/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env: {

    polygon_rpc: "https://polygon-mumbai.g.alchemy.com/v2/tvBkQITGquV4dAnolr0KRhoMtPfV6G4S",

    ethereum_rpc: "https://eth-goerli.g.alchemy.com/v2/W-7yt9jTIlkyTeHsvNMpsD53t_0XmOWU",

    binance_rpc: "https://data-seed-prebsc-1-s3.binance.org:8545",

    WALLET_PATH: "m/44'/60'/0'/0/0"

  }
}

module.exports = nextConfig
