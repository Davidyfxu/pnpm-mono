import React, { useEffect, useRef, useState } from "react";
import {
  Button,
  Card,
  Descriptions,
  Form,
  Space,
  Table,
  Toast,
  Typography,
  Upload,
} from "@douyinfe/semi-ui";
const { Title } = Typography;
import styles from "./index.module.scss";
import {
  age_options,
  columns,
  get_desc_list,
  lang_options,
  model_options,
} from "../../utils/const";
import { getAll, getOCR } from "../api";
import { postForm } from "../../utils/utils";
import { IconUpload } from "@douyinfe/semi-icons";

const Chat = () => {
  const [refresh, setRefresh] = useState(0);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [pdfLoad, setPdfLoad] = useState(false);
  const [questions, setQuestions] = useState([]);
  const ref = useRef({});
  const [tLoading, setTLoading] = useState(false);
  const [answer, setAnswer] = useState<any>({});
  const get_table_all = async () => {
    try {
      setTLoading(true);
      const { data } = await getAll({});
      setQuestions(data);
    } catch (e) {
      console.error(e);
    } finally {
      setTLoading(false);
    }
  };

  const handleUpload = async ({ file, fileList }) => {
    try {
      const reader = new FileReader();
      reader.onloadend = async function () {
        const base64String = reader.result;
        setUploading(true);
        const { data = [], success } = await getOCR({
          imageLink: base64String,
        });
        ref.current?.setValue(
          "text",
          data.map((v) => v?.DetectedText).join(" "),
        );
        setUploading(false);
        success && Toast.success("识别成功");
      };
      // 读取文件内容
      reader.readAsDataURL(fileList[0].fileInstance);
    } catch (e) {
      console.error("customRequest", e);
    } finally {
      setLoading(false);
    }
  };

  const submit = async () => {
    try {
      setLoading(true);
      let formData = new FormData();
      const formV = ref.current?.getValues() || {};
      Object.keys(formV).forEach((k) => formData.append(k, formV[k]));
      const { data, success } = await postForm("/submitText", formData);
      setAnswer(data);
      success && Toast.success("解题成功");
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };
  const save = async () => {
    try {
      let formData = new FormData();
      Object.keys(answer).forEach((k) => formData.append(k, answer[k]));
      const { success } = await postForm("/save", formData);
      success && Toast.success("存知识库成功");
      setTimeout(() => setRefresh((r) => r + 1), 500);
    } catch (e) {
      console.error(e);
    }
  };
  const createPDF = async () => {
    try {
      setPdfLoad(true);
      let formData = new FormData();
      Object.keys(answer).forEach((k) => formData.append(k, answer[k]));
      const { data } = await postForm("/pdf", formData);
      if (data?.pdf_url) {
        window.open(`http://118.89.117.111${data?.pdf_url}`, "_blank");
      }
    } catch (e) {
      console.error(e);
    } finally {
      setPdfLoad(false);
    }
  };

  useEffect(() => {
    void get_table_all();
  }, [refresh]);

  return (
    <div className={styles.container}>
      <Card title={<Title>SolveGPT--AI集智数学老师</Title>}>
        <Form getFormApi={(api) => (ref.current = api)}>
          <Form.Select
            className={styles.item}
            initValue={"gpt-3.5-turbo"}
            field="model"
            label={"支持模型列表:"}
            placeholder={"请选择模型"}
            optionList={model_options}
          />
          <Form.Select
            className={styles.item}
            initValue={"Chinese"}
            field="language"
            label={"答案语种设置:"}
            placeholder={"请选择答案语种"}
            optionList={lang_options}
          />
          <Form.Select
            className={styles.item}
            field="age"
            label={"使用年龄阶段选项:"}
            placeholder={"请选择使用年龄阶段"}
            optionList={age_options}
            initValue={"小学生"}
          />
          <Form.TextArea
            className={styles.item}
            field="text"
            label={"问题:"}
            placeholder={"请输入想问的问题"}
            showCounter
            maxCount={500}
          />
          <Space>
            <Upload
              limit={1}
              action={"upload"}
              showUploadList={false}
              beforeUpload={handleUpload}
            >
              <Button loading={uploading} theme="solid" type="warning">
                图片转文字
              </Button>
            </Upload>
            <Button
              loading={loading}
              type="primary"
              theme="solid"
              onClick={submit}
            >
              一键解题
            </Button>
            <Button theme="solid" type="secondary" onClick={save}>
              存知识库
            </Button>
            <Button
              loading={pdfLoad}
              theme="solid"
              type="tertiary"
              onClick={createPDF}
            >
              查看PDF
            </Button>
          </Space>
        </Form>
      </Card>

      <Card
        style={{ backgroundColor: "rgba(var(--semi-blue-0), 1)" }}
        title={<Title>知识与答案</Title>}
        loading={loading}
      >
        <Descriptions size="large" data={get_desc_list(answer)} />
      </Card>
      <Card title={<Title>知识宝库</Title>}>
        <Table loading={tLoading} columns={columns} dataSource={questions} />
      </Card>
    </div>
  );
};

export default Chat;
