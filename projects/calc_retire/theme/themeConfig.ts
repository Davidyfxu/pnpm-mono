// 高级感配色主题配置
const themeConfig = {
  token: {
    // 主要颜色
    colorPrimary: '#3a5ccc', // 主色调
    colorPrimaryHover: '#2a4494', // 主色调悬停
    colorPrimaryActive: '#1e3a8a', // 主色调激活
    colorSecondary: '#5e81ff', // 辅助色
    colorAccent: '#8c6dff', // 强调色
    
    // 功能色
    colorSuccess: '#34b37c', // 成功色
    colorWarning: '#e6a23c', // 警告色
    colorError: '#e15554', // 错误色
    colorInfo: '#5e81ff', // 信息色
    
    // 中性色
    colorTextBase: '#334155', // 基础文本色
    colorTextSecondary: '#64748b', // 次要文本色
    colorTextTertiary: '#94a3b8', // 第三级文本色
    colorTextQuaternary: '#cbd5e1', // 第四级文本色
    
    // 背景色
    colorBgBase: '#ffffff', // 基础背景色
    colorBgContainer: '#ffffff', // 容器背景色
    colorBgElevated: '#f8fafc', // 提升背景色
    colorBgLayout: '#f1f5f9', // 布局背景色
    
    // 边框
    colorBorder: '#e2e8f0', // 边框色
    colorBorderSecondary: '#f1f5f9', // 次要边框色
    
    // 阴影
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05), 0 1px 3px rgba(0, 0, 0, 0.02)',
    boxShadowSecondary: '0 10px 25px rgba(0, 0, 0, 0.03), 0 5px 10px rgba(0, 0, 0, 0.02)',
    
    // 圆角
    borderRadius: 10, // 基础圆角
    borderRadiusSM: 6, // 小圆角
    borderRadiusLG: 16, // 大圆角
    
    // 字体
    fontFamily: 'var(--font-geist-sans, Arial, Helvetica, sans-serif)',
    fontSize: 14,
  },
  components: {
    // 卡片组件
    Card: {
      colorBorderSecondary: 'rgba(203, 213, 225, 0.5)',
      boxShadowTertiary: '0 10px 25px rgba(0, 0, 0, 0.03), 0 5px 10px rgba(0, 0, 0, 0.02)',
      borderRadiusLG: 12,
      paddingLG: 24,
    },
    
    // 按钮组件
    Button: {
      colorPrimaryHover: '#2a4494',
      borderRadius: 10,
      controlHeight: 40,
      controlHeightLG: 48,
      paddingContentHorizontal: 20,
    },
    
    // 标签页组件
    Tabs: {
      colorBgContainer: 'rgba(255, 255, 255, 0.8)',
      fontSize: 15,
      margin: 0,
    },
    
    // 统计数值组件
    Statistic: {
      colorTextDescription: '#64748b',
      colorTextHeading: '#1e293b',
      fontSizeHeading3: 26,
      fontWeightStrong: 600,
    },
    
    // 提示组件
    Alert: {
      colorInfoBg: 'rgba(58, 92, 204, 0.05)',
      colorSuccessBg: 'rgba(52, 179, 124, 0.05)',
      colorWarningBg: 'rgba(230, 162, 60, 0.05)',
      colorErrorBg: 'rgba(225, 85, 84, 0.05)',
      borderRadiusLG: 10,
      fontSizeLG: 14,
    },
    
    // 表单组件
    Form: {
      labelColor: '#334155',
      colorTextHeading: '#1e293b',
    },
    
    // 输入框组件
    Input: {
      colorBorder: '#cbd5e1',
      colorPrimaryHover: '#3a5ccc',
      activeBorderColor: '#3a5ccc',
      hoverBorderColor: '#5e81ff',
      activeShadow: '0 0 0 2px rgba(58, 92, 204, 0.1)',
    },
    
    // 表格组件
    Table: {
      headerBg: '#f8fafc',
      headerColor: '#334155',
      headerSplitColor: '#e2e8f0',
      borderColor: '#f1f5f9',
      borderRadiusLG: 10,
    },
    
    // 菜单组件
    Menu: {
      colorItemBgSelected: 'rgba(58, 92, 204, 0.05)',
      colorItemTextSelected: '#3a5ccc',
      colorItemTextHover: '#3a5ccc',
      colorActiveBarWidth: 3,
      colorActiveBarHeight: 0,
      colorActiveBarBorderSize: 0,
      horizontalItemSelectedColor: '#3a5ccc',
      horizontalItemHoverColor: '#3a5ccc',
    },
    
    // 抽屉组件
    Drawer: {
      colorBgElevated: '#ffffff',
      colorText: '#334155',
    },
    
    // 分割线组件
    Divider: {
      colorSplit: '#e2e8f0',
      marginLG: 24,
    },
  }
};

export default themeConfig;
