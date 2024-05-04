import { Avatar, Button, Flex, List, Modal, Typography } from "antd";
import { useState } from "react";

const profiles = [
  {
    title: "Name 1",
    desc: "Do the front-end Web development",
  },
  {
    title: "Name 2",
    desc: "Do the Back-end Web development",
  },
];

const course_points = [
  "Design and develop a user-friendly interface using HTML, CSS, and JavaScript, where users can enter stock symbols or company names to search for historical data.",
  "Retrieve the stock historical data from the API and present it on the website in an organized and visually appealing manner, such as charts, tables, or other data visualization techniques.",
  "Integrating features like live business news, an earnings calendar etc.",
  "Integrate foreign currency conversion. (optional)",
  "Highlight to user the top 10 stock(optional)",
  "Simulation trading (paper trading)/Live trading and Stock analysis(optional)",
];
const Summary = () => {
  return (
    <div>
      <Flex gap={16}>
        <Typography.Title level={5}>Project Title </Typography.Title>
        <Typography.Title level={4}>
          Web application for stock historical data search and stock price trend
          display
        </Typography.Title>
      </Flex>
      <Flex
        gap={16}
        vertical
        align={"center"}
        style={{ backgroundColor: "white" }}
      >
        <Typography.Title level={5}>Project Description </Typography.Title>
        <List
          dataSource={course_points}
          renderItem={(item) => <List.Item>{item}</List.Item>}
        />
      </Flex>
      <List
        style={{ marginTop: 16, backgroundColor: "white" }}
        bordered
        itemLayout="horizontal"
        dataSource={profiles}
        renderItem={(item, index) => (
          <List.Item>
            <List.Item.Meta
              avatar={
                <Avatar
                  src={`https://api.dicebear.com/7.x/miniavs/svg?seed=${index}`}
                />
              }
              title={item.title}
              description={item?.desc}
            />
          </List.Item>
        )}
      />
    </div>
  );
};

export default Summary;
