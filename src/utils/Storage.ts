/**
 * 泛型接口，用于定义每个存储项的 key 和默认值类型
 */
interface IStorage<T> {
  key: string;
  defaultValue: T;
}
/**
 * 可统一设置 LocalStorage 的 key 前缀
 */
const prefix = 'APP_';
/**
 * Storage 封装类：用于类型安全地操作 localStorage
 * 提供 get / set / remove 接口，自动处理 JSON 序列化、反序列化及异常情况
 *
 * @template T 存储的数据类型
 */
export class Storage<T> implements IStorage<T> {
  key: string;
  defaultValue: T;
  /**
   * 创建一个新的 Storage 实例
   * @param key - 存储在 localStorage 中的 key（内部会自动添加前缀）
   * @param defaultValue - 如果未设置值或解析失败时使用的默认值
   */
  constructor(key: string, defaultValue: T) {
    // 加前缀后存入 key，确保 key 命名统一、避免冲突
    this.key = prefix + key;
    this.defaultValue = defaultValue;
  }
  /**
   * 设置值到 localStorage，会自动进行 JSON 序列化
   * @param value - 要存储的值，类型由泛型决定
   */
  set(value: T) {
    try {
      const str = JSON.stringify(value);

      localStorage.setItem(this.key, str);
    } catch (e) {
      console.error(`Storage 设置失败: ${this.key}`, e);
    }
  }
  /**
   * 从 localStorage 中读取值，自动反序列化为指定类型
   * 如果 key 不存在或解析失败，则返回默认值
   * @returns 类型安全的值
   */
  get(): T {
    const raw = localStorage.getItem(this.key); // 若为空值或非法值，直接返回默认值
    if (!raw || raw === 'null' || raw === 'undefined') {
      return this.defaultValue;
    }
    try {
      return JSON.parse(raw) as T;
    } catch (e) {
      console.warn(`Storage 解析失败，返回默认值: ${this.key}`, e);
      return this.defaultValue;
    }
  }
  /**
   * 删除当前 key 对应的存储项
   */
  remove() {
    localStorage.removeItem(this.key);
  }
}
