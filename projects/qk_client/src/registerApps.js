import { registerMicroApps, start } from "qiankun";

const loader = (loading) => {
  console.log(loading);
};

registerMicroApps(
  [
    {
      name: "micro1", // app name registered
      entry: "//localhost:3010",
      container: "#container",
      activeRule: "/micro1",
      loader,
    },
    {
      name: "micro2", // app name registered
      entry: "//localhost:3020",
      container: "#container",
      activeRule: "/micro2",
      loader,
    },
  ],
  {
    // 乾坤为我们提供了一系列的生命周期函数，会在子应用加载前后生效
    beforeLoad: () => {
      console.log("子应用加载前");
    },
    beforeMount: () => {
      console.log("子应用挂载前");
    },
    afterMount: () => {
      console.log("子应用挂载后");
    },
    beforeUnmount: () => {
      console.log("子应用销毁前");
    },
    afterUnmount: () => {
      console.log("子应用销毁后");
    },
  }
);

// 调用start用于启动子应用
start({
  sandbox: {
    experimentalStyleIsolation: true,
  },
});
