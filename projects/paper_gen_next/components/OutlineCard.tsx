"use client";
import React from "react";
import { Input, Tree, TreeDataNode, TreeProps } from "antd";
import styles from "./index.module.scss";
const treeData: TreeDataNode[] = [
  {
    title: <Input style={{ width: "100%" }} className={"flex-1"} />,
    key: "0-0",
    children: [
      {
        title: <Input className={"flex-1"} />,
        key: "0-0-0",
      },
      {
        title: <Input className={"w-full"} />,
        key: "0-0-1",
      },
    ],
  },
  {
    title: <Input className={"w-full"} />,
    key: "1-0",
    children: [
      {
        title: <Input className={"w-full"} />,
        key: "1-0-0",
      },
      {
        title: <Input className={"w-full"} />,
        key: "1-0-1",
      },
    ],
  },
];
const OutlineCard = () => {
  const onSelect: TreeProps["onSelect"] = (selectedKeys, info) => {
    console.log("selected", selectedKeys, info);
  };

  const onCheck: TreeProps["onCheck"] = (checkedKeys, info) => {
    console.log("onCheck", checkedKeys, info);
  };
  return (
    <Tree
      className={styles.tree}
      draggable
      defaultExpandedKeys={["0-0-0", "0-0-1"]}
      defaultSelectedKeys={["0-0-0", "0-0-1"]}
      defaultCheckedKeys={["0-0-0", "0-0-1"]}
      onSelect={onSelect}
      onCheck={onCheck}
      treeData={treeData}
    />
  );
};

export default OutlineCard;
