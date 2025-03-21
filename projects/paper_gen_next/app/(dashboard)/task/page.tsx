import React from "react";
import { KnowledgeCuration, Outline } from "@/components";

const TaskPage = () => {
  return (
    <div className={"flex w-full gap-4 flex-wrap"}>
      <KnowledgeCuration />
      <Outline />
    </div>
  );
};

export default TaskPage;
