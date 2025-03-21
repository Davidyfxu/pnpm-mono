"use client";
import React, { useState } from "react";
import AISearchResults from "@/components/AISearchResults";
import { Button, Divider, Input, Space } from "antd";
import {
  CaretDownOutlined,
  CaretUpOutlined,
  LinkOutlined,
} from "@ant-design/icons";
import PurpleButton from "@/components/PurpleButton";

const UserInputLink = () => {
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
            <LinkOutlined className={"w-4 h-4"} />
            <span className={"text-gray-700 font-medium text-xs leading-6"}>
              Enter Link to Search
            </span>
          </Space>
          <Input
            placeholder="Paste your URL here"
            suffix={<PurpleButton>Submit</PurpleButton>}
          />
        </div>
        <div className={"flex flex-col gap-3"}>
          <Space>
            <LinkOutlined className={"w-4 h-4"} />
            <span className={"text-gray-700 font-medium text-xs leading-6"}>
              Enter Keyword to Search
            </span>
          </Space>
          <Input
            placeholder="Enter a keyword you want PaperGen to search"
            suffix={<PurpleButton>Submit</PurpleButton>}
          />
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
      <Divider />
      <AISearchResults />
    </div>
  );
};

export default UserInputLink;
