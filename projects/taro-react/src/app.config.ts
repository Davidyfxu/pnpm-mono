export default defineAppConfig({
  pages: ["pages/index/index", "pages/detail/index", "pages/user/index"],
  window: {
    backgroundTextStyle: "light",
    navigationBarBackgroundColor: "#fff",
    navigationBarTitleText: "WeChat",
    navigationBarTextStyle: "black",
  },
  tabBar: {
    color: "#8a9a9a",
    selectedColor: "#FF0000",
    backgroundColor: "#fafafa",
    borderStyle: "black",
    list: [
      {
        pagePath: "pages/index/index",
        iconPath: "./static/tabBar/home.png",
        selectedIconPath: "./static/tabBar/home_selected.png",
        text: "首页",
      },
      {
        pagePath: "pages/user/index",
        iconPath: "./static/tabBar/user.png",
        selectedIconPath: "./static/tabBar/user_selected.png",
        text: "我的",
      },
      // {
      //   pagePath: "pages/detail/index",
      //   iconPath: "./static/tabBar/category.png",
      //   selectedIconPath: "./static/tabBar/category_selected.png",
      //   text: "目录",
      // },
    ],
  },
});
