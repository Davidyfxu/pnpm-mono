import "./App.css";
import { ConfigProvider, theme, Typography } from "antd";

const { Title } = Typography;

import FileUpload from "./components/FileUpload";
import FilesTable from "./components/FilesTable";

function getColorMode() {
  if (
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches
  ) {
    // 检测到暗色模式
    return theme.darkAlgorithm;
  }
  return theme.defaultAlgorithm;
}
function App() {
  return (
    <ConfigProvider
      theme={{
        algorithm: getColorMode(),
      }}
    >
      <Title level={2}>文件传输与下载</Title>
      <FileUpload />
      <FilesTable />
    </ConfigProvider>
  );
}

export default App;
