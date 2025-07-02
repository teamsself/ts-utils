import { ut_thousands } from './thousands';

/**
 * 金额格式化 自动转为保留两位小数的金额字符串
 * @param value 金额
 * @param unit 单位
 * ut_amount(5) => "5.00";
 * ut_amount("5") => "5.00";
 * ut_amount(5,"美元") => "5.00 美元";
 */
export const ut_amount = (
  value: string | number | undefined,
  unit?: string
) => {
  if (value === undefined) return '-';
  return (
    String(ut_thousands(parseFloat(String(value)).toFixed(2))) +
    (unit ? ' ' + unit : '')
  );
};
