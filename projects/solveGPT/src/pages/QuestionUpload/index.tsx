import React, { useState } from "react";
import {
  Button,
  List,
  Space,
  Upload,
  Typography,
  Toast,
  Modal,
  Notification,
  Input,
} from "@douyinfe/semi-ui";
import { IconSearch, IconUpload } from "@douyinfe/semi-icons";
import { addNoteKind, answerGPT, getOCR } from "../api";
import QuestionSideSheet from "./components/QuestionSide";
import { fi } from "date-fns/locale";
import HomeCarousel from "./components/HomeCarousel";
const { Title } = Typography;
const QuestionUpload = () => {
  const [OCRs, setOCRs] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [visible, setVisible] = useState<boolean>(false);
  const [noteKind, setNoteKind] = useState("");
  const [sideV, setSideV] = useState<boolean>(false);
  const handleUpload = async ({ file, fileList }) => {
    try {
      const reader = new FileReader();
      reader.onloadend = async function () {
        const base64String = reader.result;
        setLoading(true);
        const { data } = await getOCR({ imageLink: base64String });
        setOCRs((o) => [...o, ...data]);
        setLoading(false);
        Toast.success("识别成功");
      };
      // 读取文件内容
      reader.readAsDataURL(fileList[0].fileInstance);
    } catch (e) {
      console.error("customRequest", e);
    } finally {
      setLoading(false);
    }
  };
  const getAnswer = async (question: string) => {
    try {
      setLoading(true);
      const { choices } = await answerGPT({ question });
      Notification.open({
        title: "SolveGPT解答",
        content: choices.join("; "),
        duration: 60,
      });
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const add_note_kind = async () => {
    try {
      setLoading(true);
      const { BaseResp } = await addNoteKind({ noteKind });
      if (!BaseResp?.StatusCode) {
        Toast.success("增加知识大类成功");
        setNoteKind("");
      } else {
        Toast.error("增加知识大类失败");
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Space style={{ width: "100%" }} vertical align={"center"}>
        <HomeCarousel />
        <Space>
          <Button
            theme="solid"
            type="primary"
            onClick={() => {
              setVisible(true);
            }}
          >
            增加知识大类
          </Button>
          <Button theme="solid" type="secondary" onClick={() => setSideV(true)}>
            增加知识点
          </Button>
          <Upload showUploadList={false} beforeUpload={handleUpload}>
            <Button theme="solid" type="tertiary" icon={<IconUpload />}>
              图片上传识别
            </Button>
          </Upload>
        </Space>
        <List
          style={{ width: "100%" }}
          header={<Title>识别结果</Title>}
          bordered
          loading={loading}
          dataSource={OCRs}
          renderItem={(item) => (
            <List.Item>
              {item?.DetectedText}
              <Button
                style={{ marginLeft: 32 }}
                onClick={() => getAnswer(item?.DetectedText)}
                theme={"borderless"}
              >
                AI解答
              </Button>
            </List.Item>
          )}
        />
      </Space>
      <Modal
        title="添加知识大类"
        visible={visible}
        confirmLoading={loading}
        onCancel={() => setVisible(false)}
        onOk={() => {
          noteKind && void add_note_kind();
        }}
      >
        <Input
          prefix={<IconSearch />}
          onChange={(value) => value && setNoteKind(value.trim())}
          showClear
        />
      </Modal>
      <QuestionSideSheet sideV={sideV} setSideV={setSideV}></QuestionSideSheet>
    </>
  );
};

export default QuestionUpload;
