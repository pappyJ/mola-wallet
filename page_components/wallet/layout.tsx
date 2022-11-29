import styles from "styles/components/layouts/dashboard.module.css";
import Link from "next/link";
import Image from "next/image";
import {
  CaretDownOutline,
  DashboardIcon,
  LogoutIcon,
  MenuIcon2,
  MessageIcon,
  SettingsIcon,
  UserIcon,
} from "components/icons";
import { useRouter } from "next/router";
import { ReactNode, useContext, useEffect, useState } from "react";
import { AccountContext } from "context/account";
import WalletContext, { NetworkContext } from "./context";
import logout_styles from "styles/pages/wallet/logout.module.css";
import network_styles from "styles/pages/wallet/network_selector.module.css";

import { ProviderContext } from "context/web3";
import INetwork from "interfaces/INetwok";
import { AssetProviderContext } from "context/web3/assets";

export default function DashBoardLayout({ children }: { children: ReactNode }) {
  const [account] = useContext(AccountContext);
  const [logoutModalActive, setLogoutModalActive] = useState(false);
  const router = useRouter();

  function activateLogout() {
    if (window.location.hash === "#logout") setLogoutModalActive(true);
    else setLogoutModalActive(false);
  }

  useEffect(() => {
    if (!account?.address) router.replace("/wallet/access");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [account?.address]);

  useEffect(() => {
    window.addEventListener("hashchange", activateLogout);
    return () => window.removeEventListener("hashchange", activateLogout);
  }, []);

  return (
    <WalletContext>
      <LogoutModal active={logoutModalActive} />
      <div className={styles.main}>
        <div className={`${styles.left} c-scroll`}>
          <h1>
            <Link href="/wallet">
              <a>
                <span className={styles.logo_image_container}>
                  <Image
                    layout="fill"
                    src="/mola-logo-1.png"
                    alt="mola digital logo"
                  />
                </span>
                Mola Digital
              </a>
            </Link>
          </h1>
          <nav>
            <ul>
              {links.map((e, i) =>
                e.child ? (
                  <NavLinkDropDown e={e} key={i} />
                ) : (
                  <NavLink e={e} key={i} />
                )
              )}
              <li className={styles.li}>
                <a className={styles.anchor} href="#logout">
                  <span className={styles.icon}>
                    <LogoutIcon />
                  </span>
                  <span className={styles.text}>Logout</span>
                </a>
              </li>
            </ul>
          </nav>
        </div>
        <div className={styles.right}>
          <div className={styles.section}>{children}</div>
          <footer>
            <div className={styles.padder}>
              <div>
                © 2022 MolaWallet. All rights reserved. Pricing taken from
                Dexscreener
              </div>
              <div>
                <Link href="#">
                  <a>Help center</a>
                </Link>
              </div>
            </div>
          </footer>
        </div>
      </div>
    </WalletContext>
  );
}

const links = [
  { text: "Dashboard", href: "/wallet", icon: DashboardIcon },
  { text: "Nft Manager", href: "/wallet/nft", icon: UserIcon },
  { text: "DApps", href: "/wallet/d_apps", icon: MenuIcon2 },
  {
    text: "Message",
    href: "/wallet/message/sign",
    icon: MessageIcon,
    child: [
      {
        text: "Sign Message",
        href: "/wallet/message/sign",
      },
      {
        text: "Verify Message",
        href: "/wallet/message/verify",
      },
    ],
  },
  { text: "Settings", href: "/wallet/settings", icon: SettingsIcon },
];

function NavLink({
  e: { href, icon: Icon, text },
}: {
  e: { text: string; href: string; icon: () => JSX.Element };
}) {
  const router = useRouter();
  return (
    <li
      className={`${styles.li} ${router.pathname == href ? styles.active : ""}`}
    >
      <Link href={href}>
        <a className={styles.anchor}>
          <span className={styles.icon}>
            <Icon />
          </span>
          <span className={styles.text}>{text}</span>
        </a>
      </Link>
    </li>
  );
}

function NavLinkDropDown({
  e: { href, icon: Icon, text, child },
}: {
  e: {
    text: string;
    href: string;
    icon: () => JSX.Element;
    child: {
      text: string;
      href: string;
    }[];
  };
}) {
  const router = useRouter();
  const [active, setActive] = useState(false);

  useEffect(() => {
    setActive(child.some((e) => router.pathname == e.href));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router]);

  return (
    <li className={`${styles.li} ${active ? styles.open : ""}`}>
      <Link href={href}>
        <a className={styles.anchor}>
          <span className={styles.icon}>
            <Icon />
          </span>
          <span className={styles.text}>{text}</span>
          <button
            className={styles.drop_icon}
            onClick={(e) => {
              e.preventDefault();
              setActive((prev) => !prev);
            }}
          >
            <CaretDownOutline />
          </button>
        </a>
      </Link>
      {child.map((e, i) => (
        <li
          key={i}
          className={`${styles.li2} ${
            router.pathname == e.href ? styles.active : ""
          }`}
        >
          <Link href={e.href}>
            <a className={styles.anchor}>
              <span className={styles.text}>{e.text}</span>
            </a>
          </Link>
        </li>
      ))}
    </li>
  );
}

function LogoutModal({ active }: { active: boolean }) {
  const [, setAccount] = useContext(AccountContext);
  const [, setProvider] = useContext(ProviderContext);
  const [, setNetwork] = useContext(NetworkContext);
  const [, setAssetProvider] = useContext(AssetProviderContext);

  return (
    <div
      className={`${network_styles.modal} ${
        active ? network_styles.active : ""
      }`}
    >
      <div className={logout_styles.container}>
        <p className={logout_styles.heading}>
          Are you sure you want to logout ?
        </p>
        <div className={logout_styles.button_container}>
          <a href="#">No</a>
          <button
            onClick={() => {
              setProvider(null);
              setAssetProvider([]);
              setAccount((prev) => {
                return { ...prev, address: "" };
              });
              setNetwork({} as INetwork);
            }}        
            className={logout_styles.primary}
          >
            Yes
          </button>
        </div>
      </div>
    </div>
  );
}
