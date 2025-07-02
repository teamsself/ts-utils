/**
 * 下载文件 Blob
 * @param data 文件数据
 * @param type 文件类型
 */
export const ut_downloadBlob = (
  data: ArrayBuffer | Blob,
  type?: keyof typeof blobType,
  name?: string
) => {
  const blob = new Blob([data], {
    type: blobType[type ?? 'xlsx']
  }); // 2.获取请求返回的response对象中的blob 设置文件类型，这里以excel为例
  const url = window.URL.createObjectURL(blob); // 3.创建一个临时的url指向blob对象
  // 4.创建url之后可以模拟对此文件对象的一系列操作，例如：预览、下载
  const a = document.createElement('a');
  a.href = url;
  a.download =
    name ?? `${url.split('/')[url.split('/').length - 1]}.${type ?? 'xlsx'}`;
  // 5.释放这个临时的对象url
  a.click();

  window.URL.revokeObjectURL(url);
};

export const blobType = {
  xls: 'application/vnd.ms-excel',
  xlsx: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  xlsm: 'application/vnd.ms-excel.sheet.macroEnabled.12',
  csv: 'text/csv',
  doc: 'application/msword',
  docx: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  pdf: 'application/pdf',
  ppt: 'application/vnd.ms-powerpoint',
  pptx: 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
  png: 'image/png',
  gif: 'image/gif',
  jpeg: 'image/jpeg',
  jpg: 'image/jpeg',
  mp3: 'audio/mpeg',
  aac: 'audio/aac',
  html: 'text/html',
  css: 'text/css',
  js: 'text/javascript',
  json: 'application/json',
  abw: 'application/x-abiword',
  arc: 'application/x-freearc',
  avi: 'video/x-msvideo',
  azw: 'application/vnd.amazon.ebook',
  bin: 'application/octet-stream',
  bmp: 'image/bmp',
  bz: 'application/x-bzip',
  bz2: 'application/x-bzip2',
  csh: 'application/x-csh',
  eot: 'application/vnd.ms-fontobject',
  epub: 'application/epub+zip',
  htm: 'text/html',
  ico: 'image/vnd.microsoft.icon',
  ics: 'text/calendar',
  jar: 'application/java-archive',
  jsonld: 'application/ld+json',
  mid: 'audio/midi audio/x-midi',
  midi: 'audio/midi audio/x-midi',
  mjs: 'text/javascript',
  mpeg: 'video/mpeg',
  mpkg: 'application/vnd.apple.installer+xml',
  odp: 'application/vnd.oasis.opendocument.presentation',
  ods: 'application/vnd.oasis.opendocument.spreadsheet',
  odt: 'application/vnd.oasis.opendocument.text',
  oga: 'audio/ogg',
  ogv: 'video/ogg',
  ogx: 'application/ogg',
  otf: 'font/otf',
  rar: 'application/x-rar-compressed',
  rtf: 'application/rtf',
  sh: 'application/x-sh',
  svg: 'image/svg+xml',
  swf: 'application/x-shockwave-flash',
  tar: 'application/x-tar',
  tif: 'image/tiff',
  tiff: 'image/tiff',
  ttf: 'font/ttf',
  txt: 'text/plain',
  vsd: 'application/vnd.visio',
  wav: 'audio/wav',
  weba: 'audio/webm',
  webm: 'video/webm',
  webp: 'image/webp',
  woff: 'font/woff',
  woff2: 'font/woff2',
  xhtml: 'application/xhtml+xml',
  xml: 'text/xml',
  xul: 'application/vnd.mozilla.xul+xml',
  zip: 'application/zip'
};
