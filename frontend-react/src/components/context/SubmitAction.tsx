import React, { useState } from 'react';
import { createContext, useContext } from 'react';

type ActionContextType = [isSubmit: boolean, setIsSubmit: (value: boolean) => void];

const ActionContext = createContext<ActionContextType | null>(null);

function ActionProvider({ children }: { children: React.ReactNode }) {
  const [isSubmit, setIsSubmit] = useState(false);

  return <ActionContext.Provider value={[isSubmit, setIsSubmit]}>{children}</ActionContext.Provider>;
}

export function useSubmitAction() {
  const context = useContext(ActionContext);

  if (!context) {
    throw new Error('useSubmitAction must be used within ActionProvider');
  }

  return context;
}

export default ActionProvider;
