export class CSSUtils {
  root: HTMLElement;

  constructor() {
    if (typeof document === 'undefined') {
      throw new Error(`document is not available in this environment`);
    }
    this.root = document.documentElement;
  }

  hexToRgb(hex: string) {
    // 移除井号（#）并确保是六位数
    hex = hex.replace(/^#/, '');
    if (hex.length !== 6) {
      throw new Error('Invalid hex color format');
    }

    // 解析红、绿、蓝分量
    const r = parseInt(hex.slice(0, 2), 16);
    const g = parseInt(hex.slice(2, 4), 16);
    const b = parseInt(hex.slice(4, 6), 16);

    return `rgb(${r}, ${g}, ${b})`;
  }

  getCSSPropertyValue(property: string): string {
    if (typeof getComputedStyle === 'undefined') return '';

    return getComputedStyle(this.root).getPropertyValue(property).trim();
  }

  setCSSPropertyValue(property: string, value: string): void {
    this.root.style.setProperty(property, value);
  }
}
