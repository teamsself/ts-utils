/**
 * 判断当前环境是否为微信浏览器
 *
 * 检测用户代理字符串中是否包含微信浏览器特有的标识符"micromessenger"
 *
 * @returns boolean 当前环境是否为微信浏览器
 * @throws Error 当在非浏览器环境中调用时抛出错误
 */
export const ut_isWXBrowser = (): boolean => {
  // 检查运行环境
  if (typeof window === 'undefined' || typeof navigator === 'undefined') {
    throw new Error('此函数只能在浏览器环境中运行');
  }

  // 直接返回正则表达式的测试结果，无需三元运算符
  return /micromessenger/i.test(navigator.userAgent);
};

/**
 * 判断当前环境是否为微信小程序内嵌浏览器
 *
 * 检测用户代理字符串中是否包含微信小程序特有的标识符
 *
 * @returns boolean 当前环境是否为微信小程序内嵌浏览器
 */
export const ut_isWXMiniProgram = (): boolean => {
  if (typeof window === 'undefined' || typeof navigator === 'undefined') {
    return false;
  }

  return /miniprogram/i.test(navigator.userAgent);
};

/**
 * 获取微信环境信息
 *
 * 返回当前微信环境的详细信息，包括是否是微信浏览器、是否是小程序等
 *
 * @returns {
 *   isWXBrowser: boolean;
 *   isWXMiniProgram: boolean;
 *   isWechatRelated: boolean;
 *   userAgent: string;
 * } 微信环境信息对象
 */
export const ut_getWechatEnvInfo = (): {
  isWXBrowser: boolean;
  isWXMiniProgram: boolean;
  isWechatRelated: boolean;
  userAgent: string;
} => {
  if (typeof window === 'undefined' || typeof navigator === 'undefined') {
    return {
      isWXBrowser: false,
      isWXMiniProgram: false,
      isWechatRelated: false,
      userAgent: ''
    };
  }

  const userAgent = navigator.userAgent;
  const _isWXBrowser = ut_isWXBrowser();
  const _isWXMiniProgram = ut_isWXMiniProgram();

  return {
    isWXBrowser: _isWXBrowser,
    isWXMiniProgram: _isWXMiniProgram,
    isWechatRelated: _isWXBrowser || _isWXMiniProgram,
    userAgent
  };
};
