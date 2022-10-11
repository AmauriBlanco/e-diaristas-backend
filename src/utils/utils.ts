export class Utils {
  formatDecimal(decimal: number) {
    return parseInt(String(decimal).replace(/[\.\,]/g, ''));
  }
}
