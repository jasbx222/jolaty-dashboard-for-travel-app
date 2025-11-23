import { createContext, useContext, useState, type ReactNode } from "react";

interface Options {
  option1: boolean;
  option3: boolean;
  setOption1: () => void;
  setOption3: () => void;
  resetOptions: () => void;
}

const OptionsContext = createContext<Options | undefined>(undefined);

export function OptionsProvider({ children }: { children: ReactNode }) {
  const [option1, setOption1State] = useState(true);
  const [option3, setOption3State] = useState(false);

  // تفعيل option1 وإلغاء option3
  const setOption1 = () => {
    setOption1State(true);
    setOption3State(false);
  };

  // تفعيل option3 وإلغاء option1
  const setOption3 = () => {
    setOption3State(true);
    setOption1State(false);
  };

  // إعادة تعيين الخيارات
  const resetOptions = () => {
    setOption1State(false);
    setOption3State(false);
  };

  return (
    <OptionsContext.Provider value={{ option1, option3, setOption1, setOption3, resetOptions }}>
      {children}
    </OptionsContext.Provider>
  );
}

export function useOptions() {
  const context = useContext(OptionsContext);
  if (!context) throw new Error("useOptions must be used within OptionsProvider");
  return context;
}
