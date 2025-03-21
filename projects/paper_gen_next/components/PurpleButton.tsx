import React from "react";
import { Button } from "antd";
import { ButtonProps } from "antd/es/button/button";

const PurpleButton = ({ children, onClick, ...rest }: ButtonProps) => {
  return (
    <Button
      className="border-0"
      style={{ color: "#794DFE", backgroundColor: "#F8F1FC" }}
      onClick={onClick || (() => ({}))}
      {...rest}
    >
      {children}
    </Button>
  );
};

export default PurpleButton;
