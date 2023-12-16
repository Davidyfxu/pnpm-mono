import React, { useEffect, useState } from "react";
import styles from "./index.module.css";
import {
  Avatar,
  Button,
  ButtonGroup,
  Input,
  List,
  Typography,
} from "@douyinfe/semi-ui";
import _ from "lodash";
import { IconPlus } from "@douyinfe/semi-icons";
const DEFAULT_CDN = "https://cdn2.thecatapi.com/images/MTY5NDM3MA.jpg";
interface DataLine {
  content: string;
  complete: boolean;
}
const ToDo = () => {
  const { Text } = Typography;
  const [pic, setPic] = useState(DEFAULT_CDN);
  const [inputValue, setInputValue] = useState("");
  const [list, setList] = useState<DataLine[]>([]);
  const getPic = async () => {
    try {
      const res = await fetch("https://api.thecatapi.com/v1/images/search");
      const respData = await res.json();
      setPic(respData[0].url);
      console.log(respData[0]);
    } catch (e) {
      console.error(e);
    }
  };
  const onAddClick = () => {
    if (!_.isEmpty(inputValue)) {
      setList([...list, { content: inputValue, complete: false }]);
      setInputValue("");
    }
  };
  const onDeleteClick = (i: number) => {
    setList(list.filter((item, index: number) => index !== i));
  };
  const onFinishClick = (i: number) =>
    setList(
      list.map((item, index: number) => {
        if (index === i) item.complete = !item.complete;
        return item;
      })
    );

  useEffect(() => {
    void getPic();
  }, []);

  return (
    <div className={styles.body}>
      <h2>Todos</h2>
      <List
        className={styles.list}
        dataSource={list}
        split={false}
        emptyContent={"No todo"}
        header={
          <Input
            value={inputValue}
            placeholder="Enter your todo"
            onChange={(v) => setInputValue(v)}
            suffix={
              <IconPlus style={{ cursor: "pointer" }} onClick={onAddClick} />
            }
          />
        }
        size="small"
        style={{
          flexBasis: "100%",
          flexShrink: 0,
          borderBottom: "1px solid var(--semi-color-border)",
        }}
        renderItem={(item, i: number) => (
          <List.Item
            header={<Avatar size={"extra-small"} src={pic} />}
            main={<Text delete={item.complete}>{item.content}</Text>}
            style={{ alignItems: "center" }}
            extra={
              <ButtonGroup theme="borderless">
                <Button onClick={() => onDeleteClick(i)}>Delete</Button>
                <Button onClick={() => onFinishClick(i)}>
                  {item.complete ? "Rollback" : "Finish"}
                </Button>
              </ButtonGroup>
            }
          />
        )}
      ></List>
    </div>
  );
};

export default ToDo;
