"use client";

import { useState } from "react";
import {
  Form,
  Input,
  Select,
  Button,
  Card,
  Row,
  Col,
  Statistic,
  Divider,
  Alert,
  InputNumber,
  DatePicker,
  Typography,
} from "antd";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import {
  InfoCircleOutlined,
  CalculatorOutlined,
  BankOutlined,
  DollarOutlined,
  PercentageOutlined,
} from "@ant-design/icons";
import { motion, AnimatePresence } from "framer-motion";

const { Option } = Select;
const { Title, Text } = Typography;

// 中国养老金计算相关常量
const BASIC_PENSION_RATE = 0.01; // 基础养老金计算比例
const PERSONAL_ACCOUNT_RATE = 0.12; // 个人账户养老金计算比例
const SOCIAL_AVERAGE_SALARY_BEIJING = 10000; // 北京市社会平均工资（示例数据）
const SOCIAL_AVERAGE_SALARY_SHANGHAI = 9500; // 上海市社会平均工资（示例数据）
const SOCIAL_AVERAGE_SALARY_GUANGZHOU = 8500; // 广州市社会平均工资（示例数据）
const SOCIAL_AVERAGE_SALARY_OTHER = 7000; // 其他地区社会平均工资（示例数据）

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
  exit: {
    opacity: 0,
    y: -20,
    transition: {
      duration: 0.3,
    },
  },
};

const formItemVariants = {
  hidden: { opacity: 0, x: -10 },
  visible: (custom: number) => ({
    opacity: 1,
    x: 0,
    transition: {
      delay: custom * 0.1,
      duration: 0.5,
    },
  }),
};

const resultVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15,
      duration: 0.5,
    },
  },
};

const RetirementCalculator = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [chartData, setChartData] = useState<any[]>([]);

  // 获取社会平均工资
  const getSocialAverageSalary = (city: string) => {
    switch (city) {
      case "beijing":
        return SOCIAL_AVERAGE_SALARY_BEIJING;
      case "shanghai":
        return SOCIAL_AVERAGE_SALARY_SHANGHAI;
      case "guangzhou":
        return SOCIAL_AVERAGE_SALARY_GUANGZHOU;
      default:
        return SOCIAL_AVERAGE_SALARY_OTHER;
    }
  };

  // 计算养老金
  const calculatePension = (values: any) => {
    const { age, gender, city, monthlySalary, workYears, contributionYears } =
      values;

    // 获取社会平均工资
    const socialAverageSalary = getSocialAverageSalary(city);

    // 计算个人账户累计金额（假设个人缴费比例为8%）
    const personalAccountTotal = monthlySalary * 0.08 * 12 * contributionYears;

    // 计算基础养老金
    const basicPension =
      ((socialAverageSalary * (1 + monthlySalary / socialAverageSalary)) / 2) *
      contributionYears *
      BASIC_PENSION_RATE;

    // 计算个人账户养老金（假设退休后平均预期寿命为20年）
    const personalAccountPension = personalAccountTotal / (20 * 12);

    // 总养老金
    const totalPension = basicPension + personalAccountPension;

    // 替代率（养老金与退休前工资的比例）
    const replacementRate = (totalPension / monthlySalary) * 100;

    // 生成图表数据
    const chartData = [
      { name: "基础养老金", 金额: Math.round(basicPension) },
      { name: "个人账户养老金", 金额: Math.round(personalAccountPension) },
      { name: "总养老金", 金额: Math.round(totalPension) },
    ];

    return {
      basicPension,
      personalAccountPension,
      totalPension,
      replacementRate,
      chartData,
    };
  };

  const handleSubmit = (values: any) => {
    setLoading(true);

    // 模拟计算延迟
    setTimeout(() => {
      try {
        const result = calculatePension(values);
        setResult(result);
        setChartData(result.chartData);
        setLoading(false);
      } catch (error) {
        console.error("计算错误:", error);
        setLoading(false);
      }
    }, 500);
  };

  // 获取替代率评级
  const getReplacementRating = (rate: number) => {
    if (rate >= 70) return { text: "优秀", color: "#34b37c" };
    if (rate >= 60) return { text: "良好", color: "#5e81ff" };
    if (rate >= 50) return { text: "一般", color: "#e6a23c" };
    return { text: "不足", color: "#e15554" };
  };

  return (
    <div>
      <motion.div initial="hidden" animate="visible" variants={cardVariants}>
        <Card className="mb-6 glass-card">
          <Alert
            message="关于退休金计算"
            description="本计算器根据中国现行养老保险政策提供退休金估算，结果仅供参考。实际退休金金额可能因政策调整、个人缴费基数变化等因素而有所不同。"
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
              city: "beijing",
              monthlySalary: 10000,
              workYears: 15,
              contributionYears: 15,
            }}
          >
            <Row gutter={24}>
              <Col xs={24} sm={12} md={8}>
                <motion.div
                  custom={0}
                  variants={formItemVariants}
                  initial="hidden"
                  animate="visible"
                >
                  <Form.Item
                    label="年龄"
                    name="age"
                    rules={[{ required: true, message: "请输入您的年龄" }]}
                  >
                    <InputNumber min={18} max={60} className="w-full" />
                  </Form.Item>
                </motion.div>
              </Col>
              <Col xs={24} sm={12} md={8}>
                <motion.div
                  custom={1}
                  variants={formItemVariants}
                  initial="hidden"
                  animate="visible"
                >
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
                </motion.div>
              </Col>
              <Col xs={24} sm={12} md={8}>
                <motion.div
                  custom={2}
                  variants={formItemVariants}
                  initial="hidden"
                  animate="visible"
                >
                  <Form.Item
                    label="所在城市"
                    name="city"
                    rules={[{ required: true, message: "请选择您所在的城市" }]}
                  >
                    <Select>
                      <Option value="beijing">北京</Option>
                      <Option value="shanghai">上海</Option>
                      <Option value="guangzhou">广州</Option>
                      <Option value="other">其他城市</Option>
                    </Select>
                  </Form.Item>
                </motion.div>
              </Col>
              <Col xs={24} sm={12} md={8}>
                <motion.div
                  custom={3}
                  variants={formItemVariants}
                  initial="hidden"
                  animate="visible"
                >
                  <Form.Item
                    label="月工资（元）"
                    name="monthlySalary"
                    rules={[{ required: true, message: "请输入您的月工资" }]}
                  >
                    <InputNumber min={1000} className="w-full" />
                  </Form.Item>
                </motion.div>
              </Col>
              <Col xs={24} sm={12} md={8}>
                <motion.div
                  custom={4}
                  variants={formItemVariants}
                  initial="hidden"
                  animate="visible"
                >
                  <Form.Item
                    label="已工作年限"
                    name="workYears"
                    rules={[
                      { required: true, message: "请输入您已工作的年限" },
                    ]}
                  >
                    <InputNumber min={0} max={50} className="w-full" />
                  </Form.Item>
                </motion.div>
              </Col>
              <Col xs={24} sm={12} md={8}>
                <motion.div
                  custom={5}
                  variants={formItemVariants}
                  initial="hidden"
                  animate="visible"
                >
                  <Form.Item
                    label="社保缴纳年限"
                    name="contributionYears"
                    rules={[
                      { required: true, message: "请输入您的社保缴纳年限" },
                    ]}
                  >
                    <InputNumber min={0} max={50} className="w-full" />
                  </Form.Item>
                </motion.div>
              </Col>
            </Row>

            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="text-center mt-6"
            >
              <Button
                type="primary"
                htmlType="submit"
                loading={loading}
                size="large"
                icon={<CalculatorOutlined />}
                className="min-w-[150px]"
              >
                计算退休金
              </Button>
            </motion.div>
          </Form>
        </Card>
      </motion.div>

      <AnimatePresence>
        {result && (
          <motion.div
            key="results"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={resultVariants}
          >
            <Card
              title={
                <div className="flex items-center">
                  <BankOutlined className="mr-2 text-primary-color" />
                  <span>退休金计算结果</span>
                </div>
              }
              className="mb-6 glass-card"
            >
              <Row gutter={[24, 24]} className="mb-6">
                <Col xs={24} sm={8}>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="h-full"
                  >
                    <Card
                      bordered={false}
                      className="text-center h-full shadow-sm"
                    >
                      <div className="text-neutral-500 mb-2">基础养老金</div>
                      <div className="text-2xl font-semibold text-primary-color mb-1">
                        {result.basicPension.toFixed(2)}
                      </div>
                      <div className="text-sm text-neutral-400">元/月</div>
                    </Card>
                  </motion.div>
                </Col>
                <Col xs={24} sm={8}>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="h-full"
                  >
                    <Card
                      bordered={false}
                      className="text-center h-full shadow-sm"
                    >
                      <div className="text-neutral-500 mb-2">
                        个人账户养老金
                      </div>
                      <div className="text-2xl font-semibold text-secondary-color mb-1">
                        {result.personalAccountPension.toFixed(2)}
                      </div>
                      <div className="text-sm text-neutral-400">元/月</div>
                    </Card>
                  </motion.div>
                </Col>
                <Col xs={24} sm={8}>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="h-full"
                  >
                    <Card
                      bordered={false}
                      className="text-center h-full shadow-sm bg-gradient-to-r from-primary-color/5 to-secondary-color/5"
                    >
                      <div className="text-neutral-600 mb-2 font-medium">
                        总养老金
                      </div>
                      <div className="text-3xl font-bold gradient-text mb-1">
                        {result.totalPension.toFixed(2)}
                      </div>
                      <div className="text-sm text-neutral-500">元/月</div>
                    </Card>
                  </motion.div>
                </Col>
              </Row>

              <Divider className="my-6" />

              <motion.div
                className="text-center mb-6"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4, duration: 0.5 }}
              >
                <Card bordered={false} className="max-w-md mx-auto shadow-sm">
                  <div className="flex items-center justify-center mb-2">
                    <PercentageOutlined className="mr-2 text-accent-color" />
                    <Text className="text-neutral-600">
                      替代率（养老金占退休前工资的比例）
                    </Text>
                  </div>
                  <div
                    className="text-4xl font-bold mb-2"
                    style={{
                      color: getReplacementRating(result.replacementRate).color,
                    }}
                  >
                    {result.replacementRate.toFixed(2)}%
                  </div>
                  <div
                    className="inline-block px-3 py-1 rounded-full text-sm"
                    style={{
                      backgroundColor: `${getReplacementRating(result.replacementRate).color}20`,
                      color: getReplacementRating(result.replacementRate).color,
                    }}
                  >
                    {getReplacementRating(result.replacementRate).text}
                  </div>
                  <div className="mt-3 text-neutral-500 text-sm">
                    {result.replacementRate > 60
                      ? "您的退休金替代率良好，可以维持退休前的生活水平。"
                      : "您的退休金替代率较低，建议增加个人养老储蓄以提高退休后的生活质量。"}
                  </div>
                </Card>
              </motion.div>

              <Divider className="my-6" />

              <motion.div
                className="chart-container"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.5 }}
              >
                <Title level={5} className="mb-4 text-center text-neutral-600">
                  <DollarOutlined className="mr-2 text-success-color" />
                  退休金构成分析
                </Title>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart
                    data={chartData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip formatter={(value) => [`${value} 元`, "金额"]} />
                    <Legend />
                    <Bar dataKey="金额" fill="#3a5ccc" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </motion.div>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default RetirementCalculator;
