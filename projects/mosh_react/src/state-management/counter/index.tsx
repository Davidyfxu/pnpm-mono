import React from "react";
import useCounterStore from "./store";

const CounterNew = () => {
  const { counter, increment, reset } = useCounterStore();
  return (
    <>
      <h1 className="text-3xl font-bold underline p-2">Zustand</h1>
      <div className="p-2 flex flex-col gap-1">
        <div>{counter}</div>
        <button className={"btn"} onClick={increment}>
          add
        </button>
        <button className={"btn btn-danger"} onClick={reset}>
          reset
        </button>
      </div>
    </>
  );
};

export default CounterNew;
