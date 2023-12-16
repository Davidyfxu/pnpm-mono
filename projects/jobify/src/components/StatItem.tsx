import React from "react";
import Wrapper from "../assets/wrappers/StatItem";
interface IStatItem {
  count: number;
  title: string;
  icon: React.ReactNode;
  color: string;
  bcg: string;
}
const StatItem = ({ count, title, icon, color, bcg }: IStatItem) => {
  return (
    <Wrapper color={color} bcg={bcg}>
      <header>
        <span className="count">{count}</span>
        <span className="icon">{icon}</span>
      </header>
      <h5 className="title">{title}</h5>
    </Wrapper>
  );
};

export default StatItem;
