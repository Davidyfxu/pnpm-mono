import { useEffect, useState } from "react";
import { View, Image, Button } from "@tarojs/components";
import Taro from "@tarojs/taro";
import styles from "./index.module.scss";
import { AtIcon } from "taro-ui";
const imgSrc = "http://tuchuang.zaibk.com/2022/11/26/738561d6b9f4a.jpeg";
interface ISize {
  height: number;
  width: number;
}

const Index = () => {
  const [size, setSize] = useState<ISize>({ height: 100, width: 100 });
  useEffect(() => {
    Taro.getSystemInfo({
      success: (res) => {
        console.log(res);
        setSize({
          width: res.windowWidth,
          height: res.windowHeight,
        });
      },
    });
  }, []);
  const goToHome = () => {
    Taro.navigateBack();
  };
  const download = () => {
    Taro.getSetting({
      success: (res1) => {
        if (!res1.authSetting["scope.writePhotosAlbum"]) {
          Taro.authorize({
            scope: "scope.writePhotosAlbum",
            success: () => {},
          });
        }
        Taro.showToast({ title: "开始下载" });
        Taro.downloadFile({
          url: imgSrc,
          success: (res) => {
            Taro.saveImageToPhotosAlbum({
              filePath: res.tempFilePath,
            });
          },
        });
      },
    });
  };
  const onShareAppMessage = () => {
    return {
      title: "分享给好友",
      imageUrl: imgSrc,
      path: "/page/user?id=123",
    };
  };
  const onShareTimeline = () => {
    return {
      title: "分享到我的朋友圈",
      imageUrl: imgSrc,
      path: "/page/user?id=123",
    };
  };

  return (
    <View>
      <Image
        style={{ width: size.width, height: size.height }}
        src={imgSrc}
        mode={"aspectFill"}
      />

      <View className={styles.btnList}>
        <Button plain className={styles.btn} onClick={() => goToHome()}>
          <AtIcon value="chevron-left" size="18" />
          返回
        </Button>
        <Button plain className={styles.btn} onClick={() => download()}>
          <AtIcon value="download" size="18" />
          下载
        </Button>
        <Button
          plain
          openType={"share"}
          className={styles.btn}
          onClick={() => onShareAppMessage()}
        >
          <AtIcon value="share" size="18" />
          分享
        </Button>
      </View>
    </View>
  );
};

export default Index;
