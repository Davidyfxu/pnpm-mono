import React from "react";
import { Carousel, Space, Typography } from "@douyinfe/semi-ui";

const HomeCarousel = () => {
  const { Title, Paragraph } = Typography;

  const style = {
    width: "100%",
    height: "400px",
  };

  const titleStyle = {
    position: "absolute",
    top: "100px",
    left: "100px",
    color: "#1C1F23",
  };

  const colorStyle = {
    color: "#1C1F23",
  };

  const renderLogo = () => {
    return (
      <img
        src="https://i.postimg.cc/hPGmrvNj/solveGPT.png"
        alt="solveGPT"
        style={{ width: 87, height: 31 }}
      />
    );
  };

  const imgList = [
    "https://lf3-static.bytednsdoc.com/obj/eden-cn/hjeh7pldnulm/SemiDocs/bg-1.png",
    "https://lf3-static.bytednsdoc.com/obj/eden-cn/hjeh7pldnulm/SemiDocs/bg-2.png",
    "https://lf3-static.bytednsdoc.com/obj/eden-cn/hjeh7pldnulm/SemiDocs/bg-3.png",
  ];

  const textList = [
    ["SolveGPT", "AI集智数学老师——会解，更会教", "浙江大学研究生创业项目"],
    [
      "SolveGPT——AI集智数学老师",
      "支持个性化输入(Personalize Input)，因材施教，支持拍照解题",
      "自研多模型对抗(Adversarial Learning)，用于提高求解准确性",
      "自研准确率判断(Accuracy Analysis)，用于评估解题答案的准确率",
      "自研知识点讲解(Knowledge Explain)，全自动化生成数学讲义",
    ],
    [
      "应用前景",
      "课外辅导市场：小初高课外学习的智能化、准确率高且快速便捷的辅导老师",
      "学科竞赛市场：题目难度大、涉及知识面广且辅导成本高昂的知识学习助手",
      "大学专业学科：复习，预习知识助手，能够快速提示对应知识，节约时间",
    ],
  ];
  return (
    <Carousel style={style} theme="dark">
      {imgList.map((src, index) => {
        return (
          <div
            key={index}
            style={{ backgroundSize: "cover", backgroundImage: `url(${src})` }}
          >
            <Space vertical align="start" spacing="medium" style={titleStyle}>
              {renderLogo()}
              <Title heading={2} style={colorStyle}>
                {textList[index][0]}
              </Title>
              <Space vertical align="start">
                {textList[index].slice(1).map((t) => (
                  <Paragraph style={colorStyle}>{t}</Paragraph>
                ))}
              </Space>
            </Space>
          </div>
        );
      })}
    </Carousel>
  );
};

export default HomeCarousel;
