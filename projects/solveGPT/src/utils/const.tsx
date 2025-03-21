import { Typography } from "@douyinfe/semi-ui";
const { Text } = Typography;
import _ from "lodash";
export const model_options = [
  { value: "gpt-4-0613", label: "gpt-4-0613" },
  { value: "gpt-4", label: "gpt-4" },
  { value: "gpt-3.5-turbo-0613", label: "gpt-3.5-turbo-0613" },
  { value: "gpt-3.5-turbo", label: "gpt-3.5-turbo" },
];
export const lang_options = [
  { value: "Chinese", label: "中文" },
  { value: "English", label: "英文" },
];
export const age_options = [
  { value: "小学生", label: "小学" },
  { value: "中学生", label: "中学" },
  { value: "高中生", label: "高中" },
  { value: "大学生", label: "大学" },
];
export const get_desc_list = (answer: any) =>
  _.isEmpty(answer)
    ? []
    : [
        {
          key: "准确度",
          value: (
            <Text strong type="success">
              {answer?.accuracy}%
            </Text>
          ),
        },
        { key: "答案", value: answer?.answer },
        { key: "定义", value: answer?.definition },
        { key: "问题", value: answer?.question },
        { key: "理论", value: answer?.theorem },
      ];

export const columns = [
  {
    title: "Question",
    dataIndex: "question",
  },
  {
    title: "Answer",
    dataIndex: "answer",
  },
  {
    title: "Theorem",
    dataIndex: "theorem",
  },
  {
    title: "Definition",
    dataIndex: "definition",
  },
];

export const know_questions_options = [
  { value: "题目", label: "题目" },
  { value: "知识", label: "知识" },
];
