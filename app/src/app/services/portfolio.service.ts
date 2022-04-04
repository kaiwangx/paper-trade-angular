import { Injectable } from '@angular/core';
import {PortfolioItem} from "../interfaces/portfolio-item";

@Injectable({
  providedIn: 'root'
})
export class PortfolioService {
  key:string = "portfolio"
  constructor() { }

  get(): PortfolioItem[] {
    const portfolioArr: string | null = localStorage.getItem(this.key)
    return portfolioArr === null ? [] : JSON.parse(portfolioArr)
  }

  set(portfolioArr: PortfolioItem[]): void {
    localStorage.setItem(this.key, JSON.stringify(portfolioArr))
  }

  add(portfolioItem: PortfolioItem): void {
    let portfolioArr = this.get()
    portfolioArr.push(portfolioItem)
    this.set(portfolioArr)
  }

  remove(portfolioItem: PortfolioItem): void {
    this.set(this.get().filter(x => x !== portfolioItem))
  }

  removeByTicker(ticker: string): void {
    this.set(this.get().filter(x => x.companyDescription.ticker !== ticker))
  }

  includes(ticker: string): boolean {
    return this.get().some(x => x.companyDescription.ticker === ticker)
  }

  find(ticker: string): PortfolioItem | undefined {
    return this.get().find(x => x.companyDescription.ticker === ticker)
  }

  update(portfolioItem: PortfolioItem): void {
    this.removeByTicker(portfolioItem.companyDescription.ticker)
    if (portfolioItem.quantity > 0) {
      this.add(portfolioItem)
    }
  }

  reset(): void {
    localStorage.removeItem(this.key)
  }
}
