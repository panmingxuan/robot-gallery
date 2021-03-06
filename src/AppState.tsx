import React, { useState } from 'react';

interface AppStateVaule {
  username: string;
  shoppingCart: { items: { id: number; name: string }[] };
}

const defalutContextValue: AppStateVaule = {
  username: '凌辰亦梦',
  shoppingCart: { items: [] },
};

export const appContext = React.createContext(defalutContextValue);

export const appSetStateContext = React.createContext<React.Dispatch<React.SetStateAction<AppStateVaule>> | undefined>(undefined);

export const AppStateProvider: React.FC = (props) => {
  const [state, setState] = useState(defalutContextValue);
  return (
    <appContext.Provider value={state}>
      <appSetStateContext.Provider value={setState}>{props.children}</appSetStateContext.Provider>
    </appContext.Provider>
  );
};
