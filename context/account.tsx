import React, { useState } from "react";
import { IAccount } from "utils/interfaces/IAccount"

export const AccountContext = React.createContext<
  [IAccount, React.Dispatch<React.SetStateAction<any>>]
>([{} as IAccount, () => {}]);

export function AcoountContextComponent({
  children,
}: {
  children: React.ReactNode;
}) {
  const defaultAccount = {
    balance: 0,

    address: '',
  }
  const [account, setAccount] = useState<IAccount>(defaultAccount as IAccount);

  return (
    <AccountContext.Provider value={[account, setAccount]}>
      {children}
    </AccountContext.Provider>
  );
}
