import React from "react";
import { Layout, Nav } from "@douyinfe/semi-ui";
import {
  IconCalendarClock,
  IconEdit,
  IconFile,
  IconGithubLogo,
  IconHourglass,
  IconList,
  IconMenu,
  IconSafe,
  IconSun,
} from "@douyinfe/semi-icons";
import { Outlet, useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const { Sider } = Layout;
  return (
    <Layout>
      <Sider>
        <Nav
          bodyStyle={{ height: "80vh" }}
          items={[
            {
              itemKey: "CountdownTime",
              text: "CountdownTime",
              icon: <IconHourglass />,
              onClick: () => navigate("CountdownTime"),
            },
            {
              itemKey: "Quiz",
              text: "Quiz",
              icon: <IconCalendarClock />,
              onClick: () => navigate("Quiz"),
            },
            {
              itemKey: "Recipe",
              text: "Recipe",
              icon: <IconMenu />,
              onClick: () => navigate("Recipe"),
            },
            {
              itemKey: "Notes",
              text: "Notes",
              icon: <IconFile />,
              onClick: () => navigate("Notes"),
            },
            {
              itemKey: "ToDo",
              text: "ToDo",
              icon: <IconList />,
              onClick: () => navigate("ToDo"),
            },
            {
              itemKey: "GitHubProfiles",
              text: "GitHubProfiles",
              icon: <IconGithubLogo />,
              onClick: () => navigate("GitHubProfiles"),
            },
            {
              itemKey: "Drawing",
              text: "Drawing",
              icon: <IconEdit />,
              onClick: () => navigate("Drawing"),
            },
            {
              itemKey: "PswGen",
              text: "PswGen",
              icon: <IconSafe />,
              onClick: () => navigate("PswGen"),
            },
            {
              itemKey: "Weather",
              text: "Weather",
              icon: <IconSun />,
              onClick: () => navigate("Weather"),
            },
          ]}
          header={{
            logo: (
              <img src="https://sf6-cdn-tos.douyinstatic.com/obj/eden-cn/ptlz_zlp/ljhwZthlaukjlkulzlp/root-web-sites/webcast_logo.svg" />
            ),
            text: "10hrs10Projs",
          }}
          footer={{
            collapseButton: true,
            collapseText: () => "Open/Close",
          }}
        />
      </Sider>
      <Outlet />
    </Layout>
  );
};

export default Home;
