/**
 * @description 金额格式化工具
 * @param value 金额值，可以是数字、数字字符串或undefined
 * @param options 可选配置项
 * @param options.unit 金额单位，如"元"、"美元"等
 * @param options.decimalPlaces 保留的小数位数，默认2位
 * @param options.emptyValue 当值为无效或空时显示的内容，默认"-"
 * @param options.separator 千分位分隔符，默认","（将传递给ut_thousands）
 * @returns 格式化后的金额字符串
 * @example
 * ut_amount(5) => "5.00"
 * ut_amount("5") => "5.00"
 * ut_amount(5, { unit: "美元" }) => "5.00 美元"
 * ut_amount(5, { decimalPlaces: 3 }) => "5.000"
 */
import { ut_thousands } from './thousands';

export const ut_amount = (
  value: string | number | undefined | null,
  options: {
    unit?: string;
    decimalPlaces?: number;
    emptyValue?: string;
    separator?: string;
  } = {}
): string => {
  // 解析配置项，设置默认值
  const {
    unit = '',
    decimalPlaces = 2,
    emptyValue = '-',
    separator = ','
  } = options;

  // 处理空值或undefined
  if (value === undefined || value === null || value === '') {
    return emptyValue;
  }

  // 尝试将值转换为数字
  const numValue = typeof value === 'number' ? value : Number(value);

  // 处理无效数字情况
  if (isNaN(numValue) || !isFinite(numValue)) {
    return emptyValue;
  }

  // 格式化数字，保留指定的小数位数
  const formattedValue = numValue.toFixed(decimalPlaces);

  // 应用千分位分隔符
  const thousandsValue = ut_thousands(formattedValue, { separator });

  // 添加单位（如果有）
  return unit ? `${thousandsValue} ${unit}` : thousandsValue;
};

/**
 * @description 解析格式化的金额字符串为数字
 * @param amountStr 格式化的金额字符串
 * @returns 解析后的数值
 * @example
 * parseAmount("5.00") => 5
 * parseAmount("1,234.56 元") => 1234.56
 */
export const ut_parseAmount = (amountStr: string): number => {
  if (typeof amountStr !== 'string') {
    throw new Error('amountStr must be a string');
  }

  // 移除所有非数字和小数点的字符（保留负号）
  const cleanValue = amountStr.replace(/[^\d.-]/g, '');
  const result = Number(cleanValue);

  if (isNaN(result)) {
    throw new Error('Cannot parse to a valid number');
  }

  return result;
};
