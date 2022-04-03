import { Component, OnInit } from '@angular/core';

import { PortfolioItem } from "../../interfaces/portfolio-item";
import { PortfolioService } from "../../services/portfolio.service";
import { map } from "rxjs";
import { TickerSearchService } from "../../services/ticker-search.service";
import { TransactionService } from "../../services/transaction.service";
import { Router } from "@angular/router";
import { Utils} from "../../../utils/utils";

@Component({
  selector: 'app-portfolio-page',
  templateUrl: './portfolio-page.component.html',
  styleUrls: ['./portfolio-page.component.css']
})
export class PortfolioPageComponent implements OnInit {

  portfolioList: PortfolioItem[] = []
  balance: number = 0
  displayColor: string = 'black'

  constructor(private portfolioService: PortfolioService,
              private tickerSearchService: TickerSearchService,
              private transactionService: TransactionService,
              private router: Router) {}

  ngOnInit(): void {
    let portfolioList: PortfolioItem[] = this.portfolioService.get()
    portfolioList.map(portfolioItem => {
      const ticker = portfolioItem.companyDescription.ticker
      return this.tickerSearchService.getTickerLastPrice(ticker).pipe(
        map(tickerLastPrice => {
          const _currentPrice = tickerLastPrice.c
          return {
            ...portfolioItem,
            currentPrice: _currentPrice,
            change: portfolioItem.averageCostPerShare - _currentPrice,
            marketValue: _currentPrice * portfolioItem.quantity,
            displayColor: Utils.getTickerColor(portfolioItem.averageCostPerShare - _currentPrice)
          }
        })
      )
    })
    this.balance = this.transactionService.getBalance()
  }

  redirect(ticker: string): void {
    this.router.navigate(["search", ticker])
  }
}
