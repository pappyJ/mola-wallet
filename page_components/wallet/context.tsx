import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useState,
} from "react";

export const NetworkContext = createContext<
  [string, Dispatch<SetStateAction<string>>]
>(["", () => {}]);

export default function WalletContext({ children }: { children: ReactNode }) {
  const [network, setNetwork] = useState("ethereum");

  return (
    <NetworkContext.Provider value={[network, setNetwork]}>
      {children}
    </NetworkContext.Provider>
  );
}
