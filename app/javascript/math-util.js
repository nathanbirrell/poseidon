class MathUtil {
  static round(number, precision) {
    let result;
    let factor = Math.pow(10, precision);
    result = number * factor;
    result = Math.round(result);
    result = result / factor;
    return result;
  }
}

export default MathUtil;
