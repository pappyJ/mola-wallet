import styles from "styles/components/layouts/dashboard.module.css";
import Link from "next/link";
import Image from "next/image";
import {
  DashboardIcon,
  LogoutIcon,
  MenuIcon2,
  MessageIcon,
  SettingsIcon,
  UserIcon,
} from "components/icons";
import { useRouter } from "next/router";
import { ReactNode, useContext, useEffect } from "react";
import { AccountContext } from "context/account";
import WalletContext, { MessageContextComponent } from "./context";

export default function DashBoardLayout({ children }: { children: ReactNode }) {
  const [account] = useContext(AccountContext);
  const router = useRouter();

  useEffect(() => {
    if (!account?.address) router.replace("/wallet/access");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [account?.address]);

  return (
    <WalletContext>
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
                  <li key={i} className={styles.li}>
                    <Link href={e.href}>
                      <a className={styles.anchor}>
                        <span className={styles.icon}>
                          <e.icon />
                        </span>
                        <span className={styles.text}>{e.text}</span>
                      </a>
                    </Link>
                    {e.child.map((e, i) => (
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
                ) : (
                  <li
                    key={i}
                    className={`${styles.li} ${
                      router.pathname == e.href ? styles.active : ""
                    }`}
                  >
                    <Link href={e.href}>
                      <a className={styles.anchor}>
                        <span className={styles.icon}>
                          <e.icon />
                        </span>
                        <span className={styles.text}>{e.text}</span>
                      </a>
                    </Link>
                  </li>
                )
              )}
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
  { text: "Log out", href: "/wallet/logout", icon: LogoutIcon },
];

export function DashboardMessageLayout({ children }: { children: ReactNode }) {
  return (
    <DashBoardLayout>
      <MessageContextComponent>{children}</MessageContextComponent>
    </DashBoardLayout>
  );
}
