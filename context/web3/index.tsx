import React, { useState } from "react";

export const ProviderContext = React.createContext<
  [any, React.Dispatch<React.SetStateAction<any>>]
>([null, () => {}]);

export function ProviderContextComponent({
  children,
}: {
  children: React.ReactNode;
}) {
  const [provider, setProvider] = useState();

  return (
    <ProviderContext.Provider value={[provider, setProvider]}>
      {children}
    </ProviderContext.Provider>
  );
}
