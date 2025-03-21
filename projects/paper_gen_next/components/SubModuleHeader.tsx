import React from "react";
import { Button } from "antd";

interface ISubModuleHeader {
  title: string;
  icon: React.ReactElement;
  buttonText: string;
}
const SubModuleHeader = (props: ISubModuleHeader) => {
  const { title, icon, buttonText } = props;
  return (
    <div className={"flex justify-between items-center"}>
      <span className={"text-gray-700 font-semibold text-base"}>{title}</span>
      <Button
        className={"w-[150px] h-[44px] rounded-lg text-gray-800"}
        style={{ backgroundColor: "#EFF87B" }}
        icon={icon}
        type="primary"
      >
        {buttonText}
      </Button>
    </div>
  );
};
export default SubModuleHeader;
