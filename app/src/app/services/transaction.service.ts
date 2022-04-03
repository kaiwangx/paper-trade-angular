import {Injectable} from '@angular/core';
import {TickerSearchService} from "./ticker-search.service";
import {map} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  key: string = "money"
  initialBalance: number = 25000

  constructor(private tickerSearchService: TickerSearchService) {
  }

  buy(amount: number): void{
    this.setBalance(this.getBalance() - amount)
  }


  sell(amount: number): void {
    this.setBalance(this.getBalance() + amount)
  }

  getBalance(): number {
    return +(localStorage.getItem(this.key) || this.initialBalance)
  }

  setBalance(balance: number): void {
    localStorage.setItem(this.key, balance.toString())
  }

  resetBalance(): void {
    this.setBalance(this.initialBalance)
  }



}
