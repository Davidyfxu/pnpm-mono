import "./App.css";
import OffersGPT from "./OffersGPT";
import { Popover } from "antd";
import React from "react";
import payment from "./assets/payment.jpg";

function App() {
  return (
    <div>
      <div className="w-full navbar bg-base-100">
        <div className="flex-none">
          <button className="btn btn-square btn-ghost">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="inline-block w-5 h-5 stroke-current"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              ></path>
            </svg>
          </button>
        </div>
        <div className="flex-1">
          <a className="btn btn-ghost normal-case text-xl">98 GPT小助手</a>
        </div>
        <div className="flex-none">
          <button className="btn btn-square btn-ghost">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="inline-block w-5 h-5 stroke-current"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"
              ></path>
            </svg>
          </button>
        </div>
      </div>
      <OffersGPT />

      <div className={"absolute bottom-16 right-16"}>
        <Popover
          placement="topLeft"
          content={
            <div className={"p-2"}>
              <img className={"w-56"} src={payment} alt="" />
            </div>
          }
          trigger={"click"}
        >
          <button className="btn btn-ghost">请作者喝杯奶茶</button>
        </Popover>
      </div>
    </div>
  );
}

export default App;
