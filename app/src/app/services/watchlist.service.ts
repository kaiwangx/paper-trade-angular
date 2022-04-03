import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WatchlistService {
  key: string = "watchlist"
  constructor() { }

  get(): string[] {
    let watchlist: string | null = localStorage.getItem(this.key)
    return watchlist === null ? [] : JSON.parse(watchlist)
  }

  add(ticker: string): void {
    let watchlist: string[] = this.get()
    watchlist.push(ticker)
    this.set(watchlist)
  }

  set(watchlist: string[]): void {
    localStorage.setItem(this.key, JSON.stringify(watchlist))
  }

  includes(ticker: string): boolean {
    return this.get().includes(ticker)
  }

  remove(ticker: string): void{
    let watchlist = this.get()
    watchlist = watchlist.filter(x => x !== ticker)
    this.set(watchlist)
  }
}
