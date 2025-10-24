/**
 * 向 localStorage 存储数据
 *
 * 此函数提供了类型安全的 localStorage 设置操作，专门用于存储字符串类型的数据。
 * 与 Storage 类不同，此函数直接操作原始字符串值，不进行 JSON 序列化处理。
 *
 * @param key 存储键名（字符串类型）
 * @param value 存储值（字符串类型）
 * @returns void
 * @throws 当 key 或 value 不是字符串类型时抛出错误
 *
 * @example
 * // 设置本地存储
 * ut_setLS('username', '张三');
 *
 * @deprecated 建议使用 Storage 类替代，以获得更好的类型安全性和错误处理
 *
 * 替代方案示例：
 *
 * const usernameStorage = new Storage<string>('username', '');
 *
 * usernameStorage.set('张三');
 */
export const ut_setLS = (key: string, value: string) => {
  if (typeof key !== 'string') throw new Error('key is not string');
  if (typeof value !== 'string') throw new Error('value is not string');

  localStorage.setItem(key, value);
};

/**
 * 从 localStorage 获取数据
 *
 * 此函数提供了类型安全的 localStorage 获取操作，专门用于获取字符串类型的数据。
 * 与 Storage 类不同，此函数直接返回原始字符串值，不进行 JSON 反序列化处理。
 * 如果键不存在或值为 null，则返回空字符串作为默认值。
 *
 * @param key 存储键名（字符串类型）
 * @returns 存储的值（字符串类型），如果不存在则返回空字符串
 * @throws 当 key 不是字符串类型时抛出错误
 *
 * @example
 * // 获取本地存储
 * const username = ut_getLS('username');
 * console.log(username); // 输出: '张三' 或 ''（如果不存在）
 *
 * @deprecated 建议使用 Storage 类替代，以获得更好的类型安全性和错误处理
 *
 * 替代方案示例：
 *
 * const usernameStorage = new Storage<string>('username', '');
 *
 * const username = usernameStorage.get();
 */
export const ut_getLS = (key: string) => {
  if (typeof key !== 'string') throw new Error('key is not string');
  const Breadcrumbs = localStorage.getItem(key);
  return Breadcrumbs || '';
};
