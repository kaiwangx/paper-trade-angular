export function getTickerDisplayColor(dp: number): string {
  let color: string = 'black'
  if (dp > 0) {
    color = 'green'
  } else if (dp < 0) {
    color = 'red'
  }
  return color
}
