"use client";
import React, { useState } from "react";
import {
  AISearchResults,
  CustomContext,
  Empty,
  SubModuleHeader,
  UserInputLink,
} from "@/components";
import { CiSearch } from "react-icons/ci";
import { get } from "lodash-es";
import { Radio, Segmented, Checkbox } from "antd";
enum ChoiceEnum {
  AIResults = "1",
  UserInput = "2",
  CustomContext = "3",
}
const OPTIONS = [
  { label: "AI Search Results", value: ChoiceEnum.AIResults },
  { label: "User Input Link", value: ChoiceEnum.UserInput },
  { label: "Custom Context", value: ChoiceEnum.CustomContext },
];
const KnowledgeCuration = () => {
  const [tab, setTab] = useState<null | ChoiceEnum>();

  const renderTabContent = () => {
    switch (tab) {
      case ChoiceEnum.AIResults:
        return <AISearchResults />;
      case ChoiceEnum.UserInput:
        return <UserInputLink />;
      case ChoiceEnum.CustomContext:
        return <CustomContext />;
      default:
        return <Empty />;
    }
  };
  return (
    <div className={"flex p-8 flex-col gap-5 bg-base-100 flex-1"}>
      <div>
        <SubModuleHeader
          title={"Knowledge Curation"}
          icon={<CiSearch />}
          buttonText={"Search"}
        />
        <Checkbox className="flex justify-end mt-2">
          Research Papers Only
        </Checkbox>
      </div>
      <div className="flex">
        {OPTIONS.map((o, index) => (
          <div
            key={index}
            className={
              "h-10 flex-1 text-gray-600 text-xs flex justify-center items-center"
            }
            style={
              o.value === tab
                ? { background: "#F8F1FC", color: "#794DFE", fontWeight: 450 }
                : {
                    background: "rgba(186, 186, 186, 0.08)",
                    color: "#BABABA",
                    fontWeight: 450,
                  }
            }
            onClick={() => setTab(o?.value)}
          >
            {o.label}
          </div>
        ))}
      </div>
      {renderTabContent()}
    </div>
  );
};

export default KnowledgeCuration;
