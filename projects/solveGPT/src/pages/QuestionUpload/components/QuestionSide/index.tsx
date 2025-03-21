import { SideSheet, Form, Button, Toast } from "@douyinfe/semi-ui";
import React, { useEffect, useRef, useState } from "react";
import { addNote, getNoteKinds } from "../../../api";
import styles from "./index.module.scss";
import { know_questions_options } from "../../../../utils/const";
const { Input, Select, TextArea, Slider, Rating } = Form;
const QuestionSideSheet = (props: any) => {
  const { sideV, setSideV } = props;
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const ref = useRef({});

  const get_note_kinds = async () => {
    try {
      setLoading(true);
      const { note_kinds = [] } = await getNoteKinds({});
      setCategories(
        note_kinds.map((nk: any) => ({ value: nk?.value, label: nk?.label })),
      );
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };
  const onSubmit = async () => {
    try {
      setLoading(true);
      const { BaseResp } = await addNote(ref.current?.getValues());
      if (!BaseResp?.StatusCode) {
        Toast.success("增加知识点成功");
      } else {
        Toast.error("增加知识点失败");
      }
      setTimeout(() => setSideV(false), 500);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void get_note_kinds();
  }, []);

  return (
    <SideSheet
      title="增加知识点"
      visible={sideV}
      width={640}
      onCancel={() => setSideV(false)}
    >
      <Form getFormApi={(api) => (ref.current = api)}>
        <Select
          className={styles.allWidth}
          field="id"
          label="分类"
          placeholder="请选择小学数学知识点的类别"
          optionList={categories}
          rules={[{ required: true, message: "必填项" }]}
        />
        <Input
          className={styles.allWidth}
          field="term"
          label="概念"
          placeholder="请输入小学数学知识点的概念"
          rules={[{ required: true, message: "必填项" }]}
        />
        <TextArea
          className={styles.allWidth}
          field="definition"
          label="定义"
          placeholder="请填写该数学概念的定义"
          rules={[{ required: true, message: "必填项" }]}
        />
        <Select
          className={styles.allWidth}
          field="knowOrQues"
          label="题目/知识"
          placeholder="请选择题目还是知识"
          optionList={know_questions_options}
          rules={[{ required: true, message: "必填项" }]}
        />
        <Rating
          className={styles.allWidth}
          field="star"
          label="难度星级"
          initValue={2}
        />
        <Slider
          className={styles.allWidth}
          field="download"
          label="下载数量"
          initValue={10}
          max={1000}
        />
      </Form>
      <Button
        theme="solid"
        style={{ margin: "16px 0px" }}
        loading={loading}
        block
        onClick={onSubmit}
      >
        提交
      </Button>
      <Button onClick={() => setSideV(false)} block>
        取消
      </Button>
    </SideSheet>
  );
};

export default QuestionSideSheet;
