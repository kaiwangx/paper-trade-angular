import {CompanyDescription} from "./company-description";
import {CompanyLastPrice} from "./company-last-price";
import {CompanyHistoricalData} from "./company-historical-data";
import {CompanyNewItem} from "./company-new-item";
import {CompanySocialSentiment} from "./company-social-sentiments";
import * as dayjs from "dayjs";
import {CompanyRecommendationTrendsItem} from "./company-recommendation-trends-item";
import {CompanyEarningsItem} from "./company-earnings-item";
import {getTickerDisplayColor} from "../../utils/get-ticker-display-color";
import {WatchlistService} from "../services/watchlist.service";

export class CompanyData {
  // todo: add LA timezone
  public currentDate = dayjs();
  public marketIsOpen: boolean;
  public tickerColor: string = "";
  public lastStockDataTimeStamp = dayjs();
  public companyNewsWithGraph: CompanyNewItem[];
  public savedInWatchList: boolean;

  constructor(public companyDescription: CompanyDescription,
              public tickerLastPrice: CompanyLastPrice,
              public companyPeers: string[],
              public companyHourlyData: CompanyHistoricalData,
              public companyNews: CompanyNewItem[],
              public companyHistoricalDataLastTwoYear: CompanyHistoricalData,
              public companySocialSentiment: CompanySocialSentiment,
              public companyRecommendationTrend: CompanyRecommendationTrendsItem[],
              public companyEarnings: CompanyEarningsItem[],
              private watchListService: WatchlistService
  ) {
    this.lastStockDataTimeStamp = dayjs.unix(this.tickerLastPrice.t)
    this.marketIsOpen = this.currentDate.diff(this.lastStockDataTimeStamp, 'minutes') < 5
    this.tickerColor = getTickerDisplayColor(this.tickerLastPrice.dp)
    this.companyNewsWithGraph = this.companyNews.filter(companyNew => {
      return companyNew.source !== "" && companyNew.image !== "" && companyNew.datetime != 0
        && companyNew.headline != "" && companyNew.summary != "" && companyNew.url != ""
    })
    this.savedInWatchList = this.watchListService.includes(this.companyDescription.ticker)
  }
}
