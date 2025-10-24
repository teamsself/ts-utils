import dayjs from 'dayjs';

/**
 * 日期格式化工具函数
 * 统一处理各种日期格式需求，支持多种预定义格式或自定义格式
 *
 * @param date 日期字符串或Date对象
 * @param type 日期显示类型：0：年月日时分秒、1：年月日、2：时分秒、3：年月日时分、4：时分
 *             或直接传入自定义格式化字符串
 * @returns 格式化后的日期字符串，解析失败时返回 '--'
 * @example
 * // 使用预定义格式
 * dateFormat('2023-01-01', 0); // '2023-01-01 00:00:00'
 * dateFormat('2023-01-01', 1); // '2023-01-01'
 *
 * // 使用自定义格式
 * dateFormat('2023-01-01', 'YYYY/MM/DD'); // '2023/01/01'
 */
export const ut_dateFormat = (
  date: string | Date,
  type: number | string = 1
): string => {
  // 输入验证
  if (!date) return '--';

  // 格式化规则映射
  const formatMap: Record<number, string> = {
    0: 'YYYY-MM-DD HH:mm:ss', // 年月日时分秒
    1: 'YYYY-MM-DD', // 年月日
    2: 'HH:mm:ss', // 时分秒
    3: 'YYYY-MM-DD HH:mm', // 年月日时分
    4: 'HH:mm' // 时分
  };

  // 确定要使用的格式字符串
  const formatStr =
    typeof type === 'number'
      ? formatMap[type] || formatMap[1] // 如果是数字类型但不在映射表中，默认使用年月日
      : type; // 如果是字符串类型，直接使用作为自定义格式

  try {
    const formattedDate = dayjs(date).format(formatStr);
    // 检查格式化结果是否有效
    return formattedDate.includes('Invalid Date') ||
      formattedDate.includes('NaN')
      ? '--'
      : formattedDate;
  } catch (error) {
    console.error(
      `Date formatting failed: ${error instanceof Error ? error.message : 'Unknown error'}`
    );
    return '--';
  }
};
