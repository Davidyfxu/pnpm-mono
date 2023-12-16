import React,{useReducer, useState} from "react";
import CounterReducer from "./CounterReducer";
import { SideSheet, Button } from '@douyinfe/semi-ui';

const CounterComp = () => {
  const [counter, dispatch] = useReducer(CounterReducer, 0);
  const [visible, setVisible] = useState(false);
  const change = () => {
    setVisible(!visible);
  };
  return (
    <>
      <h1 className="text-3xl font-bold underline p-2">UseReducer</h1>
      <div className="p-2 bg-[#1da1f2] text-white flex flex-col gap-1">
        <div>{counter}</div>
        <button className={"btn"} onClick={() => dispatch({ type: "ADD" })}>
          add
        </button>
        <button
          className={"btn btn-danger"}
          onClick={() => dispatch({ type: "SUB" })}
        >
          sub
        </button>
      </div>
      <Button onClick={change} className={'btn btn-danger'}>Open SideSheet</Button>
      <SideSheet title="滑动侧边栏" visible={visible} onCancel={change}>
        <p>This is the content of a basic sidesheet.</p>
        <p>Here is more content...</p>
      </SideSheet>
    </>
  );
};
export default CounterComp;
