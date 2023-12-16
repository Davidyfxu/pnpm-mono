import React, { useEffect } from "react";
import { useAppContext } from "../../context/appContext";
import { Loading } from "../../components";
import StatsContainer from "../../components/StatsContainer";
import ChartsContainer from "../../components/ChartsContainer";

const Stats = () => {
  const { showStats, isLoading, monthlyApplications = [] } = useAppContext();
  useEffect(() => {
    showStats();
  }, []);

  if (isLoading) {
    return <Loading center />;
  }
  return (
    <>
      <StatsContainer />
      {monthlyApplications.length > 0 && <ChartsContainer />}
    </>
  );
};

export default Stats;
