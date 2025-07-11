/**
 * 判断是否是浏览器
 */
const checkDocument = () => {
  if (typeof document === 'undefined') {
    throw new Error(`document is not available in this environment`);
  }
};

export class CSSUtils {
  /**
   * hex 色值转为 RGB 色值
   * @param hex hex 色值
   * @returns
   */
  static hexToRgb(hex: string) {
    // 移除井号（#）并确保是六位数
    hex = hex.replace(/^#/, '');
    if (hex.length !== 6) {
      throw new Error('Invalid hex color format');
    }

    // 解析红、绿、蓝分量
    const r = parseInt(hex.slice(0, 2), 16);
    const g = parseInt(hex.slice(2, 4), 16);
    const b = parseInt(hex.slice(4, 6), 16);

    return [r, g, b]; // `rgb(${r}, ${g}, ${b})`;
  }

  /**
   * hex 色值转为 HSL 色值
   * @param hex hex 色值
   * @returns
   */
  static hexToHsl(hex: string) {
    let [r, g, b] = this.hexToRgb(hex);

    // 归一化 RGB 值到 [0, 1]
    r /= 255;
    g /= 255;
    b /= 255;

    // 计算最大和最小值
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h, s;
    const l = (max + min) / 2;

    // 计算亮度
    if (max === min) {
      h = s = 0; // 无色相和饱和度
    } else {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

      // 计算色相
      switch (max) {
        case r:
          h = (g - b) / d + (g < b ? 6 : 0);
          break;
        case g:
          h = (b - r) / d + 2;
          break;
        case b:
          h = (r - g) / d + 4;
          break;
      }
      h /= 6; // 归一化到 [0, 1]
    }

    // 返回 HSL 值
    return [Math.round(h * 360), Math.round(s * 100), Math.round(l * 100)];
  }

  /**
   * 获取css变量的值
   * @param property
   * @param _dom
   * @returns
   */
  static getCSSPropertyValue(property: string, _dom?: HTMLElement): string {
    checkDocument();

    if (typeof getComputedStyle === 'undefined') return '';

    return getComputedStyle(_dom ?? document.documentElement)
      .getPropertyValue(property)
      .trim();
  }

  /**
   * 设置css变量的值
   * @param property
   * @param value
   * @param _dom
   */
  static setCSSPropertyValue(
    property: string,
    value: string,
    _dom?: HTMLElement
  ): void {
    checkDocument();
    (_dom ?? document.documentElement).style.setProperty(property, value);
  }

  /**
   * 修改css变量的色值 hex -> hsl 例: #ffffff -> [0, 0, 100]
   * @param _list
   * @param _dom
   */
  static changeHexColorToHSLNumber(_list: string[], _dom?: HTMLElement) {
    checkDocument();
    for (let i = 0; i < _list.length; i++) {
      const _key = _list[i];
      const _color = this.getCSSPropertyValue(_key, _dom);
      if (_color.includes('#')) {
        const _num = this.hexToHsl(_color);
        this.setCSSPropertyValue(
          _key,
          `${_num[0]} ${_num[1]}% ${_num[2]}%;`,
          _dom
        );
      }
    }
  }

  /**
   * 修改css变量的色值 hex -> rgb 例: #ffffff -> [255, 255, 255]
   * @param _list
   * @param _dom
   */
  static changeHexColorToRGBNumber(_list: string[], _dom?: HTMLElement) {
    checkDocument();
    for (let i = 0; i < _list.length; i++) {
      const _key = _list[i];
      const _color = this.getCSSPropertyValue(_key, _dom);
      if (_color.includes('#')) {
        const _num = this.hexToRgb(_color);
        this.setCSSPropertyValue(
          _key,
          `${_num[0]}, ${_num[1]}, ${_num[2]};`,
          _dom
        );
      }
    }
  }
}
