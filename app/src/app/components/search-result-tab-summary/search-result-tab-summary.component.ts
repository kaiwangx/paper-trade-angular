import {Component, Input, OnInit} from '@angular/core';
import {CompanyData} from "../../interfaces/company-data";
import * as Highcharts from 'highcharts/highstock';
import * as dayjs from "dayjs";

@Component({
  selector: 'app-search-result-tab-summary',
  templateUrl: './search-result-tab-summary.component.html',
  styleUrls: ['./search-result-tab-summary.component.css']
})
export class SearchResultTabSummaryComponent implements OnInit {

 _tickerData = {} as CompanyData
  Highcharts: typeof Highcharts = Highcharts;
  chartOptions: Highcharts.Options = {};

  @Input() set tickerData(newTickerData: CompanyData) {
    this._tickerData = newTickerData
    this.updateChartOptions()
  }

  constructor() { }

  updateChartOptions(): void {
    const dates = this._tickerData.companyHourlyData.t
    const prices = this._tickerData.companyHourlyData.c
    let hourlyData: number[][] = []
    const dataLength: number = dates.length
    for (let i = 0; i < dataLength; i++) {
      hourlyData.push([(dayjs.unix(dates[i]).subtract(7, 'hours')).valueOf(), prices[i]])
    }

    this.chartOptions = {
      title: {
        text: `${this._tickerData.companyDescription.ticker} Hourly Price Variation`,
        style: {color:'gray'},
      },

      navigator: {
        enabled: false,
      },

      rangeSelector: {
        enabled: false,
      },

      series: [{
        name: this._tickerData.companyDescription.ticker,
        data: hourlyData,
        type: 'line',
        color: this._tickerData.tickerColor,
        tooltip: {
          valueDecimals: 2
        }
      }]
    }
  }

  ngOnInit(): void {

  }

}
