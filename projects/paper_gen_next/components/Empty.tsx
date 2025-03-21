import React from "react";
import emptySvg from "@/assets/empty.svg";
import Image from "next/image";
const Empty = () => {
  return (
    <div className={"flex flex-col items-center gap-4"}>
      <Image src={emptySvg} alt="Empty" />
      <div className="text-center text-gray-900 font-thin">
        Web search results will create a helpful knowledge base and provide
        citations, helping you craft your outline and references.
        <br />
        This feature is optional — feel free to use it whenever you need!
      </div>
    </div>
  );
};

export default Empty;
