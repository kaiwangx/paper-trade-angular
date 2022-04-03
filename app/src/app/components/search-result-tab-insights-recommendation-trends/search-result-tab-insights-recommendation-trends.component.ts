import {Component, Input, OnInit} from '@angular/core';
import {CompanyData} from "../../interfaces/company-data";
import * as Highcharts from 'highcharts'
import {CompanyRecommendationTrendsItem} from "../../interfaces/company-recommendation-trends-item";

@Component({
  selector: 'app-search-result-tab-insights-recommendation-trends',
  templateUrl: './search-result-tab-insights-recommendation-trends.component.html',
  styleUrls: ['./search-result-tab-insights-recommendation-trends.component.css']
})
export class SearchResultTabInsightsRecommendationTrendsComponent implements OnInit {
  _tickerData:CompanyData = {} as CompanyData
  chartOptions: Highcharts.Options = {};
  Highcharts: typeof Highcharts = Highcharts;
  constructor() { }

  ngOnInit(): void {
  }

  @Input() set tickerData(newTickerData: CompanyData) {
    this._tickerData = newTickerData
    this.updateChartOptions()
  }

  updateChartOptions() {
    let recommendationDates: string[] = []
    let strongBuy: number[] = []
    let buy: number[] = []
    let hold: number[] = []
    let sell: number[] = []
    let strongSell: number[] = []
    const data: CompanyRecommendationTrendsItem[] = this._tickerData.companyRecommendationTrend
    for (let i = 0; i < data.length; i++) {
      recommendationDates.push(data[i].period)
      strongBuy.push(data[i].strongBuy)
      buy.push(data[i].buy)
      hold.push(data[i].hold)
      sell.push(data[i].sell)
      strongSell.push(data[i].strongSell)
    }

    this.chartOptions = {
      chart: {
        type: 'column'
      },
      title: {
        text: 'Recommendation Trends'
      },
      xAxis: {
        categories: recommendationDates
      },
      yAxis: {
        min: 0,
        title: {
          text: '#Analysis'
        },
        stackLabels: {
          enabled: true,
          style: {
            fontWeight: 'bold',
            color: 'gray'
          }
        }
      },
      tooltip: {
        headerFormat: '<b>{point.x}</b><br/>',
        pointFormat: '{series.name}: {point.y}<br/>Total: {point.stackTotal}'
      },
      plotOptions: {
        column: {
          stacking: 'normal',
          dataLabels: {
            enabled: true
          }
        }
      },
      series: [{
        type: "column",
        name: 'Strong Buy',
        color: '#2dc937',
        data: strongBuy
      }, {
        type: "column",
        name: 'Buy',
        color: '#99c140',
        data: buy
      }, {
        type: "column",
        name: 'Hold',
        color: '#e7b416',
        data: hold
      }, {
        type: "column",
        name: 'Sell',
        color: '#db7b2b',
        data: sell
      }, {
        type: "column",
        name: 'Strong Sell',
        color: '#cc3232',
        data: strongSell
      }]
    }
  }
}
