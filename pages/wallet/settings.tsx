import { NextPageX } from "types/next";
import DashboardLayout from "page_components/wallet/layout";
import styles from "styles/pages/wallet/settings.module.css";
import {
  AttachmentIcon,
  CaretDownOutline,
  ClockIcon,
  CloseIconInBigCircle,
  CopyIcon,
  DoubleIcon,
  TickHeavyIcon,
  UpIcon,
} from "components/icons";
import { engineName } from "constants/digits";
import { ReactNode, useContext, useEffect, useRef, useState } from "react";
import WalletHeader from "page_components/wallet/header";
import { AccountContext } from "context/account";
import Notification, { useNotification } from "components/notification";
import { shorten } from "utils/string";
import blockies from "ethereum-blockies";
import Image from "next/image";

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
          </div>

          <AddressList />

          <div className={styles.address_btn_container}>
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
          <SelectCurrency />
        </Section>
      </div>
    </div>
  );
};

Page.Layout = DashboardLayout;
export default Page;

const priorities = [
  {
    icon: TickHeavyIcon,
    text: "Normal Priority",
    time: "15 Min",
    id: "normal",
  },
  { icon: UpIcon, text: "High Priority", time: "5 Min", id: "high" },
  { icon: DoubleIcon, text: "Highest Priority", time: "2 Min", id: "highest" },
];

function Priorities() {
  const [account, setAccount] = useContext(AccountContext);

  function updateGasPriority(gasPriority: string) {
    setAccount((prev) => {
      return { ...prev, gasPriority };
    });
  }

  useEffect(() => {
    if (!account.gasPriority) updateGasPriority("normal");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [account]);

  return (
    <div className={styles.priorities_container}>
      {priorities.map((e, i) => {
        return (
          <button
            className={`${styles.priorities_box} ${
              account.gasPriority == e.id ? styles.active : ""
            }`}
            onClick={() => updateGasPriority(e.id)}
            key={i}
          >
            <span className={styles.icon_box}>
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
  const [, setAccount] = useContext(AccountContext);

  function confirmAndAdd(e: any) {
    e.preventDefault();
    let {
      nickname: { value: nickname },
      address: { value: address },
    } = e.target;

    setAccount((prev) => {
      return {
        ...prev,
        addressList: [...(prev.addressList || []), { nickname, address }],
      };
    });

    e.target.nickname.value = "";
    e.target.address.value = "";

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
        onSubmit={confirmAndAdd}
        autoComplete="off"
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
              <input required name="address" placeholder="Enter your address" />
            </div>
          </div>

          <div className={styles.input_container}>
            <div className={styles.input_box}>
              <input required name="nickname" placeholder="Nickname" />
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
  const [account] = useContext(AccountContext);
  const [notification, pushNotification] = useNotification();

  const { privateKey, ...configData } = account;
  function download() {
    const link = document.createElement("a");

    const date = new Date().toUTCString();

    link.download = `Mola Wallet Configuration ${date}`;

    //add downloadable configuration object here
    const content = { ...configData, engine: engineName, date };

    let blob = new Blob([JSON.stringify(content, null, 2)], {
      type: "application/json",
    });

    link.href = URL.createObjectURL(blob);
    link.click();

    URL.revokeObjectURL(link.href);

    pushNotification({
      element: (
        <p style={{ textAlign: "center" }}>
          Configuration Exported Successfully.
        </p>
      ),
      type: "success",
    });
  }

  return (
    <>
      <button onClick={download} className={styles.btn}>
        EXPORT
      </button>
      <Notification
        notification={notification}
        pushNotification={pushNotification}
      />
    </>
  );
}

function ImportFile() {
  const [file, setFile] = useState<File>();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [notification, pushNotification] = useNotification();
  const [imported, setImported] = useState(false);
  const [, setAccount] = useContext(AccountContext);

  function shorten(data: string | null) {
    if (!data) return "";

    if (data.length < 35) return data;

    let a = data.toString().slice(0, 15);
    let b = data.toString().slice(-15);

    return `${a}...${b}`;
  }

  function importFile() {
    if (validateAndExecFile(fileInputRef.current?.files?.item(0))) {
      setFile(fileInputRef.current?.files?.[0]);
      setImported(true);
    }
  }

  function validateAndExecFile(file: File | null | undefined): boolean {
    if (!file) return false;

    if (file.type != "application/json") {
      pushNotification({
        element: "Only JSON files supported",
        type: "error",
      });
      return false;
    }

    let readable = true;
    const reader = new FileReader();
    reader.readAsText(file);

    reader.onload = function (evt) {
      try {
        const { engine, date, ...config } = JSON.parse(
          evt.target?.result as string
        );
        if (engine != engineName) throw new Error();

        setAccount((prev) => {
          return { ...prev, ...config };
        });
      } catch (error) {
        pushNotification({
          element: "Error reading file",
          type: "error",
        });
        readable = false;
      }
    };
    reader.onerror = function () {
      pushNotification({
        element: "Error reading file",
        type: "error",
      });
      readable = false;
    };

    if (!readable) return false;

    return true;
  }

  useEffect(() => {
    if (imported) {
      pushNotification({
        element: "New configurations imported",
        type: "success",
      });
      setImported(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [imported]);

  return (
    <div className={styles.import_file}>
      <input
        ref={fileInputRef}
        type="file"
        hidden
        onChange={importFile}
        accept="application/json"
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
      <Notification
        notification={notification}
        pushNotification={pushNotification}
      />
    </div>
  );
}

function AddressList() {
  const [account] = useContext(AccountContext);
  const [editActive, setEditActive] = useState(false);
  const [editAddress, setEditAddress] = useState<string>();

  function activateEdit(address: string) {
    setEditActive(true);
    setEditAddress(address);
  }

  if (!account.addressList?.length) return <></>;
  return (
    <table className={styles.address_list}>
      <EditAddressModal
        editActive={editActive}
        setEditAcitve={setEditActive}
        editAddress={editAddress}
      />
      <tr className={styles.list_header}>
        <th>#</th>
        <th style={{ width: "25%" }}>Nickname</th>
        <th style={{ width: "75%" }}>Address</th>
        <th></th>
      </tr>
      {account.addressList?.map((e, i) => (
        <tr key={`${e.address}${e.nickname}${i}${Date.now()}`}>
          <td>{i + 1}</td>
          <td>{shorten(e.nickname, 10, 5, 20)}</td>
          <td>
            <Address address={e.address} />
          </td>
          <td>
            <button
              className={styles.edit_btn}
              onClick={() => activateEdit(e.address)}
            >
              Edit
            </button>
          </td>
        </tr>
      ))}
    </table>
  );
}

function Address({ address }: { address: string }) {
  const [copied, setCopied] = useState(false);
  const copyRef = useRef<HTMLTextAreaElement>(null);
  const imageDivRef = useRef<HTMLDivElement>(null);

  function copyAddress() {
    copyRef.current?.select();
    document.execCommand("copy");
    setCopied(true);
  }

  useEffect(() => {
    if (copied) setTimeout(() => setCopied(false), 2000);
  }, [copied]);

  useEffect(() => {
    imageDivRef.current?.lastChild &&
      imageDivRef.current.removeChild(imageDivRef.current.lastChild);
    imageDivRef.current?.appendChild(
      blockies.create({ seed: address, size: 10, scale: 3 })
    );
  }, [address]);

  return (
    <div className={styles.address}>
      <div ref={imageDivRef} className={styles.blockies_img}></div>
      <a>{shorten(address, 15, 20, 40)}</a>
      <button
        className={styles.icon_box}
        onClick={copyAddress}
        type="button"
        style={{ cursor: copied ? "default" : "pointer" }}
      >
        <textarea
          ref={copyRef}
          className={styles.hidden_textarea}
          value={address || ""}
          onChange={() => {}}
        />
        {!copied ? <CopyIcon /> : <TickHeavyIcon />}
      </button>
    </div>
  );
}

function EditAddressModal({ editActive, setEditAcitve, editAddress }: any) {
  const [, setAccount] = useContext(AccountContext);

  function confirmAndEdit(e: any) {
    e.preventDefault();
    let {
      nickname: { value: nickname },
      address: { value: address },
    } = e.target;

    setAccount((prev) => {
      return {
        ...prev,
        addressList:
          prev.addressList?.map((e) =>
            e.address === editAddress ? { nickname, address } : e
          ) || [],
      };
    });

    e.target.nickname.value = "";
    e.target.address.value = "";

    setEditAcitve(false);
  }

  function removeAddress() {
    setAccount((prev) => {
      return {
        ...prev,
        addressList:
          prev.addressList?.filter((e) => e.address !== editAddress) || [],
      };
    });

    setEditAcitve(false);
  }

  return (
    <div
      className={`${styles.add_address_modal} ${
        editActive ? styles.active : ""
      }`}
    >
      <form
        className={`${styles.container} c-scroll`}
        autoComplete="off"
        onSubmit={confirmAndEdit}
      >
        <h4>Edit Address</h4>
        <button
          className={styles.close_btn}
          type="button"
          onClick={() => setEditAcitve(false)}
        >
          <CloseIconInBigCircle />
        </button>

        <div className={styles.input_container}>
          <Address address={editAddress} />
        </div>

        <div style={{ margin: "2rem 0 6rem" }}>
          <div className={styles.input_container}>
            <div className={styles.input_box}>
              <input required name="address" placeholder="Enter New address" />
            </div>
          </div>

          <div className={styles.input_container}>
            <div className={styles.input_box}>
              <input required name="nickname" placeholder="Nickname" />
            </div>
          </div>
        </div>

        <div className={styles.btn_container}>
          <button className={styles.btn} type="submit">
            Confirm and Edit
          </button>
          <button
            className={styles.btn}
            type="button"
            style={{
              marginTop: "2rem",
              color: "#00244e",
              backgroundColor: "white",
            }}
            onClick={removeAddress}
          >
            Remove
          </button>
        </div>
      </form>
    </div>
  );
}

function SelectCurrency() {
  const [account, setAccount] = useContext(AccountContext);
  const [open, setOpen] = useState(false);

  function setCurrency(fiat: string) {
    setAccount((prev) => {
      return { ...prev, fiat };
    });
    setOpen(false);
  }

  return (
    <div className={styles.select_currency}>
      <button
        className={styles.selected}
        onClick={() => setOpen((prev) => !prev)}
      >
        <span className={styles.img}>
          <Image
            src={
              currencies.find((e) => e.name == account.fiat)?.flag ||
              "/us_flag.png"
            }
            alt=""
            layout="fill"
            quality={100}
          />
        </span>
        <span className={styles.text}>{account.fiat}</span>
        <span className={styles.icon_box}>
          <CaretDownOutline />
        </span>
      </button>
      <div
        className={`${styles.options_container} ${open ? styles.active : ""}`}
      >
        {currencies.map((e, i) => (
          <button key={i} onClick={() => setCurrency(e.name)}>
            <span className={styles.img}>
              <Image src={e.flag} alt="" layout="fill" quality={100} />
            </span>
            <span className={styles.text}>{e.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

const currencies = [
  { name: "USD", flag: "/us_flag.png" },
  { name: "GBP", flag: "/gb_flag.png" },
  { name: "EUR", flag: "/eu_flag.png" },
  { name: "IDR", flag: "/indonesian_flag.png" },
];
