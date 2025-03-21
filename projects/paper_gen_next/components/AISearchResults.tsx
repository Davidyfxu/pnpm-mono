import {
  CaretRightOutlined,
  DeleteOutlined,
  LinkOutlined,
} from "@ant-design/icons";
import { Button, Collapse } from "antd";
import React from "react";
import PurpleButton from "@/components/PurpleButton";

const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;

const AISearchResults = () => {
  const links = Array(10).fill(
    "https://www.digitalriver.com/blog/consumer-behavior-trends-2024/",
  );
  return (
    <div className={"overflow-auto"}>
      {links.map((link, idx) => {
        return (
          <div key={idx} className={"flex items-center gap-4 my-2"}>
            <Button
              type="text"
              shape="circle"
              icon={<LinkOutlined className={"text-violet-500"} />}
              size={"small"}
            />
            <Collapse
              className="flex-1"
              bordered={false}
              expandIconPosition={"end"}
              expandIcon={({ isActive }) => (
                <CaretRightOutlined rotate={isActive ? 90 : 0} />
              )}
              items={[
                {
                  key: "1",
                  label: link,
                  children: <p>{text}</p>,
                },
              ]}
            />
            <PurpleButton
              type="primary"
              shape="circle"
              icon={<DeleteOutlined className={"text-violet-500"} />}
              size={"small"}
            />
          </div>
        );
      })}
    </div>
  );
};

export default AISearchResults;
