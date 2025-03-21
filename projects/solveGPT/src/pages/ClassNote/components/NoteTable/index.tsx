import React, { useMemo, useState } from "react";
import { DndProvider, DragSource, DropTarget } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import {
  Button,
  Card,
  Progress,
  Rating,
  Space,
  Table,
  Toast,
  Typography,
} from "@douyinfe/semi-ui";
const { Title } = Typography;
import { format } from "date-fns";
import { exportFile, exportPDF } from "../../../../utils/utils";
import { deleteNote, deleteNoteKind } from "../../../api";
let draggingIndex = -1;
function BodyRow(props) {
  const {
    isOver,
    connectDragSource,
    connectDropTarget,
    moveRow,
    currentPage,
    ...restProps
  } = props;
  const style = { ...restProps.style, cursor: "move" };

  let { className } = restProps;
  if (isOver) {
    console.log("true");
    if (restProps.index > draggingIndex) {
      className += " drop-over-downward";
    }
    if (restProps.index < draggingIndex) {
      className += " drop-over-upward";
    }
  }

  return connectDragSource(
    connectDropTarget(
      <tr {...restProps} className={className} style={style} />,
    ),
  );
}

const rowSource = {
  beginDrag(props) {
    draggingIndex = props.index;
    return {
      index: props.index,
    };
  },
};

const rowTarget = {
  drop(props, monitor) {
    const dragIndex = monitor.getItem().index;
    const hoverIndex = props.index;

    if (dragIndex === hoverIndex) {
      return;
    }

    props.moveRow(dragIndex, hoverIndex);

    monitor.getItem().index = hoverIndex;
  },
};

const DraggableBodyRow = DropTarget("row", rowTarget, (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
  isOver: monitor.isOver(),
}))(
  DragSource("row", rowSource, (connect) => ({
    connectDragSource: connect.dragSource(),
  }))(BodyRow),
);
const NoteTable = (props: any) => {
  const { noteList, kindMap, loading, setNoteList, setLoading, setRefresh } =
    props;
  const [exportItems, setExportItems] = useState([]);
  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      setExportItems(selectedRows);
    },
  };
  const components = useMemo(
    () => ({
      body: {
        row: DraggableBodyRow,
      },
    }),
    [],
  );

  const delete_note = async (_id: string) => {
    try {
      setLoading(true);
      const { result } = await deleteNote({ _id });
      if (result?.deletedCount > 0) {
        Toast.success("删除成功");
        setTimeout(() => setRefresh((r) => r + 1), 500);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };
  const delete_note_kind = async (id: string) => {
    try {
      const { result } = await deleteNoteKind({ _id: kindMap[id]?._id });
      if (result?.deletedCount > 0) {
        Toast.success("删除成功");
        setTimeout(() => window.location.reload(), 500);
      }
    } catch (e) {
      console.error(e);
    }
  };
  const columns = [
    {
      title: "分类",
      dataIndex: "id",
      width: 90,
      filters: Object.keys(kindMap).map((k) => ({
        value: k,
        text: kindMap[k]?.label,
      })),
      onFilter: (value, record) => String(record.id) === value,
      render: (text: number) => kindMap[text]?.label,
    },
    {
      title: "概念",
      dataIndex: "term",
      width: 120,
      render: (text: string) => text,
    },
    {
      title: "定义",
      dataIndex: "definition",
      width: 300,
      render: (text: string) => text,
    },
    {
      title: "题目/知识",
      dataIndex: "knowOrQues",
      width: 120,
      filters: [
        {
          value: "题目",
          text: "题目",
        },
        {
          value: "知识",
          text: "知识",
        },
      ],
      onFilter: (value, record) => record?.knowOrQues === value,
      render: (text: string) => text,
    },
    {
      title: "创建时间",
      dataIndex: "createdAt",
      width: 160,
      sorter: (a: any, b: any) =>
        new Date(a.createdAt).getTime() > new Date(b.createdAt).getTime(),
      render: (text: string) => format(new Date(text), "yyyy-MM-dd HH:mm"),
    },
    {
      title: "更新时间",
      dataIndex: "updatedAt",
      width: 160,
      sorter: (a: any, b: any) =>
        new Date(a.updatedAt).getTime() > new Date(b.updatedAt).getTime(),
      render: (text: string) => format(new Date(text), "yyyy-MM-dd HH:mm"),
    },
    {
      title: "下载数量",
      dataIndex: "download",
      width: 150,
      sorter: (a: any, b: any) => a.download - b.download,
      render: (text: number) => (
        <Progress
          percent={text / 10}
          format={(p) => p * 10}
          showInfo
          type="circle"
          width={100}
          aria-label="disk usage"
        />
      ),
    },
    {
      title: "难度星级",
      dataIndex: "star",
      width: 200,
      sorter: (a: any, b: any) => a.star - b.star,
      render: (text: number) => <Rating disabled defaultValue={text} />,
    },
    {
      title: "操作",
      dataIndex: "_id",
      render: (text: string, record: any) => (
        <Space>
          <Button onClick={() => delete_note(text)}>删除概念</Button>
          <Button onClick={() => delete_note_kind(record?.id)}>删除分类</Button>
        </Space>
      ),
    },
  ];

  const moveRow = (dragIndex, hoverIndex) => {
    const totalDragIndex = dragIndex;
    const totalHoverIndex = hoverIndex;
    const dragRow = noteList[totalDragIndex];
    const newData = [...noteList];
    newData.splice(totalDragIndex, 1);
    newData.splice(totalHoverIndex, 0, dragRow);
    setNoteList(newData);
  };
  return (
    <div style={{ display: "flex", gap: 16 }}>
      <div style={{ width: "75%" }}>
        <DndProvider backend={HTML5Backend}>
          <Table
            bordered
            loading={loading}
            columns={columns}
            dataSource={noteList}
            components={components}
            rowSelection={rowSelection}
            onRow={(record, index) => ({
              index,
              moveRow,
            })}
          />
        </DndProvider>
      </div>
      <Space
        vertical
        style={{
          width: "100%",
        }}
      >
        <div
          style={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Title>预览区</Title>
          <Button theme="solid" onClick={() => exportFile(exportItems)}>
            导出Excel
          </Button>
          <Button theme="solid" onClick={() => exportPDF(exportItems)}>
            导出课件
          </Button>
        </div>
        {exportItems.map((c) => (
          <Card
            style={{
              width: "100%",
              backgroundColor: "rgba(var(--semi-light-blue-0), 1)",
            }}
            title={c?.term}
          >
            {c?.definition}
          </Card>
        ))}
      </Space>
    </div>
  );
};

export default NoteTable;
