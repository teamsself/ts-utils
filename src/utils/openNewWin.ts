import { ut_isIOS } from './isMobile';

/**
 * 打开新的标签页或窗口
 *
 * @param url 要打开的页面地址，必须以 'http://'或'https://'为开始
 * @param options 打开选项配置
 * @param options.target 打开目标：'_blank'(新标签页)、'_self'(当前标签页)、'_parent'(父框架)、'_top'(顶层框架)
 * @param options.features 窗口特性字符串，如 'width=500,height=400,scrollbars=yes'
 * @param options.forceNewTab 强制使用新标签页打开，忽略设备类型检测
 * @returns 返回新打开窗口的引用，如果在iOS设备上则返回undefined
 * @throws 当URL参数类型错误或格式不正确时抛出异常
 */
export const ut_openNewWin = (
  url: string,
  options?: {
    target?: '_blank' | '_self' | '_parent' | '_top';
    features?: string;
    forceNewTab?: boolean;
  }
): Window | undefined => {
  // 参数验证
  if (typeof url !== 'string') {
    throw new TypeError('URL必须是字符串类型');
  }

  // 检查URL是否为空
  if (!url || url.trim() === '') {
    throw new Error('URL不能为空');
  }

  // URL格式验证
  if (!url.startsWith('http://') && !url.startsWith('https://')) {
    throw new Error('URL必须以 http:// 或 https:// 开头');
  }

  // 确保在浏览器环境中运行
  if (typeof window === 'undefined' || typeof navigator === 'undefined') {
    throw new Error('此函数只能在浏览器环境中运行');
  }

  // 合并默认选项
  const defaultOptions = {
    target: '_blank',
    forceNewTab: false
  };
  const mergedOptions = { ...defaultOptions, ...options };

  // 检查是否为iOS设备
  const isiOS = ut_isIOS();

  // 如果是iOS设备且没有强制使用新标签页，则在当前页面跳转
  if (isiOS && !mergedOptions.forceNewTab) {
    window.location.href = url;
    return undefined;
  }

  try {
    // 如果提供了窗口特性，则使用window.open打开新窗口
    if (mergedOptions.features) {
      return window.open(url, mergedOptions.target, mergedOptions.features);
    }

    // 使用动态创建a标签的方式打开新标签页
    const linkElement: HTMLAnchorElement = document.createElement('a');
    linkElement.href = url;
    linkElement.target = mergedOptions.target;

    // 添加到文档中并触发点击
    document.body.appendChild(linkElement);
    linkElement.click();

    // 清理DOM元素
    setTimeout(() => {
      document.body.removeChild(linkElement);
    }, 0);

    return undefined; // 使用a标签方式无法获取窗口引用
  } catch (error) {
    console.error('打开新窗口失败:', error);
    throw new Error(
      `打开URL失败: ${error instanceof Error ? error.message : '未知错误'}`
    );
  }
};
