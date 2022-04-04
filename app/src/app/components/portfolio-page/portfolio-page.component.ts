import {Component, OnInit, ViewChild} from '@angular/core';

import {PortfolioItem} from "../../interfaces/portfolio-item";
import {PortfolioService} from "../../services/portfolio.service";
import {debounceTime, forkJoin, map, Observable, Subject} from "rxjs";
import {TickerSearchService} from "../../services/ticker-search.service";
import {BalanceService} from "../../services/balance.service";
import {Router} from "@angular/router";
import {Utils} from "../../../utils/utils";
import {TransactionModelComponent} from "../transaction-model/transaction-model.component";
import {NgbAlert, NgbModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-portfolio-page',
  templateUrl: './portfolio-page.component.html',
  styleUrls: ['./portfolio-page.component.css']
})
export class PortfolioPageComponent implements OnInit {

  @ViewChild('alert', {static: false}) alert!: NgbAlert;

  portfolioList: PortfolioItem[] = []
  balance: number = 0
  displayColor: string = 'black'
  isLoading: boolean = true
  alertMessage: string = ""
  alertType: string = 'success'
  private alertEvent: Subject<string> = new Subject<string>();


  constructor(private portfolioService: PortfolioService,
              private tickerSearchService: TickerSearchService,
              private balanceService: BalanceService,
              private router: Router,
              private modalService: NgbModal) {
  }

  ngOnInit(): void {
    this.refreshPortfolio()
    this.alertEvent.pipe(debounceTime(3000)).subscribe(() => {
      if (this.alert) {
        this.alert.close();
      }
    })
  }

  refreshPortfolio(): void {
    this.isLoading = true
    this.portfolioList = []
    let portfolioList: Observable<PortfolioItem>[] = this.portfolioService.get().map(
      portfolioItem =>
        this.tickerSearchService.getTickerLastPrice(portfolioItem.companyDescription.ticker).pipe(
          map(tickerLastPrice => {
            const _currentPrice = tickerLastPrice.c
            return {
              ...portfolioItem,
              currentPrice: _currentPrice,
              change: _currentPrice - portfolioItem.averageCostPerShare,
              marketValue: _currentPrice * portfolioItem.quantity,
              displayColor: Utils.getTickerColor(portfolioItem.averageCostPerShare - _currentPrice)
            }
          })
        )
    )
    forkJoin(portfolioList).subscribe(res => {
      for (let i = 0; i < res.length; i++) {
        this.portfolioList.push(res[i])
      }
      this.isLoading = false
      // this.alertEvent.next(this.alertMessage)
    })
    if (portfolioList.length == 0) {
      this.isLoading = false
    }
    this.balance = this.balanceService.getBalance()
  }

  redirect(ticker: string): void {
    this.router.navigate(["search", ticker])
  }

  openTransactionModel(type: string, portfolioItem: PortfolioItem) {
    const modalRef = this.modalService.open(TransactionModelComponent);
    modalRef.componentInstance.currentPrice = portfolioItem.currentPrice
    modalRef.componentInstance.ticker = portfolioItem.companyDescription.ticker
    modalRef.componentInstance.transactionType = type
    modalRef.componentInstance.companyDescription = portfolioItem.companyDescription
    modalRef.componentInstance.currentQuantity = portfolioItem.quantity
    modalRef.result.then(() => {
      this.alertType = (type === "Buy") ? "success" : "danger"
      this.alertMessage = portfolioItem.companyDescription.ticker + (type === "Buy" ? " bought " : " sold ") + "successfully"
      this.refreshPortfolio()
      this.alertEvent.next(this.alertMessage)
    }, (reason) => {
      // on dismiss
      this.alertMessage = ""
    });
  }

  openBuyModel(portfolioItem: PortfolioItem) {
    this.openTransactionModel("Buy", portfolioItem)
  }

  openSellModel(portfolioItem: PortfolioItem) {
    this.openTransactionModel("Sell", portfolioItem)
  }

  reset() {
    this.portfolioService.reset()
    this.balanceService.resetBalance()
  }
}
