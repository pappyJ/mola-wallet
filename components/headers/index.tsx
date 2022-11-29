import Image from "next/image";
import Link from "next/link";
import styles from "styles/components/headers/index.module.css";

export default function Header() {
  return (
    <header className={styles.main}>
      <div className={styles.padder}>
        <div className={styles.left}>
          <Link href="/">
            <a className={styles.logo_image_container}>
              <Image
                layout="fill"
                src="/mola-logo-1.png"
                alt="mola digital logo"
              />
            </a>
          </Link>
          <div className={styles.nav}>
            {links.map((e, i) => (
              <Link key={i} href={e.href}>
                <a>{e.title}</a>
              </Link>
            ))}
          </div>
        </div>
        <div className={styles.right}>
          <Link href="/">
            <a className={styles.button}>Mola Product</a>
          </Link>
        </div>
      </div>
    </header>
  );
}

const links = [
  { title: "Mola Digital", href: "/" },
  { title: "Mola Digital", href: "/" },
  { title: "Mola Digital", href: "/" },
];
