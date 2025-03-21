"use client";
import React, { useState } from "react";
import { SubModuleHeader, OutlineText, OutlineCard } from "@/components/index";
import { MdGeneratingTokens } from "react-icons/md";
import { Segmented } from "antd";
import { AppstoreOutlined, BarsOutlined } from "@ant-design/icons";

enum OutlineEnum {
  Card = "1",
  Text = "2",
}

const Outline = () => {
  const [tab, setTab] = useState<OutlineEnum>(OutlineEnum.Card);
  const renderTabContent = () => {
    switch (tab) {
      case OutlineEnum.Card:
        return <OutlineCard />;
      case OutlineEnum.Text:
        return <OutlineText />;
    }
  };
  return (
    <div className={"flex p-8 flex-col bg-base-100 flex-1"}>
      <SubModuleHeader
        title={"Outline"}
        icon={<MdGeneratingTokens />}
        buttonText={"Generate"}
      />
      <div className="divider" />
      <div className={"flex justify-end mb-4"}>
        <Segmented
          size={"large"}
          onChange={(v) => setTab(v)}
          options={[
            {
              label: "Card",
              icon: <BarsOutlined />,
              value: OutlineEnum.Card,
            },
            {
              label: "Text",
              icon: <AppstoreOutlined />,
              value: OutlineEnum.Text,
            },
          ]}
        />
      </div>
      {renderTabContent()}
    </div>
  );
};

export default Outline;
