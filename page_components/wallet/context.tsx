import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useState,
} from "react";

import { NETWORKS } from "interfaces/IRpc";
import INETWORK_CONFIG from "interfaces/INetwok";
import NETWORK_CONFIG from "config/networksLive";
import { SignatureObject } from "web3-core";

export const NetworkContext = createContext<
  [INETWORK_CONFIG, Dispatch<SetStateAction<INETWORK_CONFIG>>]
>([{} as INETWORK_CONFIG, () => {}]);

export const MessageContext = createContext<
  [SignatureObject, React.Dispatch<React.SetStateAction<SignatureObject>>]
>([{} as SignatureObject, () => {}]);

export default function WalletContext({ children }: { children: ReactNode }) {
  const [network, setNetwork] = useState<INETWORK_CONFIG>(
    NETWORK_CONFIG[NETWORKS.ETHEREUM]
  );

  return (
    <NetworkContext.Provider value={[network, setNetwork]}>
      {children}
    </NetworkContext.Provider>
  );
}

export function MessageContextComponent({ children }: { children: ReactNode }) {
  const [message, setMessage] = useState<SignatureObject>(
    {} as SignatureObject
  );

  return (
    <MessageContext.Provider value={[message, setMessage]}>
      {children}
    </MessageContext.Provider>
  );
}
