export interface CompanyDescription {
  /**
   * country Country Name
   * currency Currency Symbol
   * exchange Company’s Exchange
   * name Company’s Name
   * ticker Company’s Symbol
   * ipo Company’s Start Date
   * marketCapitalization Company’s MarketCap
   * shareOutstanding Company’s Shares
   * logo Company’s Logo
   * phone Company’s Contact No.
   * weburl Company’s Website Url
   * finnhubIndustry Company’s Industry
   */
  country: string;
  currency: string;
  exchange: string;
  finnhubIndustry: string;
  ipo: string;
  logo: string;
  marketCapitalization: number;
  name: string;
  phone: string;
  shareOutstanding: number;
  ticker: string;
  weburl: string;
}
