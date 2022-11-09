import { NextPageX } from "types/next";
import DashboardLayout from "components/layouts/dashboard";
import styles from "styles/pages/wallet/settings.module.css";
import {
  AttachmentIcon,
  CaretDownOutline,
  ClockIcon,
  DoubleIcon,
  NotificationSolidIcon,
  TickHeavyIcon,
  UpIcon,
} from "components/icons";
import Link from "next/link";
import { ReactNode, useRef, useState } from "react";

const Page: NextPageX = () => {
  return (
    <div className={styles.main}>
      <header>
        <h2>Settings</h2>
        <div className={styles.notification_icon_box}>
          <span className={styles.icon}>
            <NotificationSolidIcon />
          </span>
        </div>
      </header>
      <div className={styles.container}>
        <ExpandableSection hiddenComponent={<Priorities />}>
          <h6>Default transaction priority</h6>
          <div className={styles.center}>
            <p>
              This fee is charged by the Ethereum network and fluctuates
              depending on network traffic. MEW does not profit from this fee.
            </p>
          </div>
        </ExpandableSection>

        <ExpandableSection hiddenComponent={<ImportFile />}>
          <h6>Import Configuration</h6>
          <div className={styles.center}>
            <p>
              Please upload the file and click the button to open and import
              your configuration file from your local computer.
            </p>
          </div>
        </ExpandableSection>

        <Section>
          <h6>Export Configuration</h6>
          <div className={styles.center}>
            <p>
              Export your configuration file and save it on your local computer
              for later use.
            </p>
            <Link href="#">
              <a className={styles.btn}>EXPORT</a>
            </Link>
          </div>
        </Section>

        <Section>
          <h6>Contact Address</h6>
          <div className={styles.center}>
            <p>You can add up to 10 contact addresses</p>
            <Link href="#">
              <a className={styles.btn}>Add Address</a>
            </Link>
          </div>
        </Section>

        <Section>
          <h6>Currency Settings</h6>
        </Section>
      </div>
    </div>
  );
};

Page.Layout = DashboardLayout;
export default Page;

const priorities = [
  { icon: TickHeavyIcon, text: "Normal Priority", time: "15 Min" },
  { icon: UpIcon, text: "High Priority", time: "5 Min" },
  { icon: DoubleIcon, text: "Highest Priority", time: "2 Min" },
];

function Priorities() {
  return (
    <div className={styles.priorities_container}>
      {priorities.map((e, i) => {
        return (
          <button className={styles.priorities_box} key={i}>
            <span className={styles.icon_box} style={{ color: "#1E89DD" }}>
              <e.icon />
            </span>
            <span className={styles.text}>{e.text}</span>
            <span className={styles.time_box}>
              <span className={styles.clock_icon_box}>
                <ClockIcon />
              </span>
              <span className={styles.time}>{e.time}</span>
            </span>
          </button>
        );
      })}
    </div>
  );
}

function ImportFile() {
  const fileInputRef = useRef<HTMLInputElement>(null);

  return (
    <div className={styles.import_file}>
      <input ref={fileInputRef} type="file" hidden />
      <button
        className={styles.upload_btn}
        onClick={() => fileInputRef.current?.click()}
      >
        <span className={styles.icon}>
          <AttachmentIcon />
        </span>
        Upload file
      </button>
      <button className={styles.btn}>Import</button>
    </div>
  );
}

function Section({ children }: { children: ReactNode }) {
  return <div className={styles.section}>{children}</div>;
}

function ExpandableSection({
  children,
  hiddenComponent,
}: {
  children: ReactNode;
  hiddenComponent: ReactNode;
}) {
  const [active, setActive] = useState(false);
  return (
    <div className={`${styles.section} ${styles.expandable_section}`}>
      <div style={{ display: "flex" }}>
        <div className={styles.left}>{children}</div>
        <div className={styles.right}>
          <button
            className={`${styles.caret_down_icon} ${
              active ? styles.active : ""
            }`}
            onClick={() => setActive((prev) => !prev)}
          >
            <CaretDownOutline />
          </button>
        </div>
      </div>
      <div className={`${styles.expandable} ${active ? styles.active : ""}`}>
        {hiddenComponent}
      </div>
    </div>
  );
}
