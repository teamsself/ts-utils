/*
 * @Author: W·S
 * @Date: 2023-07-10 15:23:21
 * @LastEditors: W·S
 * @LastEditTime: 2025-07-01 11:43:38
 * @Description: Description
 */

import { ut_getLS } from './utils/getLS';
import { ut_setLS } from './utils/setLS';

export * from './utils/clone';
export * from './utils/cloneDeep';
export * from './utils/dateFormatted';
export * from './utils/debounce';
export * from './utils/downLoadFile';
export * from './utils/escape';
export * from './utils/setLS';
export * from './utils/getLS';
export * from './utils/isEmpty';
export * from './utils/isMobile';
export * from './utils/isWXBrowser';
export * from './utils/openNewWin';
export * from './utils/readFile';
export * from './utils/regexUtils';
export * from './utils/round';
export * from './utils/thousands';
export * from './utils/throttle';
export * from './utils/unescape';
export * from './utils/uniqueId';
export * from './utils/Storage';
export * from './utils/ut_downloadBlob';
export * from './utils/ut_amount';

export * from './utils/CSSUtils';
export * from './utils/ByteUtils';

export const setUTENV = (format: string) => {
  if (window) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    window.DATAFORMAT = format;
  } else if (global) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    global.DATAFORMAT = format;
  }
};

/**
 * 获取当前用户信息
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const setUserInfo = (userInfo: Record<string, any>) => {
  ut_setLS('userInfo', JSON.stringify(userInfo));
};

/** 获取当前用户信息 */
export const getUserInfo = () => {
  const userInfo = ut_getLS('userInfo');
  return userInfo ? JSON.parse(userInfo) : {};
};

/** 获取当前语言环境 */
export const getLanguage = () => {
  const language = ut_getLS('language');
  return language ?? '';
};

/** 当前语言环境切换 */
export const setLanguage = (language: string) => {
  ut_setLS('language', language);
};
