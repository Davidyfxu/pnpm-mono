"use client";
import React from "react";
import { Toaster } from "react-hot-toast";
import { ConfigProvider } from "antd";

const Providers = ({ children }: { children: JSX.Element }) => {
  return (
    <ConfigProvider
      theme={{
        components: {
          Checkbox: {
            colorPrimary: "#B39AFF",
            algorithm: true, // 启用算法
          },
          Segmented: {
            itemSelectedColor: "#794DFE",
            itemColor: "#BABABA",
            algorithm: true, // 启用算法
          },
        },
      }}
    >
      <Toaster position={"top-center"} />
      {children}
    </ConfigProvider>
  );
};

export default Providers;
