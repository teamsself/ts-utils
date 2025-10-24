/**
 * 判断是否是移动端设备
 *
 * 检测当前环境是否为移动设备，支持各种主流移动设备类型的检测
 * 包括手机、平板以及常见移动浏览器
 *
 * @returns boolean 当前环境是否为移动端
 * @throws Error 当在非浏览器环境中调用时抛出错误
 */
export const ut_isMobile = (): boolean => {
  // 检查运行环境
  if (typeof window === 'undefined' || typeof navigator === 'undefined') {
    throw new Error('此函数只能在浏览器环境中运行');
  }

  // 使用test方法比exec更高效，因为我们只需要布尔结果
  return /(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i.test(
    navigator.userAgent
  );
};

/**
 * 判断是否是iOS设备
 *
 * 专门检测当前环境是否为iOS设备（iPhone、iPad、iPod等）
 *
 * @returns boolean 当前环境是否为iOS设备
 */
export const ut_isIOS = (): boolean => {
  if (typeof window === 'undefined' || typeof navigator === 'undefined') {
    return false;
  }

  return /(iPhone|iPod|ios|iPad)/i.test(navigator.userAgent);
};

/**
 * 判断是否是Android设备
 *
 * 专门检测当前环境是否为Android设备
 *
 * @returns boolean 当前环境是否为Android设备
 */
export const ut_isAndroid = (): boolean => {
  if (typeof window === 'undefined' || typeof navigator === 'undefined') {
    return false;
  }

  return /Android/i.test(navigator.userAgent);
};

/**
 * 获取设备类型信息
 *
 * 返回详细的设备类型信息，包括是否是移动设备、具体平台等
 *
 * @returns {
 *   isMobile: boolean;
 *   isIOS: boolean;
 *   isAndroid: boolean;
 *   platform: string;
 *   userAgent: string;
 * } 设备类型信息对象
 */
export const ut_getDeviceInfo = (): {
  isMobile: boolean;
  isIOS: boolean;
  isAndroid: boolean;
  platform: string;
  userAgent: string;
} => {
  if (typeof window === 'undefined' || typeof navigator === 'undefined') {
    return {
      isMobile: false,
      isIOS: false,
      isAndroid: false,
      platform: 'unknown',
      userAgent: ''
    };
  }

  const userAgent = navigator.userAgent;
  const isMobile = ut_isMobile();
  const isIOS = ut_isIOS();
  const isAndroid = ut_isAndroid();

  let platform = 'unknown';
  if (isIOS) {
    platform = 'ios';
  } else if (isAndroid) {
    platform = 'android';
  } else if (!isMobile) {
    platform = 'desktop';
  }

  return {
    isMobile,
    isIOS,
    isAndroid,
    platform,
    userAgent
  };
};
