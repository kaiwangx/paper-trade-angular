import {CompanyDescription} from "./company-description";
import {CompanyLastPrice} from "./company-last-price";
import {CompanyHistoricalData} from "./company-historical-data";
import {CompanyNewItem} from "./company-new-item";
import {CompanySocialSentiment} from "./company-social-sentiments";
import {CompanyRecommendationTrendsItem} from "./company-recommendation-trends-item";
import {CompanyEarningsItem} from "./company-earnings-item";

export interface CompanyData {
  companyDescription: CompanyDescription;
  tickerLastPrice: CompanyLastPrice;
  companyPeers: string[];
  companyHourlyData: CompanyHistoricalData;
  companyNews: CompanyNewItem[];
  companyHistoricalDataLastTwoYear: CompanyHistoricalData;
  companySocialSentiment: CompanySocialSentiment;
  companyRecommendationTrend: CompanyRecommendationTrendsItem[];
  companyEarnings: CompanyEarningsItem[];
  currentDate: string;
  marketIsOpen: boolean;
  tickerColor: string;
  lastStockDataTimeStamp: string;
  companyNewsWithGraph: CompanyNewItem[];
}
