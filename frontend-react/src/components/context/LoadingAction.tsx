import React, { useState } from 'react';
import { createContext, useContext } from 'react';

type ActionContextType = [isLoading: boolean, setIsLoading: (value: boolean) => void];

const ActionContext = createContext<ActionContextType | null>(null);

function ActionProvider({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(false);

  return <ActionContext.Provider value={[isLoading, setIsLoading]}>{children}</ActionContext.Provider>;
}

export function useLoadingAction() {
  const context = useContext(ActionContext);

  if (!context) {
    throw new Error('useLoadingAction must be used within ActionProvider');
  }

  return context;
}

export default ActionProvider;
