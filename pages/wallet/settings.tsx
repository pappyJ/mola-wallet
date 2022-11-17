import { NextPageX } from "types/next";
import DashboardLayout from "page_components/wallet/layout";
import styles from "styles/pages/wallet/settings.module.css";
import {
  AttachmentIcon,
  CaretDownOutline,
  ClockIcon,
  CloseIconInBigCircle,
  DoubleIcon,
  TickHeavyIcon,
  UpIcon,
} from "components/icons";
import Link from "next/link";
import { ReactNode, useEffect, useRef, useState } from "react";
import WalletHeader from "page_components/wallet/header";

const Page: NextPageX = () => {
  const [addressModalActive, setAddressModalActive] = useState(false);

  return (
    <div className={styles.main}>
      <WalletHeader>
        <h2>Settings</h2>
      </WalletHeader>
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
            <ExportBtn />
          </div>
        </Section>

        <Section>
          <h6>Contact Address</h6>
          <div className={styles.center}>
            <p>You can add up to 10 contact addresses</p>
            <button
              className={styles.btn}
              onClick={() => setAddressModalActive(true)}
            >
              Add Address
            </button>
          </div>
          <AddressModal
            addressModalActive={addressModalActive}
            setAddressModalActive={setAddressModalActive}
          />
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
  const [file, setFile] = useState<File>();
  const fileInputRef = useRef<HTMLInputElement>(null);

  function shorten(data: string | null) {
    if (!data) return "";

    if (data.length < 35) return data;

    let a = data.toString().slice(0, 15);
    let b = data.toString().slice(-15);

    return `${a}...${b}`;
  }

  return (
    <div className={styles.import_file}>
      <input
        ref={fileInputRef}
        type="file"
        hidden
        onChange={() => {
          setFile(fileInputRef.current?.files?.[0]);
        }}
      />
      <button
        className={styles.upload_btn}
        onClick={() => fileInputRef.current?.click()}
        title={file?.name || "Upload file"}
      >
        <span className={styles.icon}>
          <AttachmentIcon />
        </span>
        {shorten(file?.name || "Upload file")}
      </button>
      <button
        className={styles.btn}
        onClick={() => fileInputRef.current?.click()}
      >
        Import
      </button>
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

function AddressModal({
  addressModalActive,
  setAddressModalActive,
}: {
  addressModalActive: boolean;
  setAddressModalActive: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  function confirmAndAddAdress(e: any) {
    e.preventDefault();
    setAddressModalActive(false);
  }

  return (
    <div
      className={`${styles.add_address_modal} ${
        addressModalActive ? styles.active : ""
      }`}
    >
      <form
        className={`${styles.container} c-scroll`}
        onSubmit={confirmAndAddAdress}
      >
        <h4>Add a contact address</h4>
        <button
          className={styles.close_btn}
          type="button"
          onClick={() => setAddressModalActive(false)}
        >
          <CloseIconInBigCircle />
        </button>

        <div style={{ margin: "2rem 0 6rem" }}>
          <div className={styles.input_container}>
            <div className={styles.input_box}>
              <input required placeholder="Enter your address" />
            </div>
          </div>

          <div className={styles.input_container}>
            <div className={styles.input_box}>
              <input required placeholder="Nickname" />
            </div>
          </div>
        </div>

        <div className={styles.btn_container}>
          <button className={styles.btn} type="submit">
            Confirm and Add
          </button>
        </div>
      </form>
    </div>
  );
}

function ExportBtn() {
  function download() {
    const link = document.createElement("a");
    const date = new Date().toUTCString();
    link.download = `Mola Wallet Configuration ${date}`;

    //add downloadable configuration object here
    const content = { test_configuration: true, date: date };

    let blob = new Blob([JSON.stringify(content, null, 2)], {
      type: "application/json",
    });

    link.href = URL.createObjectURL(blob);
    link.click();

    URL.revokeObjectURL(link.href);
  }

  return (
    <button onClick={download} className={styles.btn}>
      EXPORT
    </button>
  );
}
