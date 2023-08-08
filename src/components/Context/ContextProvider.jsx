import React, { createContext, useState } from "react";

export const addData = createContext();
export const updateData = createContext();
export const deleteData = createContext();

const ContextProvider = ({ children }) => {
  const [useradd, setUseradd] = useState("");
  const [update, setUpdate] = useState("");
  const [dlt, setDelete] = useState("");
  return (
    <>
      <addData.Provider value={{ useradd, setUseradd }}>
        <updateData.Provider value={{ update, setUpdate }}>
          <deleteData.Provider value={{ dlt, setDelete }}>
            {children}
          </deleteData.Provider>
        </updateData.Provider>
      </addData.Provider>
    </>
  );
};

export default ContextProvider;
