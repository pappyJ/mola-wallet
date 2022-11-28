import styles from "styles/components/footer.module.css";
import Link from "next/link";
import {
  FacebookIcon,
  InstagramIcon,
  LinkedinIcon,
  TelegramIcon,
  TwitterIcon,
} from "components/icons";

export default function Footer() {
  return (
    <footer className={styles.main}>
      <div className={styles.padder}>
        <div className={styles.sections}>
          <h3>MOLA DIGITAL</h3>
          <p>
            Crypto wallet powered infrastructure for accepting payments
            globally.
          </p>
          <p>© 2023 mola digital. All rights reserved.</p>
        </div>
        <div className={styles.sections}>
          <h4>Mola</h4>
          <div>
            <Link href="#">
              <a>About us</a>
            </Link>
            <Link href="#">
              <a>Career</a>
            </Link>
            <Link href="#">
              <a>Team</a>
            </Link>
            <Link href="#">
              <a>Help Center</a>
            </Link>
            <Link href="#">
              <a>Customer Support</a>
            </Link>
            <Link href="#">
              <a>Security Policy</a>
            </Link>
            <Link href="#">
              <a>Submit DApps</a>
            </Link>
          </div>
        </div>
        <div className={styles.sections}>
          <h4>Tools</h4>
          <Link href="#">
            <a>Mola Wallet</a>
          </Link>
          <Link href="#">
            <a>Verify Message</a>
          </Link>
          <Link href="#">
            <a>Generate Keystore File</a>
          </Link>
          <Link href="#">
            <a>Send Offline Helper</a>
          </Link>
        </div>
        <div className={styles.sections}>
          <h4>Legal</h4>
          <Link href="#">
            <a>Terms</a>
          </Link>
          <Link href="#">
            <a>Private Policy</a>
          </Link>
          <Link href="#">
            <a>Feedback</a>
          </Link>
        </div>
        <div className={styles.sections}>
          <h4>Socials</h4>
          <div style={{ display: "flex" }}>
            <div className={styles.icon_box}>
              <TwitterIcon />
            </div>
            <div className={styles.icon_box}>
              <LinkedinIcon />
            </div>
            <div className={styles.icon_box}>
              <FacebookIcon />
            </div>
            <div className={styles.icon_box}>
              <InstagramIcon />
            </div>
            <div className={styles.icon_box}>
              <TelegramIcon />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
