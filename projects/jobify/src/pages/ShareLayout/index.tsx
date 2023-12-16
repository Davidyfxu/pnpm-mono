import React from "react";
import Wrapper from "../../assets/wrappers/SharedLayout";
import SmallSidebar from "../../components/SmallSidebar";
import BigSidebar from "../../components/BigSidebar";
import { Outlet } from "react-router-dom";
import Navbar from "../../components/Navbar";
const ShareLayout = () => {
  return (
    <Wrapper>
      <main className={"dashboard"}>
        <SmallSidebar />
        <BigSidebar />
        <div>
          <Navbar />
          <div className={"dashboard-page"}>
            <Outlet />
          </div>
        </div>
      </main>
    </Wrapper>
  );
};

export default ShareLayout;
