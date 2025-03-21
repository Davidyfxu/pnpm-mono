"use client";

import { Layout, Menu, Typography, Button, Drawer, Space, Avatar } from "antd";
import {
  MenuOutlined,
  CalculatorOutlined,
  UserOutlined,
  QuestionCircleOutlined,
  InfoCircleOutlined,
} from "@ant-design/icons";
import { useState } from "react";
import { motion } from "framer-motion";

const { Header } = Layout;
const { Title } = Typography;

const AppHeader = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const menuItems = [
    { key: "calculator", label: "退休金计算器", icon: <CalculatorOutlined /> },
    { key: "about", label: "关于我们", icon: <InfoCircleOutlined /> },
    { key: "faq", label: "常见问题", icon: <QuestionCircleOutlined /> },
  ];

  // Animation variants
  const logoVariants = {
    initial: { opacity: 0, x: -20 },
    animate: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  const menuVariants = {
    initial: { opacity: 0, y: -10 },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const menuItemVariants = {
    initial: { opacity: 0, y: -10 },
    animate: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3 },
    },
  };

  return (
    <Header
      style={{ backgroundColor: "white" }}
      className="backdrop-blur-md shadow-sm flex items-center justify-between px-4 sm:px-6 md:px-8 h-16 sticky top-0 z-10"
    >
      <motion.div
        className="flex items-center"
        initial="initial"
        animate="animate"
        variants={logoVariants}
      >
        <div className="w-10 h-10 rounded-full bg-gradient-to-r from-primary-color to-secondary-color flex items-center justify-center mr-3">
          <CalculatorOutlined className="text-white text-xl" />
        </div>
        <Title level={4} className="!m-0 hidden sm:block gradient-text">
          退休金计算器
        </Title>
      </motion.div>

      {/* Desktop Menu */}
      <motion.div
        className="hidden md:flex"
        initial="initial"
        animate="animate"
        variants={menuVariants}
      >
        <Menu
          mode="horizontal"
          selectedKeys={["calculator"]}
          className="border-0 bg-transparent"
          items={menuItems.map((item) => ({
            key: item.key,
            label: (
              <motion.span
                variants={menuItemVariants}
                className="flex items-center"
              >
                {item.icon && <span className="mr-1">{item.icon}</span>}
                {item.label}
              </motion.span>
            ),
          }))}
        />
      </motion.div>

      {/* User Avatar */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5 }}
        className="hidden md:flex"
      >
        <Avatar
          icon={<UserOutlined />}
          className="bg-gradient-to-r from-accent-color to-primary-color cursor-pointer"
        />
      </motion.div>

      {/* Mobile Menu Button */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5 }}
        className="block md:hidden"
      >
        <Button
          type="text"
          icon={<MenuOutlined />}
          onClick={() => setMobileMenuOpen(true)}
        />
      </motion.div>

      {/* Mobile Menu Drawer */}
      <Drawer
        title={
          <div className="flex items-center">
            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-primary-color to-secondary-color flex items-center justify-center mr-2">
              <CalculatorOutlined className="text-white text-sm" />
            </div>
            <span className="gradient-text font-medium">退休金计算器</span>
          </div>
        }
        placement="right"
        onClose={() => setMobileMenuOpen(false)}
        open={mobileMenuOpen}
        width={280}
        className="custom-drawer"
      >
        <Space direction="vertical" className="w-full" size="large">
          {menuItems.map((item, index) => (
            <motion.div
              key={item.key}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 * index }}
            >
              <Button
                type={item.key === "calculator" ? "primary" : "default"}
                block
                size="large"
                onClick={() => setMobileMenuOpen(false)}
                className={item.key === "calculator" ? "gradient-bg" : ""}
                icon={item.icon}
              >
                {item.label}
              </Button>
            </motion.div>
          ))}
        </Space>
      </Drawer>
    </Header>
  );
};

export default AppHeader;
