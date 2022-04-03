export interface CompanyHistoricalData {
  /**
   * C List of close prices for returned candles.
   * H List of high prices for returned candles.
   * L List of low prices for returned candles.
   * O List of open prices for returned candles.
   * S Status of the response. This field can either be ok or no_data.
   * T List of timestamp for returned candles.
   * V List of volume data for returned candles
   */
  c: number[];
  h: number[];
  l: number[];
  o: number[];
  s: number[];
  t: number[];
  v: number[];
}
