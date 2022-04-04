import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {TickerSearchService} from "../../services/ticker-search.service";
import {CompanyData} from "../../interfaces/company-data";
import {WatchlistService} from "../../services/watchlist.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {PortfolioService} from "../../services/portfolio.service";
import {TransactionModelComponent} from "../transaction-model/transaction-model.component";
import {debounceTime, forkJoin, map, mergeMap, Observable, of, Subject, tap} from "rxjs";
import * as dayjs from "dayjs";
import {Utils} from "../../../utils/utils";
import {CompanyNewItem} from "../../interfaces/company-new-item";
import {PortfolioItem} from "../../interfaces/portfolio-item";

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.css']
})
export class SearchResultComponent implements OnInit {

  isLoading!: boolean
  tickerData!: CompanyData
  inPortfolio!: boolean
  isvalidData!: boolean
  alertMessage: string = ""
  alertType: string = 'success'
  inWatchlist!: boolean
  refreshEvent!: number

  constructor(private route: ActivatedRoute,
              private tickerSearchService: TickerSearchService,
              private watchListService: WatchlistService,
              private modalService: NgbModal,
              private portfolioService: PortfolioService,
  ) {
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => this.getTickerData(String(this.route.snapshot.paramMap.get('ticker'))))
    if (this.isvalidData) {
      this.refreshEvent = setInterval(() => this.updateTickerData(), 15*1000)
    }
  }

  // only for valid data
  updateTickerData(): void {
    console.log(`refresh data on ${dayjs().format('YYYY-MM-DD HH:mm:ss')}`)
    const ticker = this.tickerData.companyDescription.ticker
    this.tickerSearchService.getTickerLastPrice(ticker).pipe(
        mergeMap(tickerLastPrice => {
          return forkJoin([
            // this.tickerSearchService.getCompanyDescription(ticker),
            of(tickerLastPrice),
            // this.tickerSearchService.getCompanyPeers(ticker),
            this.tickerSearchService.getCompanyHourlyData(ticker, tickerLastPrice.t),
          ])
        })
      ).subscribe(res => {
        this.tickerData.tickerLastPrice = res[0]
        this.tickerData.companyHourlyData = res[1]
    })
  }

  getTickerData(ticker: string): void {
    this.isvalidData = true
    this.isLoading = true
    let cachedData: CompanyData | null = this.tickerSearchService.retrieve(ticker)
    if (cachedData !== null) {
      this.tickerData = cachedData
      this.isLoading = false
      this.updateTickerStatus()
    } else {
      this.tickerSearchService.getCompanyDescription(ticker).subscribe(description => {
        if (description
          && Object.keys(description).length === 0
          && Object.getPrototypeOf(description) === Object.prototype) {
          this.isvalidData = false
          this.isLoading = false
        } else {
          const data: Observable<CompanyData> = this.tickerSearchService.getTickerLastPrice(ticker)
            .pipe(
              mergeMap(tickerLastPrice => {
                return forkJoin([
                  of(description),
                  of(tickerLastPrice),
                  this.tickerSearchService.getCompanyPeers(ticker),
                  this.tickerSearchService.getCompanyHourlyData(ticker, tickerLastPrice.t),
                  this.tickerSearchService.getCompanyNews(ticker),
                  this.tickerSearchService.getCompanyHistoricalDataLastTwoYear(ticker),
                  this.tickerSearchService.getCompanySentiments(ticker),
                  this.tickerSearchService.getCompanyRecommendationTrends(ticker),
                  this.tickerSearchService.getCompanyEarnings(ticker),
                ])
              }),
              map(res => {
                let _currentDate = dayjs()
                let _lastStockDataTimeStamp = dayjs.unix(res[1].t)
                return {
                  companyDescription: res[0],
                  tickerLastPrice: res[1],
                  companyPeers: res[2],
                  companyHourlyData: res[3],
                  companyNews: res[4],
                  companyHistoricalDataLastTwoYear: res[5],
                  companySocialSentiment: res[6],
                  companyRecommendationTrend: res[7],
                  companyEarnings: res[8],
                  currentDate: _currentDate.format('YYYY-MM-DD HH:mm:ss'),
                  marketIsOpen: _currentDate.diff(_lastStockDataTimeStamp, 'minutes') < 5,
                  tickerColor: Utils.getTickerColor(res[1].dp),
                  lastStockDataTimeStamp: _lastStockDataTimeStamp.format('YYYY-MM-DD HH:mm:ss'),
                  companyNewsWithGraph: this.filterCompanyNews(res[4]),
                }
              })
            )
          data.subscribe(tickerData => {
            this.tickerData = tickerData
            this.updateTickerStatus()
            this.tickerSearchService.save(tickerData)
            this.isLoading = false
          })
        }
      })
    }
  }

  updateTickerStatus() {
    this.updatePortfolioStatus()
    this.updateWatchlistStatus()
  }

  updateWatchlistStatus() {
    this.inWatchlist = this.watchListService.includes(this.tickerData.companyDescription.ticker)
  }

  updatePortfolioStatus(): void {
    this.inPortfolio = this.portfolioService.includes(this.tickerData.companyDescription.ticker)
  }

  filterCompanyNews(companyNews: CompanyNewItem[]) {
    return companyNews.filter(companyNew => {
      return companyNew.source !== "" && companyNew.image !== "" && companyNew.datetime != 0
        && companyNew.headline != "" && companyNew.summary != "" && companyNew.url != ""
    })
  }

  addTickerToWatchList(): void {
    this.inWatchlist = true
    this.watchListService.add(this.tickerData.companyDescription.ticker)
    this.alertMessage = `${this.tickerData.companyDescription.ticker} added to Watchlist`
    this.alertType = "success"
  }

  removeTickerFromWatchList(): void {
    this.inWatchlist = false
    this.watchListService.remove(this.tickerData.companyDescription.ticker)
    this.alertMessage = `${this.tickerData.companyDescription.ticker} removed from Watchlist`
    this.alertType = "danger"
  }

  openTransactionModel(type: string) {
    const modalRef = this.modalService.open(TransactionModelComponent);
    modalRef.componentInstance.currentPrice = this.tickerData.tickerLastPrice.c
    modalRef.componentInstance.ticker = this.tickerData.companyDescription.ticker
    modalRef.componentInstance.transactionType = type
    modalRef.componentInstance.companyDescription = this.tickerData.companyDescription
    const portfolioItem: PortfolioItem | undefined = this.portfolioService.find(this.tickerData.companyDescription.ticker)
    modalRef.componentInstance.currentQuantity = portfolioItem === undefined ? 0 : portfolioItem.quantity
    modalRef.result.then((data) => {
      // on close
      this.alertType = (type === "Buy") ? "success" : "danger"
      this.alertMessage = this.tickerData.companyDescription.ticker + (type === "Buy" ? " bought " : " sold ") + "successfully"
      this.updatePortfolioStatus()
    }, (reason) => {
      // on dismiss
      this.alertMessage = ""
    });
  }

  openBuyModel() {
    this.openTransactionModel("Buy")
  }

  openSellModel() {
    this.openTransactionModel("Sell")
  }
}
