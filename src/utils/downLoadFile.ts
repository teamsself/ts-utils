/**
 * 下载文件
 *
 * @param url 下载地址
 * @param name 文件名
 * @param options 下载选项
 * @returns Promise<void> 下载完成或失败的Promise
 * @throws Error 当参数验证失败时抛出错误
 */
export const ut_downLoadFile = (
  url: string,
  name: string,
  options: { timeout?: number; headers?: Record<string, string> } = {}
): Promise<void> => {
  // 参数验证
  if (!url || typeof url !== 'string') {
    throw new Error('下载地址必须是有效的字符串');
  }

  if (!name || typeof name !== 'string') {
    throw new Error('文件名必须是有效的字符串');
  }

  // 检查运行环境
  if (typeof window === 'undefined' || typeof document === 'undefined') {
    throw new Error('此函数只能在浏览器环境中运行');
  }

  // 提取options参数
  const { timeout = 30000, headers = {} } = options;

  return new Promise((resolve, reject) => {
    try {
      const u = navigator.userAgent;
      const isAndroid = /Android|Adr/i.test(u); // 简化的Android检测
      const isiOS = /iPhone|iPad|iPod|iOS/i.test(u); // 简化的iOS检测
      const isMobile = isAndroid || isiOS;

      // 针对移动设备的特殊处理
      if (isMobile) {
        // 优先尝试使用Blob方式下载
        try {
          // 创建下载任务
          const downloadTask = async () => {
            try {
              const response = await fetch(url, {
                headers,
                credentials: 'include'
              });
              if (!response.ok) {
                throw new Error(`下载失败: HTTP ${response.status}`);
              }

              const blob = await response.blob();
              const objectUrl = URL.createObjectURL(blob);

              // 移动设备特殊处理
              if (isiOS) {
                // iOS设备使用更兼容的方式
                const link = document.createElement('a');
                link.href = objectUrl;
                link.download = name;
                link.target = '_blank';
                document.body.appendChild(link);

                // iOS Safari需要特殊处理
                if (
                  navigator.vendor &&
                  navigator.vendor.indexOf('Apple') > -1 &&
                  navigator.userAgent &&
                  navigator.userAgent.indexOf('CriOS') === -1 &&
                  navigator.userAgent.indexOf('FxiOS') === -1
                ) {
                  // 对于iOS Safari，我们无法强制下载，但可以尝试打开
                  link.click();
                  // 等待一小段时间后清理
                  setTimeout(() => {
                    document.body.removeChild(link);
                    URL.revokeObjectURL(objectUrl);
                    resolve();
                  }, 150);
                } else {
                  link.click();
                  document.body.removeChild(link);
                  URL.revokeObjectURL(objectUrl);
                  resolve();
                }
              } else if (isAndroid) {
                // Android设备使用iframe方式作为备选
                const myFrame = document.createElement('iframe');
                myFrame.style.display = 'none';
                myFrame.src = objectUrl;
                myFrame.onload = () => {
                  setTimeout(() => {
                    document.body.removeChild(myFrame);
                    URL.revokeObjectURL(objectUrl);
                    resolve();
                  }, 500);
                };
                myFrame.onerror = (error) => {
                  document.body.removeChild(myFrame);
                  URL.revokeObjectURL(objectUrl);
                  reject(
                    new Error(
                      'Android设备下载失败: ' +
                        (error as unknown as Error).message
                    )
                  );
                };
                document.body.appendChild(myFrame);
              }
            } catch (error) {
              // 如果fetch方式失败，尝试回退到原始方式
              fallbackDownload(url, name, isAndroid, isiOS, resolve, reject);
            }
          };

          downloadTask();
        } catch (error) {
          // 如果上述方法都失败，使用原始方式
          fallbackDownload(url, name, isAndroid, isiOS, resolve, reject);
        }
      } else {
        // 桌面设备使用标准a标签下载
        const a = document.createElement('a');
        a.download = name;
        a.href = url;
        a.target = '_blank';

        // 确保链接在DOM中存在足够长时间以触发点击
        document.body.appendChild(a);

        // 创建点击事件并触发
        const clickEvent = new MouseEvent('click', {
          view: window,
          bubbles: true,
          cancelable: true
        });
        a.dispatchEvent(clickEvent);

        // 清理DOM元素
        setTimeout(() => {
          document.body.removeChild(a);
          resolve();
        }, 100);
      }

      // 设置超时处理
      const timeoutId = setTimeout(() => {
        reject(new Error('下载超时，请检查网络连接后重试'));
      }, timeout);

      // 清理超时定时器
      const cleanup = () => clearTimeout(timeoutId);
      window.addEventListener('beforeunload', cleanup);

      // 确保清理函数被调用
      const originalResolve = resolve;
      resolve = ((...args) => {
        cleanup();
        window.removeEventListener('beforeunload', cleanup);
        originalResolve(...args);
      }) as typeof resolve;
    } catch (error) {
      reject(
        error instanceof Error ? error : new Error('下载过程中发生未知错误')
      );
    }
  });
};

/**
 * 回退下载方式
 * @private
 */
function fallbackDownload(
  url: string,
  name: string,
  isAndroid: boolean,
  isiOS: boolean,
  resolve: (value: void | PromiseLike<void>) => void,
  reject: (reason?: any) => void
): void {
  try {
    if (isAndroid) {
      // 原始Android iframe下载方式
      const myFrame = document.createElement('iframe');
      myFrame.src = url;
      myFrame.style.display = 'none';
      document.body.appendChild(myFrame);

      // 设置一个超时来清理iframe
      setTimeout(() => {
        document.body.removeChild(myFrame);
        resolve();
      }, 2000);
    } else if (isiOS) {
      // 原始iOS页面跳转方式
      const newWindow = window.open(url, '_blank');
      if (!newWindow) {
        reject(new Error('无法打开新窗口进行下载，请检查浏览器弹出窗口设置'));
      } else {
        // 尝试在新窗口中触发下载
        setTimeout(() => {
          resolve();
        }, 1000);
      }
    }
  } catch (error) {
    reject(error instanceof Error ? error : new Error('回退下载方式失败'));
  }
}
