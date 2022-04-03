import { Injectable } from '@angular/core';
import {forkJoin, Observable, map, of, tap, find, finalize, mergeMap} from "rxjs";
import { HttpClient } from '@angular/common/http';
import { environment } from "../../environments/environment";

// Interfaces
import { CompanyLastPrice } from "../interfaces/company-last-price";
import { CompanyDescription } from "../interfaces/company-description";
import { CompanyData } from "../interfaces/company-data";
import { CompanyHistoricalData } from "../interfaces/company-historical-data";
import { CompanyNewItem } from "../interfaces/company-new-item";

import * as dayjs from 'dayjs'
import {Dayjs} from "dayjs";
import {CompanySocialSentiment} from "../interfaces/company-social-sentiments";
import {CompanyRecommendationTrendsItem} from "../interfaces/company-recommendation-trends-item";
import {CompanyEarningsItem} from "../interfaces/company-earnings-item";
import {WatchlistService} from "./watchlist.service";

@Injectable({
  providedIn: 'root'
})
export class TickerSearchService {
  serverURL = environment.serverURL
  cache: boolean = false
  tickerData: CompanyData = {} as CompanyData
  constructor(private http: HttpClient,
              private watchListService: WatchlistService) { }

  getTickerData(ticker: string): Observable<CompanyData> {

    return this.getTickerLastPrice(ticker).pipe(
      mergeMap(tickerLastPrice => {
        return forkJoin([
          this.getCompanyDescription(ticker),
          of(tickerLastPrice),
          this.getCompanyPeers(ticker),
          this.getCompanyHourlyData(ticker, tickerLastPrice.t),
          this.getCompanyNews(ticker),
          this.getCompanyHistoricalDataLastTwoYear(ticker),
          this.getCompanySentiments(ticker),
          this.getCompanyRecommendationTrends(ticker),
          this.getCompanyEarnings(ticker),
        ])
      }),
      tap(res => {
        this.tickerData = new CompanyData(
          res[0], res[1], res[2],
          res[3], res[4], res[5],
          res[6], res[7], res[8],
          this.watchListService)
      }),
      map(() => {return this.tickerData})
    )
  }

  getCompanyDescription(ticker: string): Observable<CompanyDescription> {
    return this.http.get<CompanyDescription>(`${this.serverURL}/description/${ticker}`)
  }

  getTickerLastPrice(ticker: string): Observable<CompanyLastPrice> {
    return this.http.get<CompanyLastPrice>(`${this.serverURL}/latest_price/${ticker}`)
  }

  getCompanyPeers(ticker: string): Observable<string[]> {
    return this.http.get<string[]>(`${this.serverURL}/peers/${ticker}`)
  }

  getCompanyHourlyData(ticker: string, lastTimeframe: number): Observable<CompanyHistoricalData> {
    const stockLastTimeframe: Dayjs = dayjs.unix(lastTimeframe)
    const now: Dayjs = dayjs()
    const to: Dayjs = now.diff(lastTimeframe, 'minutes') < 5 ? now : stockLastTimeframe
    const from: Dayjs = to.subtract(6, 'hour')
    return this.getCompanyHistoricalData(ticker,'5', from.unix(), to.unix())
  }

  getCompanyHistoricalData(ticker: string, resolution: string, from: number, to: number): Observable<CompanyHistoricalData> {
    return this.http.get<CompanyHistoricalData>(`${this.serverURL}/historical_data/${ticker}/${resolution}/${from}/${to}`)
  }

  getCompanyNews(ticker: string): Observable<CompanyNewItem[]> {
    const now: Dayjs = dayjs()
    const to: string = now.format('YYYY-MM-DD')
    const from: string = now.subtract(7, 'days').format('YYYY-MM-DD')
    return this.http.get<CompanyNewItem[]>(`${this.serverURL}/news/${ticker}/${from}/${to}`)
  }

  getCompanyHistoricalDataLastTwoYear(ticker: string): Observable<CompanyHistoricalData> {
    const now: Dayjs = dayjs()
    const to: number = now.unix()
    const from: number = now.subtract(2, 'year').unix()
    return this.getCompanyHistoricalData(ticker, 'D', from, to)
  }

  getCompanySentiments(ticker: string): Observable<CompanySocialSentiment> {
    return this.http.get<CompanySocialSentiment>(`${this.serverURL}/social_sentiment/${ticker}`)
  }

  getCompanyRecommendationTrends(ticker: string): Observable<CompanyRecommendationTrendsItem[]> {
    return this.http.get<CompanyRecommendationTrendsItem[]>(`${this.serverURL}/recommendation/${ticker}`)
  }

  getCompanyEarnings(ticker: string): Observable<CompanyEarningsItem[]> {
    return this.http.get<CompanyEarningsItem[]>(`${this.serverURL}/earnings/${ticker}`)
  }
}
