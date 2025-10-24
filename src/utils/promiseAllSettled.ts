/**
 * 处理一组 Promise，无论成功失败都返回结果，并统一错误格式
 * @param array Promise 数组或包含 Promise 的数组
 * @returns 处理后的结果数组，成功项直接返回值，失败项返回标准化的错误对象
 */
export const ut_promiseAllSettled = async <T>(
  array: Array<T>
): Promise<
  Array<
    Awaited<T> | { ok: boolean; code: number; data: undefined; message: string }
  >
> => {
  // 类型检查，确保传入的是数组
  if (!Array.isArray(array)) {
    throw new TypeError('Expected an array of promises');
  }
  // 直接返回处理结果，避免不必要的 Promise 嵌套
  const results = await Promise.allSettled(array);

  // 映射结果数组
  return results.map((item) => {
    if (item.status === 'fulfilled') {
      return { ok: !(item.value as { code: number }).code, ...item.value };
    } else {
      // 确保错误消息始终是字符串类型
      const errorMessage =
        item.reason instanceof Error
          ? item.reason.message
          : typeof item.reason === 'string'
            ? item.reason
            : 'Unknown error';

      return {
        ok: false,
        code: 1,
        data: undefined,
        message: errorMessage
      };
    }
  });
};
