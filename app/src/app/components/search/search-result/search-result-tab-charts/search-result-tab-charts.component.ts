import {Component, Input, OnInit} from '@angular/core';
import {CompanyData} from "../../../../interfaces/company-data";
import * as dayjs from "dayjs";
import * as Highcharts from 'highcharts/highstock';
import IndicatorsCore from "highcharts/indicators/indicators";
import vbp from 'highcharts/indicators/volume-by-price';
IndicatorsCore(Highcharts);
vbp(Highcharts);

@Component({
  selector: 'app-search-result-tab-charts',
  templateUrl: './search-result-tab-charts.component.html',
  styleUrls: ['./search-result-tab-charts.component.css']
})
export class SearchResultTabChartsComponent implements OnInit {

  _tickerData:CompanyData = {} as CompanyData
  Highcharts: typeof Highcharts = Highcharts;
  chartOptions: Highcharts.Options = {};

  @Input() set tickerData(newTickerData: CompanyData) {
    this._tickerData = newTickerData
    this.updateChartOptions()
  }
  constructor() { }

  updateChartOptions(): void {
    const dates = this._tickerData.companyHistoricalDataLastTwoYear.t
    const open = this._tickerData.companyHistoricalDataLastTwoYear.o
    const high = this._tickerData.companyHistoricalDataLastTwoYear.h
    const low = this._tickerData.companyHistoricalDataLastTwoYear.l
    const close = this._tickerData.companyHistoricalDataLastTwoYear.c
    const vol = this._tickerData.companyHistoricalDataLastTwoYear.v
    // ohlc: [timestamp (13 digits), open, high, low, close]
    let ohlc: number[][] = []
    let volume: number[][] = []
    const dataLength: number = dates.length
      // set the allowed units for data grouping
    // const groupingUnits:[string,number[]][] = [
    //   [
    //     'week', // unit name
    //     [1] // allowed multiples
    //   ],
    //   [
    //     'month',
    //     [1, 2, 3, 4, 6]
    //   ]
    // ]
    for (let i = 0; i < dataLength; i += 1) {
      const date = dayjs.unix(dates[i]).valueOf()
      ohlc.push([
        date, // the date
        open[i], // open
        high[i], // high
        low[i], // low
        close[i] // close
      ]);

      volume.push([
        date, // the date
        vol[i] // the volume
      ]);
    }

    this.chartOptions = {
      rangeSelector: {
        selected: 2
      },

      title: {
        text: `${this._tickerData.companyDescription.ticker} Historical`
      },

      subtitle: {
        text: 'With SMA and Volume by Price technical indicators',
        style: {color:'gray'},
      },

      yAxis: [{
        startOnTick: false,
        endOnTick: false,
        labels: {
          align: 'right',
          x: -3
        },
        title: {
          text: 'OHLC'
        },
        height: '60%',
        lineWidth: 2,
        resize: {
          enabled: true
        }
      }, {
        labels: {
          align: 'right',
          x: -3
        },
        title: {
          text: 'Volume'
        },
        top: '65%',
        height: '35%',
        offset: 0,
        lineWidth: 2
      }],

      tooltip: {
        split: true
      },

      // plotOptions: {
      //   series: {
      //     dataGrouping: {
      //       units: groupingUnits
      //     }
      //   }
      // },

      series: [{
        type: 'candlestick',
        name: this._tickerData.companyDescription.ticker,
        id: 'ticker',
        zIndex: 2,
        data: ohlc
      }, {
        type: 'column',
        name: 'Volume',
        id: 'volume',
        data: volume,
        yAxis: 1
      }, {
        type: 'vbp',
        linkedTo: 'ticker',
        params: {
          volumeSeriesID: 'volume'
        },
        dataLabels: {
          enabled: false
        },
        zoneLines: {
          enabled: false
        }
      }, {
        type: 'sma',
        linkedTo: 'ticker',
        zIndex: 1,
        marker: {
          enabled: false
        }
      }]
    }
  }

  ngOnInit(): void {
  }

}
