import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {BalanceService} from "../../services/balance.service";
import {FormControl} from "@angular/forms";
import {PortfolioService} from "../../services/portfolio.service";
import {PortfolioItem} from "../../interfaces/portfolio-item";
import {CompanyDescription} from "../../interfaces/company-description";
import {Utils} from "../../../utils/utils";

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
  @Input() currentQuantity!: number
  balance!: number
  quantity = new FormControl(1);
  errorMessage =
    ["ok",
      "Please enter a valid quantity!",
      "Not enough money in wallet!",
      "You cannot sell the stocks that you don't"]


  constructor(public activeModal: NgbActiveModal,
              private balanceService: BalanceService,
              private portfolioService: PortfolioService) {
  }

  ngOnInit(): void {
    this.balance = this.balanceService.getBalance()
  }

  submitTransaction(): void {
    // check if transaction is valid
    if (this.checkIfQuantityIsValid() > 0) {
      console.log("Invalid transaction")
    }
    const _quantity = this.quantity.value
    let portfolioItem: PortfolioItem | undefined = this.portfolioService.find(this.ticker)
    if (this.transactionType === "Buy" && portfolioItem === undefined) {
      portfolioItem = {
        companyDescription: this.companyDescription,
        quantity: _quantity,
        change: 0,
        averageCostPerShare: this.currentPrice,
        currentPrice: this.currentPrice,
        totalCost: this.currentPrice * _quantity,
        marketValue: this.currentPrice * _quantity,
        displayColor: "black",
      }
      this.portfolioService.add(portfolioItem)
      this.balanceService.buy(this.currentPrice * _quantity)
    }
    else if(this.transactionType === "Buy" && portfolioItem !== undefined) {
      let newQuantity = portfolioItem.quantity + _quantity
      let newAvgCostPerShare = (portfolioItem.totalCost + this.currentPrice * _quantity) / newQuantity
      let newTotalCost = portfolioItem.totalCost + _quantity * this.currentPrice
      this.portfolioService.update({
        ...portfolioItem,
        quantity: newQuantity,
        averageCostPerShare: Utils.toTwoDecimal(newAvgCostPerShare),
        totalCost: Utils.toTwoDecimal(newTotalCost)
      })
      this.balanceService.buy(this.currentPrice * _quantity)
    } else if (this.transactionType === "Sell" && portfolioItem !== undefined) {
      let newQuantity = portfolioItem.quantity - _quantity
      let newAvgCostPerShare = (portfolioItem.totalCost - this.currentPrice * _quantity) / newQuantity
      let newTotalCost = portfolioItem.totalCost - _quantity * this.currentPrice
      this.portfolioService.update({
        ...portfolioItem,
        quantity: newQuantity,
        averageCostPerShare: Utils.toTwoDecimal(newAvgCostPerShare),
        totalCost: Utils.toTwoDecimal(newTotalCost)
      })
      this.balanceService.sell(this.currentPrice * _quantity)
    }
    this.activeModal.close('Transaction')
  }

  checkIfQuantityIsValid(): number {
    const quantity = this.quantity.value

    if (quantity < 1) {
      return 1
    } else if (this.transactionType === "Buy" && quantity * this.currentPrice > this.balance) {
      return 2
    } else if (this.transactionType === "Sell" && this.quantity < quantity) {
      return 3
    }
    return 0
  }

  calculateTotal(): number {
    return this.quantity.value * this.currentPrice
  }
}
