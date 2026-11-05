import React, { useState } from 'react';
import { createContext, useContext } from 'react';

type ActionContextType = [isRefresh: boolean, setIsRefresh: (value: boolean) => void];

const ActionContext = createContext<ActionContextType | null>(null);

function ActionProvider({ children }: { children: React.ReactNode }) {
  const [isRefresh, setIsRefresh] = useState(false);

  return <ActionContext.Provider value={[isRefresh, setIsRefresh]}>{children}</ActionContext.Provider>;
}

export function useRefreshAction() {
  const context = useContext(ActionContext);

  if (!context) {
    throw new Error('useRefreshAction must be used within ActionProvider');
  }

  return context;
}

export default ActionProvider;
