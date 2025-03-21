"use client";
import React, { useState } from "react";
import { Button, Input, Space } from "antd";
import {
  CaretDownOutlined,
  CaretUpOutlined,
  MenuUnfoldOutlined,
} from "@ant-design/icons";
import PurpleButton from "@/components/PurpleButton";

const CustomContext = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };
  return (
    <div>
      <div
        className={`rounded-lg border p-5 flex flex-col gap-4 transition-all duration-500 ${
          isCollapsed ? "max-h-0 overflow-hidden" : "max-h-screen"
        }`}
      >
        <div className={"flex flex-col gap-3"}>
          <Space>
            <MenuUnfoldOutlined className={"w-4 h-4"} />
            <span className={"text-gray-700 font-medium text-xs leading-6"}>
              Context Input
            </span>
          </Space>
          <Input.TextArea
            placeholder="Paste your URL here"
            autoSize={{ minRows: 2, maxRows: 6 }}
          />
          <PurpleButton>Submit</PurpleButton>
        </div>
      </div>
      <div className="flex justify-center mt-[-16px]">
        <Button
          onClick={toggleCollapse}
          shape="circle"
          type="text"
          icon={isCollapsed ? <CaretDownOutlined /> : <CaretUpOutlined />}
        />
      </div>
    </div>
  );
};

export default CustomContext;
