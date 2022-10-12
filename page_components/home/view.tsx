/* eslint-disable react-hooks/exhaustive-deps */
import styles from "styles/pages/Home.module.css";
import Link from "next/link";
import { useEffect, useLayoutEffect, useState } from "react";
import { useRouter } from "next/router";

export default function View() {
  let [idx, setIdx] = useState(0);
  const router = useRouter();

  function setIdxByQuery() {
    let i =
      parseInt(
        new URLSearchParams(window.location.search).get("section") || ""
      ) - 1 || 0;

    setIdx(i < Bodies.length ? i : 0);
  }

  useEffect(setIdxByQuery, [router]);

  return (
    <div className={styles.content}>
      <main>
        <h2>{Bodies[idx].title}</h2>
        <p>{Bodies[idx].body}</p>
      </main>
      <div className={styles.section_indicator}>
        {Bodies.map((e, i) => (
          <Link key={i} href={`?section=${i + 1}`}>
            <a className={idx === i ? styles.active : ""} />
          </Link>
        ))}
      </div>
      <div className={styles.next_button_container}>
        <Link
          href={idx === 2 ? "/create_password" : `/?section=${idx + 2}`}
          scroll={false}
          shallow={true}
        >
          <a>{Bodies[idx].linkText}</a>
        </Link>
      </div>
    </div>
  );
}

const Bodies = [
  {
    title: "Welcome to Mola Vault",
    body: "Trusted by millons, Picco Wallet is a secure wallet \
          making the world of web3 accessible to all",
    linkText: "Next",
  },

  {
    title: "Real time exchange rates",
    body: "The application allows you to monitor the value of a digital\
          asset like token and ethereum in real time",
    linkText: "Next",
  },

  {
    title: "Manage your digital assets",
    body: "Make transaction to invest, earn, play games and more!",
    linkText: "Get Started",
  },
];
