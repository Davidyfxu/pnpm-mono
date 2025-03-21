'use client';

import { useState, useEffect } from 'react';
import { Layout, Typography, Tabs, ConfigProvider } from 'antd';
import zhCN from 'antd/lib/locale/zh_CN';
import { motion } from 'framer-motion';
import RetirementCalculator from '../components/RetirementCalculator';
import DelayedRetirementAnalysis from '../components/DelayedRetirementAnalysis';
import SocialSecurityAnalysis from '../components/SocialSecurityAnalysis';
import AppHeader from '../components/AppHeader';
import AppFooter from '../components/AppFooter';
import themeConfig from '../theme/themeConfig';

const { Content } = Layout;
const { Title } = Typography;

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3,
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: 'spring',
      stiffness: 100,
      damping: 15
    }
  }
};

export default function Home() {
  const [activeTab, setActiveTab] = useState('1');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <ConfigProvider locale={zhCN} theme={themeConfig}>
      <Layout className="min-h-screen bg-gradient-to-b from-neutral-100 to-white">
        <AppHeader />
        <Content className="p-4 sm:p-6 md:p-8 max-w-7xl mx-auto w-full">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="mb-10 text-center"
          >
            <motion.div variants={itemVariants}>
              <Title level={2} className="!mb-2 gradient-text text-3xl md:text-4xl">退休金计算器</Title>
            </motion.div>
            <motion.div variants={itemVariants}>
              <Typography.Paragraph className="text-neutral-500 text-base md:text-lg max-w-2xl mx-auto">
                为您量身定制的退休规划工具，助力您科学规划未来
              </Typography.Paragraph>
            </motion.div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="glass-card overflow-hidden"
          >
            <Tabs 
              activeKey={activeTab} 
              onChange={setActiveTab}
              type="card"
              className="retirement-tabs"
              items={[
                {
                  key: '1',
                  label: '退休金计算',
                  children: <RetirementCalculator />
                },
                {
                  key: '2',
                  label: '延迟退休分析',
                  children: <DelayedRetirementAnalysis />
                },
                {
                  key: '3',
                  label: '社保缴纳分析',
                  children: <SocialSecurityAnalysis />
                }
              ]}
            />
          </motion.div>
        </Content>
        <AppFooter />
      </Layout>
    </ConfigProvider>
  );
}
