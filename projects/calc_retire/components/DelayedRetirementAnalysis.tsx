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
  Table,
  Tooltip,
} from "antd";
import { InfoCircleOutlined, QuestionCircleOutlined } from "@ant-design/icons";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const { Option } = Select;

// 延迟退休政策相关常量
const MALE_RETIREMENT_AGE = 60; // 男性法定退休年龄
const FEMALE_RETIREMENT_AGE = 55; // 女性法定退休年龄
const FEMALE_CADRE_RETIREMENT_AGE = 55; // 女干部法定退休年龄
const DELAYED_RETIREMENT_POLICY = [
  { year: 2025, maleAge: 60, femaleAge: 55, femaleCadreAge: 55 },
  { year: 2026, maleAge: 60, femaleAge: 55, femaleCadreAge: 56 },
  { year: 2027, maleAge: 60, femaleAge: 55, femaleCadreAge: 56 },
  { year: 2028, maleAge: 61, femaleAge: 55, femaleCadreAge: 56 },
  { year: 2029, maleAge: 61, femaleAge: 55, femaleCadreAge: 57 },
  { year: 2030, maleAge: 61, femaleAge: 56, femaleCadreAge: 57 },
  { year: 2031, maleAge: 61, femaleAge: 56, femaleCadreAge: 57 },
  { year: 2032, maleAge: 62, femaleAge: 56, femaleCadreAge: 58 },
  { year: 2033, maleAge: 62, femaleAge: 56, femaleCadreAge: 58 },
  { year: 2034, maleAge: 62, femaleAge: 57, femaleCadreAge: 58 },
  { year: 2035, maleAge: 62, femaleAge: 57, femaleCadreAge: 59 },
  { year: 2036, maleAge: 63, femaleAge: 57, femaleCadreAge: 59 },
  { year: 2037, maleAge: 63, femaleAge: 57, femaleCadreAge: 59 },
  { year: 2038, maleAge: 63, femaleAge: 58, femaleCadreAge: 60 },
  { year: 2039, maleAge: 63, femaleAge: 58, femaleCadreAge: 60 },
  { year: 2040, maleAge: 64, femaleAge: 58, femaleCadreAge: 60 },
  { year: 2041, maleAge: 64, femaleAge: 58, femaleCadreAge: 61 },
  { year: 2042, maleAge: 64, femaleAge: 59, femaleCadreAge: 61 },
  { year: 2043, maleAge: 64, femaleAge: 59, femaleCadreAge: 61 },
  { year: 2044, maleAge: 65, femaleAge: 59, femaleCadreAge: 62 },
  { year: 2045, maleAge: 65, femaleAge: 59, femaleCadreAge: 62 },
  { year: 2046, maleAge: 65, femaleAge: 60, femaleCadreAge: 62 },
  { year: 2047, maleAge: 65, femaleAge: 60, femaleCadreAge: 63 },
  { year: 2048, maleAge: 65, femaleAge: 60, femaleCadreAge: 63 },
  { year: 2049, maleAge: 65, femaleAge: 60, femaleCadreAge: 63 },
  { year: 2050, maleAge: 65, femaleAge: 60, femaleCadreAge: 64 },
  { year: 2051, maleAge: 65, femaleAge: 60, femaleCadreAge: 64 },
  { year: 2052, maleAge: 65, femaleAge: 60, femaleCadreAge: 64 },
  { year: 2053, maleAge: 65, femaleAge: 60, femaleCadreAge: 65 },
];

const DelayedRetirementAnalysis = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [chartData, setChartData] = useState<any[]>([]);

  // 计算预计退休年龄
  const calculateRetirementAge = (values: any) => {
    const { age, gender, employeeType, birthYear } = values;
    const currentYear = new Date().getFullYear();

    // 计算正常退休年龄
    let standardRetirementAge;
    if (gender === "male") {
      standardRetirementAge = MALE_RETIREMENT_AGE;
    } else {
      standardRetirementAge =
        employeeType === "cadre"
          ? FEMALE_CADRE_RETIREMENT_AGE
          : FEMALE_RETIREMENT_AGE;
    }

    // 计算正常退休年份
    const standardRetirementYear = birthYear + standardRetirementAge;

    // 根据延迟退休政策计算实际退休年龄
    let actualRetirementAge = standardRetirementAge;
    let actualRetirementYear = standardRetirementYear;

    // 找到对应的延迟退休政策
    for (const policy of DELAYED_RETIREMENT_POLICY) {
      if (policy.year >= standardRetirementYear) {
        if (gender === "male") {
          actualRetirementAge = policy.maleAge;
        } else if (employeeType === "cadre") {
          actualRetirementAge = policy.femaleCadreAge;
        } else {
          actualRetirementAge = policy.femaleAge;
        }
        actualRetirementYear = birthYear + actualRetirementAge;
        break;
      }
    }

    // 计算延迟退休年数
    const delayedYears = actualRetirementAge - standardRetirementAge;

    // 计算距离退休还有多少年
    const yearsToRetirement = actualRetirementYear - currentYear;

    // 计算退休金增加比例（假设每延迟1年，退休金增加3%）
    const pensionIncreaseRate = delayedYears * 3;

    // 生成图表数据 - 未来10年的退休年龄变化趋势
    const chartData = [];
    for (let i = 0; i < 10; i++) {
      const year = currentYear + i;
      const ageInThatYear = age + i;

      // 找到对应年份的退休政策
      let retirementAgeInThatYear;
      for (const policy of DELAYED_RETIREMENT_POLICY) {
        if (policy.year >= year) {
          if (gender === "male") {
            retirementAgeInThatYear = policy.maleAge;
          } else if (employeeType === "cadre") {
            retirementAgeInThatYear = policy.femaleCadreAge;
          } else {
            retirementAgeInThatYear = policy.femaleAge;
          }
          break;
        }
      }

      chartData.push({
        year,
        退休年龄: retirementAgeInThatYear,
        您的年龄: ageInThatYear,
      });
    }

    return {
      standardRetirementAge,
      standardRetirementYear,
      actualRetirementAge,
      actualRetirementYear,
      delayedYears,
      yearsToRetirement,
      pensionIncreaseRate,
      chartData,
    };
  };

  const handleSubmit = (values: any) => {
    setLoading(true);

    // 模拟计算延迟
    setTimeout(() => {
      try {
        const result = calculateRetirementAge(values);
        setResult(result);
        setChartData(result.chartData);
        setLoading(false);
      } catch (error) {
        console.error("计算错误:", error);
        setLoading(false);
      }
    }, 500);
  };

  // 表格列定义
  const columns = [
    {
      title: "年份",
      dataIndex: "year",
      key: "year",
    },
    {
      title: "男性退休年龄",
      dataIndex: "maleAge",
      key: "maleAge",
    },
    {
      title: "女性退休年龄",
      dataIndex: "femaleAge",
      key: "femaleAge",
    },
    {
      title: "女干部退休年龄",
      dataIndex: "femaleCadreAge",
      key: "femaleCadreAge",
    },
  ];

  return (
    <div>
      <Card className="mb-6">
        <Alert
          message="关于延迟退休分析"
          description="本工具基于中国延迟退休政策趋势进行分析，结果仅供参考。实际退休年龄可能因政策调整而有所变化。"
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
            employeeType: "worker",
            birthYear: 1990,
          }}
        >
          <Row gutter={24}>
            <Col xs={24} sm={12} md={6}>
              <Form.Item
                label="当前年龄"
                name="age"
                rules={[{ required: true, message: "请输入您的年龄" }]}
              >
                <InputNumber min={18} max={60} className="w-full" />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12} md={6}>
              <Form.Item
                label="出生年份"
                name="birthYear"
                rules={[{ required: true, message: "请输入您的出生年份" }]}
              >
                <InputNumber min={1950} max={2010} className="w-full" />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12} md={6}>
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
            <Col xs={24} sm={12} md={6}>
              <Form.Item
                label={
                  <span>
                    职工类型
                    <Tooltip title="干部指行政事业单位工作人员，工人指企业职工">
                      <QuestionCircleOutlined className="ml-1" />
                    </Tooltip>
                  </span>
                }
                name="employeeType"
                rules={[{ required: true, message: "请选择您的职工类型" }]}
              >
                <Select>
                  <Option value="cadre">干部</Option>
                  <Option value="worker">工人</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <Form.Item className="text-center mt-4">
            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
              size="large"
            >
              分析延迟退休情况
            </Button>
          </Form.Item>
        </Form>
      </Card>

      {result && (
        <>
          <Card title="延迟退休分析结果" className="mb-6">
            <Row gutter={24} className="mb-6">
              <Col xs={24} sm={12} md={6}>
                <Statistic
                  title="法定退休年龄"
                  value={result.standardRetirementAge}
                  suffix="岁"
                  className="text-center"
                />
              </Col>
              <Col xs={24} sm={12} md={6}>
                <Statistic
                  title="预计实际退休年龄"
                  value={result.actualRetirementAge}
                  suffix="岁"
                  className="text-center"
                />
              </Col>
              <Col xs={24} sm={12} md={6}>
                <Statistic
                  title="延迟退休年数"
                  value={result.delayedYears}
                  suffix="年"
                  valueStyle={{
                    color: result.delayedYears > 0 ? "#faad14" : "#52c41a",
                  }}
                  className="text-center"
                />
              </Col>
              <Col xs={24} sm={12} md={6}>
                <Statistic
                  title="距离退休还有"
                  value={result.yearsToRetirement}
                  suffix="年"
                  className="text-center"
                />
              </Col>
            </Row>

            <Divider />

            <div className="text-center mb-4">
              <Statistic
                title="预计退休金增加比例"
                value={result.pensionIncreaseRate}
                precision={1}
                suffix="%"
                valueStyle={{ color: "#3f8600" }}
              />
              <div className="mt-2 text-gray-500 text-sm">
                根据当前政策估算，延迟退休{result.delayedYears}
                年可能使您的退休金增加约{result.pensionIncreaseRate}%
              </div>
            </div>

            <Divider />

            <div className="chart-container">
              <ResponsiveContainer width="100%" height={300}>
                <LineChart
                  data={chartData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="year" />
                  <YAxis />
                  <RechartsTooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="退休年龄"
                    stroke="#1677ff"
                    activeDot={{ r: 8 }}
                  />
                  <Line type="monotone" dataKey="您的年龄" stroke="#52c41a" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </Card>

          <Card title="延迟退休政策趋势表" className="mb-6">
            <Table
              dataSource={DELAYED_RETIREMENT_POLICY.filter(
                (p) => p.year >= new Date().getFullYear(),
              )}
              columns={columns}
              rowKey="year"
              pagination={{ pageSize: 10 }}
              size="middle"
            />
            <div className="mt-4 text-gray-500 text-sm">
              注：此表格展示的是预计的延迟退休政策趋势，实际政策可能会有调整。
            </div>
          </Card>
        </>
      )}
    </div>
  );
};

export default DelayedRetirementAnalysis;
