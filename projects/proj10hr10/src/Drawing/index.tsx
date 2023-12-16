import React, { useRef, useState } from "react";
import styles from "./index.module.css";
import { ReactSketchCanvas } from "react-sketch-canvas";
import { Button, Input, Slider } from "@douyinfe/semi-ui";

const Drawing = () => {
  const canvasRef = useRef<any>();
  const [strokeWidth, setStrokeWidth] = useState<number>(30);
  const [color, setColor] = useState("black");
  return (
    <div className={styles.body}>
      <ReactSketchCanvas
        ref={canvasRef}
        className={styles.canvas}
        width={"80%"}
        height={"70%"}
        strokeWidth={strokeWidth}
        strokeColor={color}
      />
      <div className={styles.toolbox}>
        <Slider
          className={styles.slider}
          showBoundary={true}
          defaultValue={strokeWidth}
          onChange={(v) => {
            setStrokeWidth(Number(v));
          }}
        />
        <Input
          className={styles.color}
          type="color"
          onChange={(v) => {
            setColor(v);
          }}
        />
        <Button onClick={() => canvasRef.current.clearCanvas()}>Clear</Button>
        <Button
          onClick={() => {
            canvasRef.current
              .exportImage("png")
              .then((data: any) => {
                let a = document.createElement("a"); //Create <a>
                a.href = data; //Image Base64 Goes here
                a.download = "Image.png"; //File name Here
                a.click(); //Downloaded file
              })
              .catch((e: any) => {
                console.log(e);
              });
          }}
        >
          Get Image
        </Button>
      </div>
    </div>
  );
};

export default Drawing;
