export interface CompanyLastPrice {
  /**
   * c current price
   * d change in price
   * dp percentage change in price
   * h high price of the day.
   * l low price of the day.
   * o open price of the day.
   * pc Previous close price
   * t Timestamp of last stock data
   */
  c: number;
  d: number;
  dp: number;
  h: number;
  l: number;
  o: number;
  pc: number;
  t: number;
}
