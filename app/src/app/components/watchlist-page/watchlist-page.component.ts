import { Component, OnInit } from '@angular/core';
import {WatchlistService} from "../../services/watchlist.service";
import {TickerSearchService} from "../../services/ticker-search.service";
import {forkJoin, of, map, Observable} from "rxjs";
import {WatchlistItem} from "../../interfaces/watchlist-item";
import {getTickerDisplayColor} from "../../../utils/get-ticker-display-color";
import {Router} from "@angular/router";

@Component({
  selector: 'app-watchlist-page',
  templateUrl: './watchlist-page.component.html',
  styleUrls: ['./watchlist-page.component.css'],
})
export class WatchlistPageComponent implements OnInit {
  watchlist: WatchlistItem[] = []
  isLoading: boolean = true

  constructor(private watchlistService: WatchlistService,
              private tickerSearchService: TickerSearchService,
              private router: Router) {}

  ngOnInit(): void {
    // const watchlist: string[] = this.watchlistService.get()

    let watchlist: Observable<WatchlistItem>[] = this.watchlistService.get().map(ticker =>
      forkJoin([
        this.tickerSearchService.getCompanyDescription(ticker),
        this.tickerSearchService.getTickerLastPrice(ticker),
      ]).pipe(
        map(res => {
          return {
            companyDescription: res[0],
            companyLastPrice: res[1],
            displayColor: getTickerDisplayColor(res[1].dp)}
        })
      )
    )
    forkJoin(watchlist).subscribe(res => {
      for (let i = 0; i < res.length; i++) {
        this.watchlist.push(res[i])
      }
      this.isLoading = false
    })
    if (watchlist.length == 0) {
      this.isLoading = false
    }
  }

  removeWatchList(ticker: string): void {
    this.watchlistService.remove(ticker)
    this.watchlist = this.watchlist.filter(x => x.companyDescription.ticker !== ticker)
  }

  redirect(ticker: string): void {
    this.router.navigate(["search", ticker])
  }
}
