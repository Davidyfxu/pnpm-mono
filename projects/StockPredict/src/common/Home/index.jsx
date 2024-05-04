import { Layout, Menu } from "antd";
import { Outlet, useNavigate } from "react-router-dom";
const { Header, Content, Footer } = Layout;

const Home = () => {
  const navigate = useNavigate();
  const items = [
    {
      key: 1,
      label: "Business News",
      onClick: () => navigate(`/news`),
    },
    {
      key: 2,
      label: "Stocks Dashboard",
      onClick: () => navigate(`/stocks`),
    },
    {
      key: 3,
      label: "Summary",
      onClick: () => navigate(`/summary`),
    },
  ];

  return (
    <Layout
      style={{
        height: "100vh",
        backgroundColor: "white",
      }}
    >
      <Header
        style={{
          position: "sticky",
          top: 0,
          zIndex: 1,
          width: "100%",
          display: "flex",
          alignItems: "center",
          backgroundColor: "white",
        }}
      >
        <Menu
          mode="horizontal"
          items={items}
          style={{
            flex: 1,
            minWidth: 0,
          }}
        />
      </Header>
      <Content
        style={{
          padding: "16px 50px",
          height: "80%",
          overflow: "auto",
        }}
      >
        <Outlet />
      </Content>
      <Footer
        style={{
          textAlign: "center",
        }}
      >
        ©{new Date().getFullYear()} Created by NUS project
      </Footer>
    </Layout>
  );
};

export default Home;
