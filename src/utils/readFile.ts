/**
 * @description: 解析上传文件的内容
 *
 * @param file 上传的文件
 * @param callback 回调函数，参数为文件内容
 */
export const ut_readFile = (
  file: File,
  callback: (content: string | ArrayBuffer | null) => void
): void => {
  // 支持现代浏览器和 IE10+
  if (window.FileReader) {
    const reader = new FileReader();

    // 使用箭头函数避免 this 指向问题
    reader.onload = (event: ProgressEvent<FileReader>) => {
      callback(event.target?.result || null);
    };

    // 添加错误处理
    reader.onerror = (error: ProgressEvent<FileReader>) => {
      console.error('文件读取失败:', error);
      callback(null);
    };

    reader.readAsText(file);
  } else {
    console.error('您的浏览器不支持文件读取功能');
    callback(null);
  }
};
