import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {TransactionService} from "../../services/transaction.service";
import {FormControl} from "@angular/forms";
import {PortfolioService} from "../../services/portfolio.service";
import {PortfolioItem} from "../../interfaces/portfolio-item";
import {TickerSearchService} from "../../services/ticker-search.service";
import {CompanyDescription} from "../../interfaces/company-description";

@Component({
  selector: 'app-transaction-model',
  templateUrl: './transaction-model.component.html',
  styleUrls: ['./transaction-model.component.css']
})

export class TransactionModelComponent implements OnInit {

  @Input() currentPrice!: number
  @Input() ticker !: string
  @Input() transactionType !: string
  @Input() companyDescription !: CompanyDescription
  balance!: number
  quantity = new FormControl(1);
  errorMessage =
    ["ok",
      "Please enter a valid quantity!",
      "Not enough money in wallet!",
      "You cannot sell the stocks that you don't"]


  constructor(public activeModal: NgbActiveModal,
              private transactionalService: TransactionService,
              private portfolioService: PortfolioService,
              private tickerSearchService: TickerSearchService) { }

  ngOnInit(): void {
    this.balance = this.transactionalService.getBalance()
  }

  submitTransaction(): void {
    // check if transaction is valid
    if (!this.checkIfQuantityIsValid()) {
      console.log("Invalid transaction")
    }
    // if (this.transactionType === "Buy") {
    //   let portfolioItem: PortfolioItem | undefined = this.portfolioService.find(this.ticker)
    //   if (portfolioItem == undefined) {
    //     portfolioItem = {
    //       companyDescription: this.companyDescription,
    //       quantity: this.quantity.value,
    //       change: 0,
    //       averageCostPerShare: this.currentPrice,
    //       currentPrice: this.currentPrice,
    //       totalCost: this.currentPrice * this.quantity.value,
    //       marketValue: this.currentPrice * this.quantity.value,
    //       displayColor: "black",
    //     }
    //     this.portfolioService.add(portfolioItem)
    //   } else {
    //
    //   }
    // }


    this.activeModal.dismiss('Transaction')
  }

  checkIfQuantityIsValid(): number {
    const quantity = this.quantity.value
    if (quantity < 1) {
      return 1
    } else if (this.transactionType === "Buy" && quantity * this.currentPrice > this.balance) {
      return 2
    } else if (this.transactionType === "Sell" && this.portfolioService.find(this.ticker)!.quantity < quantity) {
      return 3
    }
    return 0
  }
}
