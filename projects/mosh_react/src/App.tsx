import * as React from "react";
import CounterComp from "./state-management/counter_reducer";
import CounterNew from "./state-management/counter";

import {
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import {Button, Input, Space} from "@douyinfe/semi-ui";
import {bigModel} from "./utils.tsx";
import {useState} from "react";

const queryClient = new QueryClient();

const App = () => {
  const [inputV, setInputV] = useState('')
  const [out, setOut] = useState();
  return (
    <QueryClientProvider client={queryClient}>
      <CounterComp />
      <CounterNew />
      {/*<ReactQueryComp/>*/}
      <Space>
      <Input onChange={(value)=>setInputV(value)} value={inputV}></Input>
      <Button onClick={()=>bigModel.start(inputV,(r)=>setOut(r))}>提交</Button>
      </Space>
      {out}
    </QueryClientProvider>
  );
};

export default App;
