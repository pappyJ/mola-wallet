import React, { useState } from "react";

export const AddressContext = React.createContext<
  [string | null, React.Dispatch<React.SetStateAction<string | null>>]
>([null, () => {}]);

export function AddressContextComponent({
  children,
}: {
  children: React.ReactNode;
}) {
  const [address, setAddress] = useState<string | null>(null);

  return (
    <AddressContext.Provider value={[address, setAddress]}>
      {children}
    </AddressContext.Provider>
  );
}
