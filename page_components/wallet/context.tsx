import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useState,
} from "react";

import { NETWORKS } from "interfaces/IRpc";
import INETWORK_CONFIG from "interfaces/INetwok"
import NETWORK_CONFIG from "constants/networksConfig";

export const NetworkContext = createContext<
  [INETWORK_CONFIG, Dispatch<SetStateAction<any>>]
>([{} as INETWORK_CONFIG, () => {}]);

export default function WalletContext({ children }: { children: ReactNode }) {
  const [network, setNetwork] = useState(NETWORK_CONFIG[NETWORKS.ETHEREUM]);

  return (
    <NetworkContext.Provider value={[network, setNetwork]}>
      {children}
    </NetworkContext.Provider>
  );
}
