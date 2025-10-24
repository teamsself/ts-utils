/**
 * @description 数字转千分位格式
 * @param value 要格式化的数字或数字字符串
 * @param options 可选配置项
 * @param options.separator 千分位分隔符，默认为逗号','
 * @param options.emptyValue 空值或无效值时的默认返回，默认为'0'
 * @returns 格式化后的千分位字符串
 */
export const ut_thousands = (
  value: string | number,
  options: { separator?: string; emptyValue?: string } = {}
): string => {
  // 解析配置项
  const { separator = ',', emptyValue = '0' } = options;

  // 类型检查
  if (typeof value !== 'string' && typeof value !== 'number') {
    throw new Error('value must be string or number');
  }

  // 处理空值或无效值
  if (value === null || value === undefined || value === '') {
    return emptyValue;
  }

  // 转换为字符串并处理可能的数字值（如NaN, Infinity）
  const numValue = typeof value === 'number' ? value : Number(value);
  if (isNaN(numValue) || !isFinite(numValue)) {
    return emptyValue;
  }

  const valueStr = String(value);
  const parts = valueStr.split('.');

  // 格式化整数部分（添加千分位）
  const integerPart = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, separator);

  // 处理小数部分
  if (parts.length > 1) {
    // 保留小数部分，移除末尾的0（可选）
    // const decimalPart = parts[1].replace(/0+$/, '') || '0';
    // return `${integerPart}.${decimalPart}`;

    // 直接保留原始小数部分
    return `${integerPart}.${parts[1]}`;
  }

  return integerPart;
};

/**
 * @description 解析千分位格式的数字字符串为数值
 * @param value 千分位格式的数字字符串
 * @returns 解析后的数值
 */
export const ut_parseThousands = (value: string): number => {
  if (typeof value !== 'string') {
    throw new Error('value must be string');
  }

  // 移除千分位分隔符并转换为数字
  const cleanValue = value.replace(/,/g, '');
  const result = Number(cleanValue);

  if (isNaN(result)) {
    throw new Error('value cannot be parsed to a valid number');
  }

  return result;
};
