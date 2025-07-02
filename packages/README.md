# library-tools

工具函数库

[TOC]

## `ut_dateFormatted`: 日期格式化

```ts
/**
 * @description 日期格式化(凡日期, 统一调用此方法, 不论是否需要)，使用统一 process.env.DATAFORMAT 格式
 * @param date 日期字符串
 * @param type 日期显示字段：0：年月日时分秒、1：年月日、2：时分秒、3：年月日时分、4：时分
 * @returns
 */
const ut_dateFormatted: (date: string, type?: number) => string

例:
const date1 = ut_dateFormatted("2023-9-27 16:50:00", 0); // 2023-9-27 16:50:00
const date2 = ut_dateFormatted("2023-9-27 16:50:00", 1); // 2023-9-27
const date3 = ut_dateFormatted("2023-9-27 16:50:00", 2); // 16:50:00
const date4 = ut_dateFormatted("2023-9-27 16:50:00", 3); // 2023-9-27 16:50
const date5 = ut_dateFormatted("2023-9-27 16:50:00", 4); // 16:50
```

## `ut_debounce`: 防抖函数

> 如果设置了maxWait且小于wait属性，则该函数会变成“节流”函数，即 maxWait 时间内若触发了该事件，则到达最大时间的时候会再次执行
> 如果options.leading和options.trailing都为true，则只有在等待超时期间多次调用已解封的函数时，才会在超时的后边缘调用func

```ts
const debounce = ut_debounce(
  (...arg): void => {
    console.log(...arg);
  },
  250,
  {
    maxWait: 1000,
  }
);
```
| 参数     | 类型           | 描述     |default|
| -------- | -------------- | -------- | |
| func     | (...arg)=>void | 回调函数 | |
| wait     | number         | 防抖时间 | |
| options? | object         | 函数配置 | |
| options?.leading？    | boolean | 是否在超时前调用           | false   |
| options?.maxWait？    | number  | 最大的延时时间（触发间隔） | -       |
| options?.trailing？   | boolean | 是否在超时后调用           | true    |

## `ut_throttle`: 节流函数

> 注意，如果options.leading和options.trailing都为true，则只有在等待超时期间多次调用已解封的函数时，才会在超时的后边缘调用func；

```ts
const throttle = ut_throttle(
  (...arg): void => {
    console.log(...arg);
  },
  250,
  {
    leading: true,
    trailing: false,
  }
);
```

| 参数     | 类型           | 描述     | default |
| -------- | -------------- | -------- | |
| func     | (...arg)=>void | 回调函数 | |
| wait     | number         | 节流时间 | |
| options? | object         | 函数配置 | |
| options?.leading    | boolean | 是否在超时前调用 | true    |
| options?.trailing   | boolean | 是否在超时后调用 | true    |


## `ut_downLoadFile`: 下载文件

```ts
/**
 * 下载文件: 下载目标地址的文件，若为ios终端触发时直接页面跳转
 * url 文件下载地址
 * name 文件名
 */
ut_downLoadFile(url: string, name: string): void

例:
ut_downLoadFile("http://xxx.xxx.xxx/xxxxxx", "file");
```

## `ut_downloadBlob`: 下载 Blob 格式文件

```ts
/**
 * @param data 文件数据
 * @param type 文件类型
 */
ut_downloadBlob: (data: ArrayBuffer | Blob, type?: "xls" | "xlsx" | "xlsm" | "csv" | "doc" | "docx" | "pdf" | "ppt" | "pptx" | "png" | "gif" | "jpeg" | "jpg" | "mp3" | "aac" | "html" | "css" | "js" | "json" | "abw" | "arc" | "avi" | "azw" | "bin" | "bmp" | "bz" | "bz2" | "csh" | "eot" | "epub" | "htm" | "ico" | "ics" | "jar" | "jsonld" | "mid" | "midi" | "mjs" | "mpeg" | "mpkg" | "odp" | "ods" | "odt" | "oga" | "ogv" | "ogx" | "otf" | "rar" | "rtf" | "sh" | "svg" | "swf" | "tar" | "tif" | "tiff" | "ttf" | "txt" | "vsd" | "wav" | "weba" | "webm" | "webp" | "woff" | ... 4 more ... | "zip", name?: string) => void

ut_downloadBlob(new Blob(), "xls", "test.xlsx")
```

## `ut_escape`: 转义 html

> 转义 html
>
> 转换字符串中的“&”，“<”，“>”，“'”，“'”和“`”字符为相应的HTML实体。注意:不转义其他字符。如果需要转义其他字符，请使用第三方库，如he；在IE < 9中，反引号可以脱离属性值或HTML注释被转义；

```ts
const str = ut_escape("<body>"); // "&lt;body&gt;"
```

| 参数   | 类型   | 描述           |
| ------ | ------ | -------------- |
| string | string | 待转义的字符串 |

## `ut_unescape`: 反转译 html 字符串

> 与 `ut_escape` 相反，转换string字符串中的 HTML 实体` &amp;`, `&lt;`, `&gt;`, `&quot;`,`&39;`, 和 `&96;` 为对应的字符

```ts
/**
 * value 待转义的字符串
 */
ut_escape(value: string): string

const unescape = ut_unescape("&lt;body&gt;"); // "<body>"
```

## `ut_isEmpty`: 判断值是否无效

```ts
/**
 * 判断 _data 是否无效
 * undefined | null | '' 均为无效值,返回true，其他情况为非无效值，返回false；
 */
ut_isEmpty(_data: any):boolean

例:
const isEmpty = ut_isEmpty(""); // true
const isEmpty = ut_isEmpty(null); // true
const isEmpty = ut_isEmpty(undefined); // true
const isEmpty = ut_isEmpty("abc"); // false
```

## `ut_isMobile`: 判断设备是否为移动端浏览器

> 若为移动端(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)则返回true
>
> 非移动端返回false；

```ts
const isMobile = ut_isMobile();
```

## `ut_isWXBrowser`: 判断设备是否为微信浏览器

```ts
const isWXBrowser = ut_isWXBrowser();
```
## `ut_openNewWin`: 打开新的标签页

> ps:传入的\_url必须以'http://'或'https://'为开始；

```ts
ut_openNewWin(_url: string): void

const openNewWin = ut_openNewWin("http://xxx.xxxxxxx.xxx/xxxxx");
```

| 参数  | 类型   | 描述             |
| ----- | ------ | ---------------- |
| \_url | string | 要打开的页面地址 |

## `ut_readFile`: 解析文件内容

> fn回调函数在file加载完后执行,其中el为文件解析完成获取到的数据；

```ts
ut_readFile(file: File, fn: (el) => void): void

const file:File = new File(...);
ut_readFile(file,(el)=>{
  console.log(...el);
});
```

| 参数   | 类型       | 描述               |
| ------ | ---------- | ------------------ |
| \_file | File       | 上传的文件         |
| fn     | (el:string \| ArrayBuffer)=>void | 回调函数 |

## `ut_round`: 数字四舍五入

> 传入数字和精度，返回四舍五入后的数字,若没有设置precision则默认为0；

```ts
ut_round(n: number, precision: number = 0): void

const num = ut_round(3.14, 1); // 3.1
```


| 参数      | 类型   | 描述               | default |
| --------- | ------ | ------------------ | ------- |
| n         | number | 需要四舍五入的数字 | -       |
| precision | number | 四舍五入的精度     | 0       |

## `ut_thousands`: 数字转千分位

> 将数字千分化，如19999=>"19,999","3245269"=>"3,245,269"；

```ts
/**
 * value 传入的数字 string | number
 */
ut_thousands(value: string | number):string

const thousands1 = ut_thousands(19999); // "19,999"
const thousands2 = ut_thousands("3245269"); // "3,245,269"
```
## `ut_clone`: 浅拷贝对象

```ts
var objects = [{ a: 1 }, { b: 2 }];
var shallow = ut_clone(objects);
console.log(shallow[0] === objects[0]);
// true
```

## `ut_amount`: 金额显示两位小数

```ts
/**
 * @param value 金额
 * @param unit 单位
 */
ut_amount: (value: string | number, unit?: string) => string
```

## `ut_cloneDeep`: 深拷贝对象

```ts
var objects = [{ a: 1 }, { b: 2 }];
var shallow = ut_cloneDeep(objects);
console.log(shallow[0] === objects[0]);
// false
```

## `new Storage()`: localStorage 存取

```ts
// userInfo: 存储的 key
const userInfoStorage = new Storage('userInfo',{name: '', age: 1});

// userInfoStorage.set(data);
// data: 存储的 值
userInfoStorage.set({name: 'name', age: 10});

// userInfo: 获取存储的值
const userInfo = userInfoStorage.get();

// 删除存储在 localStorage 的 key
userInfoStorage.remove();
```

## `ut_reg`: 正则校验工具，返回常用校验函数

```ts
 ut_reg().isValidPhone(13478789898)
 // true
 ut_reg().isValidPhone('test')
 // false
 ...
```

| 方法              | 参数  | 类型   | 描述                         |
| ----------------- | ----- | ------ | ---------------------------- |
| isValidPhone      | value | string | 验证手机号                   |
| isValidEmail      | value | string | 验证电子邮件                 |
| isValidBankCard   | value | string | 验证是否为银行卡号           |
| isValidDate       | value | string | 验证日期（格式：YYYY-MM-DD） |
| isValidTime       | value | string | 验证时间（格式：HH:MM:SS）   |
| isValidIDCard     | value | string | 验证身份证号                 |
| isValidPostalCode | value | string | 验证邮政编码                 |
| isAlpha           | value | string | 验证仅包含字母               |
| isValidPhone      | value | string | 验证仅包含数字               |
| isNumeric         | value | string | 验证手机号                   |
| isAlphanumeric    | value | string | 验证仅包含字母和数字         |
| isLowercase       | value | string | 验证仅包含小写字母           |
| isUppercase       | value | string | 验证仅包含大写字母           |
| isPositiveInteger | value | string | 验证是否为正整数             |
| isNegativeInteger | value | string | 验证是否为负整数             |
| isInteger         | value | string | 验证是否为整数               |
| isFloat           | value | string | 验证是否为浮点数             |
| isPositiveFloat   | value | string | 验证是否为正浮点数           |
| isNegativeFloat   | value | string | 验证是否为负浮点数           |
| isHexColor        | value | string | 验证是否为浮点数             |

## `ut_reg_patterns`: 返回正则

```ts
 ut_reg_patterns.phone
 //  /^1[3-9]\d{9}$/
 ut_reg_patterns.email
 // /^[^\s@]+@[^\s@]+\.[^\s@]+$/
 ...
```

| 属性                | 描述                         |
| ------------------- | ---------------------------- |
| phone               | 验证手机号                   |
| email               | 验证电子邮件                 |
| bankCard            | 验证是否为银行卡号           |
| date                | 验证日期（格式：YYYY-MM-DD） |
| time                | 验证时间（格式：HH:MM:SS）   |
| idCard              | 验证身份证号                 |
| postalCode          | 验证邮政编码                 |
| alpha               | 验证仅包含字母               |
| numeric             | 验证仅包含数字               |
| alphanumeric        | 验证仅包含字母和数字         |
| lowercase           | 验证仅包含小写字母           |
| uppercase           | 验证仅包含大写字母           |
| positiveInteger     | 验证是否为正整数             |
| negativeInteger     | 验证是否为负整数             |
| integer             | 验证是否为整数               |
| float               | 验证是否为浮点数             |
| positiveFloat       | 验证是否为正浮点数           |
| negativeFloat       | 验证是否为负浮点数           |
| hexColor            | 验证是否为颜色十六进制代码   |

## `ut_uniqueId`: 生成唯一ID

```ts
uniqueId('id_')
```

## CSSUtils: 修改CSS属性

```ts
const cssUtils = new CSSUtils();
cssUtils.hexToRgb("#FFFFFF"); // rgb(255, 255, 255);
// 获取 css 变量 -color-primary 的值
cssUtils.getCSSPropertyValue("-color-primary");
// 设置 css 变量 -color-primary 的值
cssUtils.setCSSPropertyValue("-color-primary","rgb(255, 255, 255)");
```

## ByteUtils: Byte转换

```ts	
// 获取随机 Uint8Array (default:16)
const byteUtils = ByteUtils.random(number);

// 从不同的类型转换为 Uint8Array
const byteUtils = ByteUtils.fromHex();
const byteUtils = ByteUtils.fromString();
const byteUtils = ByteUtils.fromBase64();
const byteUtils = ByteUtils.fromArrayBuffer();

// 转为不同类型
byteUtils.toArrayBuffer();
byteUtils.bytes();
byteUtils.hex();
byteUtils.string();
byteUtils.base64();
```











