import { Line } from "@ant-design/charts";
import React, { useEffect, useState } from "react";
import {
  Button,
  Divider,
  Input,
  List,
  Modal,
  Space,
  Spin,
  Typography,
} from "antd";
import { sum, round, isEmpty } from "lodash-es";
const { Search } = Input;
import mockData from "./mock.json";
import { graphQLFetch } from "../../common/utils/index.js";
const Stocks = () => {
  const [loading, setLoading] = useState(false);
  const [listLoading, setListLoading] = useState(false);
  const [data, setData] = useState([]);
  const [equity, setEquity] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [refresh, setRefresh] = useState(0);
  const [logs, setLogs] = useState([]);

  const showModal = () => {
    setLoading(true);
    setTimeout(() => {
      setIsModalOpen(true);
      setLoading(false);
    }, 1000);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const getPrediction = (values = []) =>
    round(sum(values) / values.length + Math.random(), 2);

  const onSearch = (value) => setEquity(value);
  const asyncFetch = async () => {
    try {
      const query = `mutation { stockAdd(stock: {equity: "${equity}"}) }`;
      setLoading(true);
      const res = await graphQLFetch(query, {});
      setData(
        Object.keys(res["Time Series (Daily)"])
          .map((k) => ({
            name: "close",
            date: k,
            price: Number(res["Time Series (Daily)"][k]["4. close"]),
          }))
          .sort((a, b) => new Date(a.date) - new Date(b.date)),
      );
    } catch (e) {
      console.error("searchStockPrice", e);
      setData(
        Object.keys(mockData["Time Series (Daily)"])
          .map((k) => ({
            name: "close",
            date: k,
            price: Number(mockData["Time Series (Daily)"][k]["4. close"]),
          }))
          .sort((a, b) => new Date(a.date) - new Date(b.date)),
      );
    } finally {
      setLoading(false);
      setRefresh((r) => r + 1);
    }
  };

  const searchLogs = async () => {
    try {
      setListLoading(true);
      const query = `query { stocksList {id equity searchDate }}`;
      const { stocksList = [] } = await graphQLFetch(query, {});
      console.log("===hello===", stocksList);
      setLogs(stocksList);
    } catch (e) {
      console.error(e);
    } finally {
      setListLoading(false);
    }
  };

  useEffect(() => {
    equity && void asyncFetch();
  }, [equity]);

  useEffect(() => {
    void searchLogs();
  }, [refresh]);

  const config = {
    title: {
      visible: true,
      text: "The Stock Price",
    },
    padding: "auto",
    forceFit: true,
    data,
    xField: "date",
    yField: "price",
    legend: equity,
    xAxis: { type: "date" },
    yAxis: {
      label: {
        formatter: (v) =>
          `${v}`.replace(/\d{1,3}(?=(\d{3})+$)/g, (s) => `${s},`),
      },
    },
    responsive: true,
  };

  return (
    <div>
      <Typography.Title>
        Retrieve and Predict the stock historical data
      </Typography.Title>
      <Search
        placeholder={
          "Please input the name of the equity. The sample below is Apple inc.(APPL)"
        }
        size={"large"}
        onSearch={onSearch}
        enterButton
      />
      <Spin spinning={loading}>
        <Divider>
          <Typography.Title level={5}> The Stock of {equity}</Typography.Title>
        </Divider>
        <Line {...config} />
      </Spin>

      <Button
        disabled={isEmpty(data)}
        onClick={showModal}
        block
        danger
        type="primary"
        loading={loading}
      >
        One click to Predict next price
      </Button>
      <List
        header={<h3>Search history</h3>}
        loading={listLoading}
        dataSource={logs}
        bordered
        renderItem={(item) => (
          <List.Item>
            <Space wrap>
              <div>Equity: {item?.equity ?? 1111}</div>
              <div>|</div>
              <div>SearchTime: {String(item?.searchDate)}</div>
            </Space>
          </List.Item>
        )}
      />
      <Modal
        title="Basic Modal"
        open={isModalOpen}
        onOk={handleCancel}
        onCancel={handleCancel}
      >
        Predict the next value is{" "}
        {getPrediction(data.slice(-2).map((d) => d?.price || 0))}
      </Modal>
    </div>
  );
};

export default Stocks;
