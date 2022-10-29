import React from "react";

export const ProviderContext = React.createContext(null);

export function ProviderContextComponent({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ProviderContext.Provider value={null}>{children}</ProviderContext.Provider>
  );
}
