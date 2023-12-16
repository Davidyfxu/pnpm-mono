import { View, Image } from "@tarojs/components";
import styles from "./index.module.scss";
import { useEffect, useState } from "react";
import Taro from "@tarojs/taro";
interface IImage {
  id: number;
  url: string;
}

const Index = () => {
  const [images, setImages] = useState<IImage[]>([]);
  const goToDetail = (imgItem: IImage) => {
    Taro.navigateTo({
      url: "/pages/detail/index?id=" + imgItem.id,
    });
  };

  useEffect(() => {
    setTimeout(() => {
      const res: IImage[] = [];
      for (let i = 0; i < 10; i++) {
        res.push({
          id: i,
          url: "http://tuchuang.zaibk.com/2022/11/25/03c64d7bac6cc.png",
        });
      }
      setImages(res);
    }, 1000);
  });

  return (
    <View>
      {images.map((item) => (
        <View
          className={styles.picContainer}
          onClick={() => goToDetail(item)}
          key={item.id}
        >
          <Image
            className={styles.picImg}
            mode={"scaleToFill"}
            src={item.url}
          />
        </View>
      ))}
    </View>
  );
};

export default Index;
