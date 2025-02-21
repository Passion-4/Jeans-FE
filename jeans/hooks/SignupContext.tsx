import React, { createContext, useContext, useState } from "react";

type SignupData = {
  voiceType: number;
  name: string;
  birthday: string;
  phone: string;
  password: string;
};

type SignupContextType = {
  signupData: SignupData;
  updateSignupData: (key: keyof SignupData, value: string | number) => void;
};

const SignupContext = createContext<SignupContextType | undefined>(undefined);

export const SignupProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [signupData, setSignupData] = useState<SignupData>({
    voiceType: 0,
    name: "",
    birthday: "",
    phone: "",
    password: "",
  });

  const updateSignupData = (key: keyof SignupData, value: string | number) => {
    setSignupData((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <SignupContext.Provider value={{ signupData, updateSignupData }}>
      {children}
    </SignupContext.Provider>
  );
};

export const useSignup = () => {
  const context = useContext(SignupContext);
  if (!context) {
    throw new Error("useSignup must be used within a SignupProvider");
  }
  return context;
};
