/**
 * @description 正则表达式工具函数集合
 */
interface RegexUtils {
  /**
   * 验证手机号（中国大陆）
   * @param phone 手机号字符串
   * @returns 是否为有效手机号
   */
  isValidPhone(phone: string): boolean;

  /**
   * 验证电子邮件
   * @param email 电子邮件字符串
   * @returns 是否为有效电子邮件
   */
  isValidEmail(email: string): boolean;

  /**
   * 验证是否为银行卡号
   * @param bankCard 银行卡号字符串
   * @returns 是否为有效银行卡号
   */
  isValidBankCard(bankCard: string): boolean;

  /**
   * 验证日期（格式：YYYY-MM-DD）
   * @param date 日期字符串
   * @returns 是否为有效日期格式
   */
  isValidDate(date: string): boolean;

  /**
   * 验证时间（格式：HH:MM:SS）
   * @param time 时间字符串
   * @returns 是否为有效时间格式
   */
  isValidTime(time: string): boolean;

  /**
   * 验证身份证号（18位）
   * @param id 身份证号字符串
   * @returns 是否为有效身份证号
   */
  isValidIDCard(id: string): boolean;

  /**
   * 验证邮政编码（中国大陆）
   * @param code 邮政编码字符串
   * @returns 是否为有效邮政编码
   */
  isValidPostalCode(code: string): boolean;

  /**
   * 验证仅包含字母
   * @param str 字符串
   * @returns 是否仅包含字母
   */
  isAlpha(str: string): boolean;

  /**
   * 验证仅包含数字
   * @param str 字符串
   * @returns 是否仅包含数字
   */
  isNumeric(str: string): boolean;

  /**
   * 验证仅包含字母和数字
   * @param str 字符串
   * @returns 是否仅包含字母和数字
   */
  isAlphanumeric(str: string): boolean;

  /**
   * 验证仅包含小写字母
   * @param str 字符串
   * @returns 是否仅包含小写字母
   */
  isLowercase(str: string): boolean;

  /**
   * 验证仅包含大写字母
   * @param str 字符串
   * @returns 是否仅包含大写字母
   */
  isUppercase(str: string): boolean;

  /**
   * 验证是否为正整数
   * @param str 字符串
   * @returns 是否为正整数
   */
  isPositiveInteger(str: string): boolean;

  /**
   * 验证是否为负整数
   * @param str 字符串
   * @returns 是否为负整数
   */
  isNegativeInteger(str: string): boolean;

  /**
   * 验证是否为整数
   * @param str 字符串
   * @returns 是否为整数
   */
  isInteger(str: string): boolean;

  /**
   * 验证是否为浮点数
   * @param str 字符串
   * @returns 是否为浮点数
   */
  isFloat(str: string): boolean;

  /**
   * 验证是否为正浮点数
   * @param str 字符串
   * @returns 是否为正浮点数
   */
  isPositiveFloat(str: string): boolean;

  /**
   * 验证是否为负浮点数
   * @param str 字符串
   * @returns 是否为负浮点数
   */
  isNegativeFloat(str: string): boolean;

  /**
   * 验证是否为颜色十六进制代码
   * @param str 字符串
   * @returns 是否为有效十六进制颜色代码
   */
  isHexColor(str: string): boolean;
}

/**
 * 正则表达式模式集合
 */
const regexPatterns = {
  // 中国大陆手机号（更严格的验证）
  phone: /^1[3-9]\d{9}$/,

  // 更严格的电子邮件验证
  email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,

  // 银行卡号（10-30位）
  bankCard: /^[1-9]\d{9,29}$/,

  // 日期格式：YYYY-MM-DD
  date: /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/,

  // 时间格式：HH:MM:SS
  time: /^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/,

  // 18位身份证号（最后一位可以是X或x）
  idCard:
    /^[1-9]\d{5}(18|19|20)\d{2}(0[1-9]|1[0-2])(0[1-9]|[12]\d|3[01])\d{3}[\dXx]$/,

  // 中国大陆邮政编码
  postalCode: /^[1-9]\d{5}$/,

  // 仅包含字母
  alpha: /^[a-zA-Z]+$/,

  // 仅包含数字
  numeric: /^\d+$/,

  // 仅包含字母和数字
  alphanumeric: /^[a-zA-Z0-9]+$/,

  // 仅包含小写字母
  lowercase: /^[a-z]+$/,

  // 仅包含大写字母
  uppercase: /^[A-Z]+$/,

  // 正整数
  positiveInteger: /^\d+$/,

  // 负整数
  negativeInteger: /^-\d+$/,

  // 整数（包括正负）
  integer: /^-?\d+$/,

  // 浮点数（包括正负）
  float: /^-?\d+(\.\d+)?$/,

  // 正浮点数
  positiveFloat: /^\d+(\.\d+)?$/,

  // 负浮点数
  negativeFloat: /^-\d+(\.\d+)?$/,

  // 十六进制颜色代码（支持#FFF和#FFFFFF两种格式）
  hexColor: /^#([a-fA-F0-9]{3}|[a-fA-F0-9]{6})$/
};

/**
 * 正则表达式工具对象
 */
const regexUtils: RegexUtils = {
  isValidPhone: (phone: string): boolean => regexPatterns.phone.test(phone),
  isValidEmail: (email: string): boolean => regexPatterns.email.test(email),
  isValidBankCard: (bankCard: string): boolean =>
    regexPatterns.bankCard.test(bankCard),
  isValidDate: (date: string): boolean => regexPatterns.date.test(date),
  isValidTime: (time: string): boolean => regexPatterns.time.test(time),
  isValidIDCard: (id: string): boolean => regexPatterns.idCard.test(id),
  isValidPostalCode: (code: string): boolean =>
    regexPatterns.postalCode.test(code),
  isAlpha: (str: string): boolean => regexPatterns.alpha.test(str),
  isNumeric: (str: string): boolean => regexPatterns.numeric.test(str),
  isAlphanumeric: (str: string): boolean =>
    regexPatterns.alphanumeric.test(str),
  isLowercase: (str: string): boolean => regexPatterns.lowercase.test(str),
  isUppercase: (str: string): boolean => regexPatterns.uppercase.test(str),
  isPositiveInteger: (str: string): boolean =>
    regexPatterns.positiveInteger.test(str),
  isNegativeInteger: (str: string): boolean =>
    regexPatterns.negativeInteger.test(str),
  isInteger: (str: string): boolean => regexPatterns.integer.test(str),
  isFloat: (str: string): boolean => regexPatterns.float.test(str),
  isPositiveFloat: (str: string): boolean =>
    regexPatterns.positiveFloat.test(str),
  isNegativeFloat: (str: string): boolean =>
    regexPatterns.negativeFloat.test(str),
  isHexColor: (str: string): boolean => regexPatterns.hexColor.test(str)
};

// 导出保持向后兼容性
const ut_reg_patterns = regexPatterns;
const ut_regexUtils = regexUtils;

export { ut_reg_patterns, ut_regexUtils };
