import Link from "next/link";
import styles from "styles/pages/Home.module.css";

export default function Skipper({ href }: { href: string }) {
  return (
    <div className={styles.skip_container}>
      <Link href={href}>
        <a>Skip</a>
      </Link>
    </div>
  );
}
