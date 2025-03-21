'use client';

import { Layout, Typography, Space, Divider, Row, Col } from 'antd';
import { HeartFilled, MailOutlined, PhoneOutlined, GlobalOutlined, SafetyCertificateOutlined } from '@ant-design/icons';
import { motion } from 'framer-motion';

const { Footer } = Layout;
const { Text, Link, Title } = Typography;

const footerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { 
      duration: 0.5,
      when: "beforeChildren",
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.3 }
  }
};

const AppFooter = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <Footer className="bg-gradient-to-b from-neutral-50 to-white py-8 mt-auto border-t border-neutral-200">
      <motion.div 
        className="max-w-7xl mx-auto"
        initial="hidden"
        animate="visible"
        variants={footerVariants}
      >
        <Row gutter={[24, 24]}>
          <Col xs={24} md={8}>
            <motion.div variants={itemVariants} className="text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start mb-4">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-primary-color to-secondary-color flex items-center justify-center mr-3">
                  <SafetyCertificateOutlined className="text-white text-lg" />
                </div>
                <Title level={5} className="!m-0 gradient-text">退休金计算器</Title>
              </div>
              <Text className="block text-neutral-600 mb-4">
                为您的退休生活提供科学规划，助您安心迎接未来
              </Text>
              <div className="flex items-center justify-center md:justify-start text-neutral-500 mb-2">
                <MailOutlined className="mr-2" /> <Text className="text-neutral-500">contact@retirement-calc.com</Text>
              </div>
              <div className="flex items-center justify-center md:justify-start text-neutral-500">
                <PhoneOutlined className="mr-2" /> <Text className="text-neutral-500">400-123-4567</Text>
              </div>
            </motion.div>
          </Col>
          
          <Col xs={24} md={8}>
            <motion.div variants={itemVariants} className="text-center">
              <Title level={5} className="!mb-4 text-neutral-700">快速链接</Title>
              <div className="flex flex-col space-y-3">
                <Link href="#" className="text-neutral-600 hover:text-primary-color transition-colors">退休金计算</Link>
                <Link href="#" className="text-neutral-600 hover:text-primary-color transition-colors">延迟退休分析</Link>
                <Link href="#" className="text-neutral-600 hover:text-primary-color transition-colors">社保缴纳分析</Link>
                <Link href="#" className="text-neutral-600 hover:text-primary-color transition-colors">常见问题</Link>
              </div>
            </motion.div>
          </Col>
          
          <Col xs={24} md={8}>
            <motion.div variants={itemVariants} className="text-center md:text-right">
              <Title level={5} className="!mb-4 text-neutral-700">法律信息</Title>
              <div className="flex flex-col space-y-3">
                <Link href="#" className="text-neutral-600 hover:text-primary-color transition-colors">使用条款</Link>
                <Link href="#" className="text-neutral-600 hover:text-primary-color transition-colors">隐私政策</Link>
                <Link href="#" className="text-neutral-600 hover:text-primary-color transition-colors">免责声明</Link>
                <Link href="#" className="text-neutral-600 hover:text-primary-color transition-colors">联系我们</Link>
              </div>
            </motion.div>
          </Col>
        </Row>
        
        <Divider className="my-6 border-neutral-200" />
        
        <motion.div 
          variants={itemVariants}
          className="text-neutral-500 text-sm text-center"
        >
          <div className="flex items-center justify-center">
            <GlobalOutlined className="mr-2" />
            <span> {currentYear} 退休金计算器. 保留所有权利.</span>
          </div>
          <div className="mt-3">
            <motion.span 
              whileHover={{ scale: 1.1 }}
              className="inline-flex items-center"
            >
              Made with <HeartFilled className="mx-1 text-danger-color" /> in China
            </motion.span>
          </div>
        </motion.div>
      </motion.div>
    </Footer>
  );
};

export default AppFooter;
