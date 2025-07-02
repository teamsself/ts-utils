export class ByteUtils {
  private data: Uint8Array;

  constructor(_data: Uint8Array) {
    this.data = _data;
  }

  private static toBinaryString(data: Uint8Array): string {
    return Array.from(data)
      .map((byte) => String.fromCharCode(byte))
      .join('');
  }

  private static charCodeAtUtf8(str: string): Array<number> {
    const utf8 = [];
    for (let i = 0; i < str.length; i++) {
      let code = str.charCodeAt(i);
      if (code < 0x80) {
        utf8.push(code);
      } else if (code < 0x800) {
        utf8.push(0xc0 | (code >> 6), 0x80 | (code & 0x3f));
      } else if (code < 0xd800 || code >= 0xe000) {
        utf8.push(
          0xe0 | (code >> 12),
          0x80 | ((code >> 6) & 0x3f),
          0x80 | (code & 0x3f)
        );
      } else {
        // 处理代理对
        i++;
        code = 0x10000 + (((code & 0x3ff) << 10) | (str.charCodeAt(i) & 0x3ff));
        utf8.push(
          0xf0 | (code >> 18),
          0x80 | ((code >> 12) & 0x3f),
          0x80 | ((code >> 6) & 0x3f),
          0x80 | (code & 0x3f)
        );
      }
    }
    return utf8;
  }

  toArrayBuffer(): ArrayBuffer {
    const arrayBuffer = this.bytes().buffer; // 返回 ArrayBuffer
    console.log(
      'fromArrayBuffer.str',
      ByteUtils.fromArrayBuffer(arrayBuffer as ArrayBuffer).string()
    );
    return arrayBuffer as ArrayBuffer; // 返回 ArrayBuffer
  }

  bytes(): Uint8Array {
    return this.data;
  }

  hex(): string {
    return Array.from(this.data)
      .map((byte) => byte.toString(16).padStart(2, '0'))
      .join('');
  }

  string(): string {
    return ByteUtils.toBinaryString(this.data);
  }

  base64(): string {
    return btoa(ByteUtils.toBinaryString(this.data));
  }

  static random(size = 16): ByteUtils {
    const bytes = new Uint8Array(size);
    for (let i = 0; i < size; i++) {
      bytes[i] = Math.floor(Math.random() * 256);
    }

    return new ByteUtils(bytes);
  }

  static fromHex(hex: string): ByteUtils {
    if (hex.length % 2 !== 0) {
      console.error(hex + ' Invalid hex string');
      throw new Error(`${hex} is an invalid hex string`);
    }

    const bytes = new Uint8Array(hex.length / 2);
    for (let i = 0; i < hex.length; i += 2) {
      bytes[i / 2] = parseInt(hex.substr(i, 2), 16);
    }

    return new ByteUtils(bytes);
  }

  static fromString(str: string): ByteUtils {
    const utf8 = this.charCodeAtUtf8(str);
    return new ByteUtils(new Uint8Array(utf8));
  }

  static fromBase64(base64: string): ByteUtils {
    const binaryString = atob(base64);
    const utf8 = this.charCodeAtUtf8(binaryString);
    return new ByteUtils(new Uint8Array(utf8));
  }

  static fromArrayBuffer(buffer: ArrayBuffer): ByteUtils {
    return new ByteUtils(new Uint8Array(buffer));
  }
}
