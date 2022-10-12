import { HomeIcon, UserIcon, SearchIcon, MenuIcon } from "components/icons";
import Image from "next/image";
import styles from "styles/components/navs/mobile_main_nav.module.css";

export default function MoblieMainNav() {
  return (
    <div className={styles.main}>
      <span className={styles.icon_container}>
        <HomeIcon />
      </span>
      <span className={styles.icon_container}>
        <UserIcon />
      </span>
      <span className={styles.image_container}>
        <Image alt="logo" width={60} height={60} src="/mola-logo-1.png" />
      </span>
      <span className={styles.icon_container}>
        <SearchIcon />
      </span>
      <span className={styles.icon_container}>
        <MenuIcon />
      </span>
    </div>
  );
}
