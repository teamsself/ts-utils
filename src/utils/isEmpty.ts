/**
 * 判断值是否为空
 *
 * 检查值是否为 undefined、null、空字符串、空数组、空对象或仅包含空白字符的字符串
 *
 * @param value 要检查的值
 * @param options 可选配置项
 * @param options.allowBlankString 是否允许空白字符串（默认不允许）
 * @param options.checkArrays 是否检查数组（默认检查）
 * @param options.checkObjects 是否检查对象（默认检查）
 * @returns boolean 值是否为空
 */
export const ut_isEmpty = (
  value: unknown,
  options: {
    allowBlankString?: boolean;
    checkArrays?: boolean;
    checkObjects?: boolean;
  } = {}
): boolean => {
  // 默认选项
  const {
    allowBlankString = false,
    checkArrays = true,
    checkObjects = true
  } = options;

  // 检查基本空值
  if (value === undefined || value === null) {
    return true;
  }

  // 检查字符串
  if (typeof value === 'string') {
    // 如果不允许空白字符串，则检查trim后的结果
    if (!allowBlankString) {
      return value.trim() === '';
    }
    return value === '';
  }

  // 检查数组
  if (checkArrays && Array.isArray(value)) {
    return value.length === 0;
  }

  // 检查对象
  if (checkObjects && typeof value === 'object') {
    // 排除null（已经在前面检查过）和Date对象
    if (value === null || value instanceof Date) {
      return false;
    }

    // 检查对象的自有属性数量
    return Object.keys(value).length === 0;
  }

  // 其他类型（数字、布尔值等）视为非空
  return false;
};

/**
 * 判断值是否不为空（isEmpty的反向操作）
 *
 * @param value 要检查的值
 * @param options 可选配置项（与isEmpty相同）
 * @returns boolean 值是否不为空
 */
export const ut_isNotEmpty = (
  value: unknown,
  options?: Parameters<typeof ut_isEmpty>[1]
): boolean => {
  return !ut_isEmpty(value, options);
};
