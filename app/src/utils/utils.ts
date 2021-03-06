export class Utils {
  public static getTickerColor(dp: number): string {
    let color: string = 'black'
    if (dp > 0) {
      color = 'green'
    } else if (dp < 0) {
      color = 'red'
    }
    return color
  }

  public static toTwoDecimal(num: number): number {
    return Number(num.toFixed(2))
  }
}
