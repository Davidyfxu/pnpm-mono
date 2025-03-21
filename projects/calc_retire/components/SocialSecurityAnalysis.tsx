"use client";

import { useState } from "react";
import {
  Form,
  InputNumber,
  Select,
  Button,
  Card,
  Row,
  Col,
  Statistic,
  Divider,
  Alert,
  Progress,
  Tooltip,
  Space,
} from "antd";
import {
  InfoCircleOutlined,
  QuestionCircleOutlined,
  SafetyOutlined,
  DollarOutlined,
  CalculatorOutlined,
} from "@ant-design/icons";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip as RechartsTooltip,
} from "recharts";
import { motion } from "framer-motion";

const { Option } = Select;

// 社保缴纳分析相关常量
const SOCIAL_SECURITY_RATE_EMPLOYEE = 0.08; // 个人缴纳比例
const SOCIAL_SECURITY_RATE_EMPLOYER = 0.16; // 企业缴纳比例
const MIN_CONTRIBUTION_YEARS = 15; // 最低缴纳年限

// Animation variants
const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15,
    },
  },
};

const resultVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15,
    },
  },
};

const SocialSecurityAnalysis = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [chartData, setChartData] = useState<any[]>([]);

  // 计算社保缴纳必要性
  const calculateSocialSecurityNecessity = (values: any) => {
    const {
      age,
      gender,
      monthlySalary,
      contributionYears,
      expectedRetirementAge,
      expectedLifespan,
      otherInvestmentReturn,
    } = values;

    // 计算退休年龄
    const retirementAge =
      expectedRetirementAge || (gender === "male" ? 60 : 55);

    // 计算剩余工作年限
    const remainingWorkYears = retirementAge - age;

    // 计算还需缴纳年限
    const requiredContributionYears = Math.max(
      0,
      MIN_CONTRIBUTION_YEARS - contributionYears,
    );

    // 计算社保缴纳总额
    const monthlyContribution = monthlySalary * SOCIAL_SECURITY_RATE_EMPLOYEE;
    const totalContribution =
      monthlyContribution *
      12 *
      Math.min(remainingWorkYears, requiredContributionYears);

    // 计算预期领取总额
    const retirementYears = expectedLifespan - retirementAge;
    const monthlyPension =
      (monthlySalary *
        0.4 *
        (contributionYears +
          Math.min(remainingWorkYears, requiredContributionYears))) /
      35;
    const totalPension = monthlyPension * 12 * retirementYears;

    // 计算社保投资回报率
    const socialSecurityReturn = totalPension / totalContribution - 1;

    // 计算社保缴纳必要性得分
    let necessityScore = 0;

    // 因素1：是否达到最低缴纳年限
    if (contributionYears < MIN_CONTRIBUTION_YEARS) {
      necessityScore += 40;
    }

    // 因素2：社保回报率与其他投资回报率比较
    if (socialSecurityReturn > otherInvestmentReturn / 100) {
      necessityScore += 30;
    }

    // 因素3：年龄因素
    if (age > 45) {
      necessityScore += 20;
    }

    // 因素4：工资水平
    if (monthlySalary < 10000) {
      necessityScore += 10;
    }

    // 生成图表数据
    const chartData = [
      { name: "社保缴纳总额", value: Math.round(totalContribution) },
      { name: "预期领取总额", value: Math.round(totalPension) },
    ];

    return {
      monthlyContribution,
      totalContribution,
      monthlyPension,
      totalPension,
      socialSecurityReturn: socialSecurityReturn * 100,
      necessityScore,
      requiredContributionYears,
      chartData,
    };
  };

  const handleSubmit = (values: any) => {
    setLoading(true);

    // 模拟计算延迟
    setTimeout(() => {
      try {
        const result = calculateSocialSecurityNecessity(values);
        setResult(result);
        setChartData(result.chartData);
        setLoading(false);
      } catch (error) {
        console.error("计算错误:", error);
        setLoading(false);
      }
    }, 500);
  };

  // 饼图颜色
  const COLORS = ["#3a5ccc", "#34b37c"];

  // 获取必要性评级
  const getNecessityRating = (score: number) => {
    if (score >= 80) return { text: "非常必要", color: "#e15554" };
    if (score >= 60) return { text: "很有必要", color: "#e6a23c" };
    if (score >= 40) return { text: "有必要", color: "#5e81ff" };
    if (score >= 20) return { text: "可选", color: "#34b37c" };
    return { text: "不太必要", color: "#64748b" };
  };

  return (
    <div>
      <motion.div initial="hidden" animate="visible" variants={cardVariants}>
        <Card className="mb-6 glass-card">
          <Alert
            message="关于社保缴纳分析"
            description="本工具基于您的个人情况分析社保缴纳的必要性和回报率，结果仅供参考。实际情况可能因政策调整、个人具体情况等因素而有所不同。"
            type="info"
            showIcon
            icon={<InfoCircleOutlined />}
            style={{ marginBottom: 16 }}
          />

          <Form
            form={form}
            layout="vertical"
            onFinish={handleSubmit}
            initialValues={{
              age: 35,
              gender: "male",
              monthlySalary: 10000,
              contributionYears: 10,
              expectedRetirementAge: 60,
              expectedLifespan: 85,
              otherInvestmentReturn: 5,
            }}
          >
            <Row gutter={24}>
              <Col xs={24} sm={12} md={8}>
                <Form.Item
                  label="当前年龄"
                  name="age"
                  rules={[{ required: true, message: "请输入您的年龄" }]}
                >
                  <InputNumber min={18} max={60} className="w-full" />
                </Form.Item>
              </Col>
              <Col xs={24} sm={12} md={8}>
                <Form.Item
                  label="性别"
                  name="gender"
                  rules={[{ required: true, message: "请选择您的性别" }]}
                >
                  <Select>
                    <Option value="male">男</Option>
                    <Option value="female">女</Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col xs={24} sm={12} md={8}>
                <Form.Item
                  label="月工资（元）"
                  name="monthlySalary"
                  rules={[{ required: true, message: "请输入您的月工资" }]}
                >
                  <InputNumber min={1000} className="w-full" />
                </Form.Item>
              </Col>
              <Col xs={24} sm={12} md={8}>
                <Form.Item
                  label="已缴纳社保年限"
                  name="contributionYears"
                  rules={[
                    { required: true, message: "请输入您已缴纳的社保年限" },
                  ]}
                >
                  <InputNumber min={0} max={40} className="w-full" />
                </Form.Item>
              </Col>
              <Col xs={24} sm={12} md={8}>
                <Form.Item
                  label={
                    <span>
                      预期退休年龄
                      <Tooltip title="如不确定，可留空，系统将根据性别自动填充法定退休年龄">
                        <QuestionCircleOutlined className="ml-1" />
                      </Tooltip>
                    </span>
                  }
                  name="expectedRetirementAge"
                >
                  <InputNumber min={50} max={70} className="w-full" />
                </Form.Item>
              </Col>
              <Col xs={24} sm={12} md={8}>
                <Form.Item
                  label="预期寿命"
                  name="expectedLifespan"
                  rules={[{ required: true, message: "请输入您的预期寿命" }]}
                >
                  <InputNumber min={60} max={100} className="w-full" />
                </Form.Item>
              </Col>
              <Col xs={24} sm={12} md={8}>
                <Form.Item
                  label={
                    <span>
                      其他投资年回报率（%）
                      <Tooltip title="如您不缴纳社保，而是将这笔钱用于其他投资，预期的年回报率">
                        <QuestionCircleOutlined className="ml-1" />
                      </Tooltip>
                    </span>
                  }
                  name="otherInvestmentReturn"
                  rules={[
                    { required: true, message: "请输入其他投资年回报率" },
                  ]}
                >
                  <InputNumber min={0} max={20} className="w-full" />
                </Form.Item>
              </Col>
            </Row>

            <Form.Item className="text-center mt-4">
              <Button
                type="primary"
                htmlType="submit"
                loading={loading}
                size="large"
                icon={<CalculatorOutlined />}
                className="min-w-[150px]"
              >
                计算分析
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </motion.div>

      {result && (
        <motion.div
          initial="hidden"
          animate="visible"
          variants={resultVariants}
        >
          <Card className="mb-6 glass-card">
            <Row gutter={[24, 24]}>
              <Col xs={24} md={12}>
                <Card
                  title={
                    <div className="flex items-center">
                      <SafetyOutlined className="mr-2 text-primary-color" />
                      <span>社保缴纳必要性分析</span>
                    </div>
                  }
                  bordered={false}
                  className="h-full shadow-sm"
                >
                  <div className="text-center mb-6">
                    <Progress
                      type="dashboard"
                      percent={result.necessityScore}
                      format={(percent) => (
                        <div className="text-center">
                          <div className="text-2xl font-semibold">
                            {percent}%
                          </div>
                          <div className="text-sm text-neutral-500">
                            必要性得分
                          </div>
                        </div>
                      )}
                      strokeColor={
                        getNecessityRating(result.necessityScore).color
                      }
                    />
                    <div className="mt-4">
                      <div
                        className="text-lg font-medium"
                        style={{
                          color: getNecessityRating(result.necessityScore)
                            .color,
                        }}
                      >
                        {getNecessityRating(result.necessityScore).text}
                      </div>
                      <div className="text-neutral-500 mt-1">
                        {result.requiredContributionYears > 0
                          ? `您还需缴纳至少 ${result.requiredContributionYears} 年才能达到最低缴纳年限`
                          : "您已达到社保最低缴纳年限要求"}
                      </div>
                    </div>
                  </div>

                  <Divider />

                  <Row gutter={[16, 16]}>
                    <Col span={12}>
                      <Statistic
                        title="每月缴纳金额"
                        value={result.monthlyContribution.toFixed(2)}
                        precision={2}
                        suffix="元"
                      />
                    </Col>
                    <Col span={12}>
                      <Statistic
                        title="预计每月领取"
                        value={result.monthlyPension.toFixed(2)}
                        precision={2}
                        suffix="元"
                        valueStyle={{ color: "#3a5ccc" }}
                      />
                    </Col>
                    <Col span={12}>
                      <Statistic
                        title="社保回报率"
                        value={result.socialSecurityReturn.toFixed(2)}
                        precision={2}
                        suffix="%"
                        valueStyle={{
                          color:
                            result.socialSecurityReturn > 0
                              ? "#34b37c"
                              : "#e15554",
                        }}
                      />
                    </Col>
                    <Col span={12}>
                      <Statistic
                        title="其他投资回报率"
                        value={form.getFieldValue("otherInvestmentReturn")}
                        precision={2}
                        suffix="%"
                      />
                    </Col>
                  </Row>
                </Card>
              </Col>

              <Col xs={24} md={12}>
                <Card
                  title={
                    <div className="flex items-center">
                      <DollarOutlined className="mr-2 text-success-color" />
                      <span>社保缴纳与领取对比</span>
                    </div>
                  }
                  bordered={false}
                  className="h-full shadow-sm"
                >
                  <div className="chart-container">
                    <ResponsiveContainer width="100%" height={250}>
                      <PieChart>
                        <Pie
                          data={chartData}
                          cx="50%"
                          cy="50%"
                          labelLine={true}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                          label={({ name, percent }) =>
                            `${name}: ${(percent * 100).toFixed(0)}%`
                          }
                        >
                          {chartData.map((entry, index) => (
                            <Cell
                              key={`cell-${index}`}
                              fill={COLORS[index % COLORS.length]}
                            />
                          ))}
                        </Pie>
                        <Legend />
                        <RechartsTooltip
                          formatter={(value) => `${value.toLocaleString()} 元`}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>

                  <Divider />

                  <Row gutter={[16, 16]}>
                    <Col span={12}>
                      <Statistic
                        title="社保缴纳总额"
                        value={result.totalContribution.toFixed(2)}
                        precision={2}
                        suffix="元"
                      />
                    </Col>
                    <Col span={12}>
                      <Statistic
                        title="预期领取总额"
                        value={result.totalPension.toFixed(2)}
                        precision={2}
                        suffix="元"
                        valueStyle={{ color: "#3a5ccc" }}
                      />
                    </Col>
                    <Col span={24}>
                      <Alert
                        message="投资建议"
                        description={
                          result.socialSecurityReturn >
                          form.getFieldValue("otherInvestmentReturn")
                            ? "社保投资回报率高于您的其他投资回报率，建议优先考虑社保缴纳。"
                            : "您的其他投资回报率高于社保投资回报率，可以考虑将部分资金用于其他投资渠道。"
                        }
                        type={
                          result.socialSecurityReturn >
                          form.getFieldValue("otherInvestmentReturn")
                            ? "success"
                            : "warning"
                        }
                        showIcon
                      />
                    </Col>
                  </Row>
                </Card>
              </Col>
            </Row>
          </Card>
        </motion.div>
      )}
    </div>
  );
};

export default SocialSecurityAnalysis;
