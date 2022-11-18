import { NextPageX } from "types/next";
import DashboardLayout from "page_components/wallet/layout";
import WalletHeader from "page_components/wallet/header";
import styles from "styles/pages/wallet/d_apps.module.css";
import Image from "next/image";

const Page: NextPageX = () => {
  return (
    <div className={styles.main}>
      <WalletHeader />
      <h2 className={styles.hero}>Explore Mola DApps</h2>
      <div className={styles.dapps}>
        <h3>Mola DApps</h3>
        <div className={styles.dapps_container}>
          {dapps.map((e, i) => (
            <div className={styles.dapps_list} key={i}>
              <div className={styles.left}>
                <h6>{e.title}</h6>
                <p>{e.desc}</p>
                <p className={styles.hashtag}>{e.hashtag}</p>
              </div>
              <div className={styles.right}>
                <div className={styles.img}>
                  <Image src={e.img} alt="" layout="fill" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

Page.Layout = DashboardLayout;
export default Page;

const dapps = [
  {
    title: "Mola Block",
    desc: "Mint stunning QR art- piece base on your favourite block",
    hashtag: "#NFT",
    img: "/eth_block.png",
  },
  {
    title: "Mola TV",
    desc: "Earn on deposit and borrow assets",
    hashtag: "#DeFi",
    img: "/aave_v2.png",
  },
  {
    title: "Mola Vault",
    desc: "Migrate or register ens dormain / subdormain",
    hashtag: "#Property",
    img: "/ens_manager.png",
  },
  {
    title: "Mola Subsscribe",
    desc: "Stake your ETH on ethereum 2.0 and watch your reward grow",
    hashtag: "#DeFi",
    img: "/stake_eth.png",
  },
  {
    title: "Stake Mola",
    desc: "Stake any amount of ETH and begin earing reward",
    hashtag: "#DeFi",
    img: "/stake_wise.png",
  },
];
