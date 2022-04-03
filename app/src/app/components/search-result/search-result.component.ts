import { Component, OnInit } from '@angular/core';
import { ActivatedRoute} from '@angular/router';
import { TickerSearchService } from "../../services/ticker-search.service";
import { CompanyData } from "../../interfaces/company-data";
import { WatchlistService } from "../../services/watchlist.service";
import { SearchResultTabNewsModelComponent } from "../search-result-tab-news-model/search-result-tab-news-model.component";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {PortfolioService} from "../../services/portfolio.service";
import {TransactionModelComponent} from "../transaction-model/transaction-model.component";

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.css']
})
export class SearchResultComponent implements OnInit {

  isLoading!: boolean
  tickerData!: CompanyData
  inPortfolio!: boolean

  constructor(private route: ActivatedRoute,
              private tickerSearchService: TickerSearchService,
              private watchListService: WatchlistService,
              private modalService: NgbModal,
              private portfolioService: PortfolioService,
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.isLoading = true
      this.tickerSearchService
        .getTickerData(String(this.route.snapshot.paramMap.get('ticker')))
        .subscribe(tickerData => {
          this.tickerData = tickerData
          this.inPortfolio = this.portfolioService.includes(tickerData.companyDescription.ticker)
          this.isLoading = false
        })
    })
  }

  addTickerToWatchList(): void {
    this.tickerData.savedInWatchList = true
    this.watchListService.add(this.tickerData.companyDescription.ticker)
  }

  removeTickerFromWatchList(): void {
    this.tickerData.savedInWatchList = false
    this.watchListService.remove(this.tickerData.companyDescription.ticker)
  }

  openTransactionModel(type: string) {
    const modalRef = this.modalService.open(TransactionModelComponent);
    modalRef.componentInstance.currentPrice = this.tickerData.tickerLastPrice.c
    modalRef.componentInstance.ticker = this.tickerData.companyDescription.ticker
    modalRef.componentInstance.transactionType = type
  }

  openBuyModel() {
    this.openTransactionModel("Buy")
  }

  openSellModel() {
    this.openTransactionModel("Sell")
  }
}
