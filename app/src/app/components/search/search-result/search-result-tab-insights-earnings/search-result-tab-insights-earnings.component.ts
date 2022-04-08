import {Component, Input, OnInit} from '@angular/core';
import {CompanyData} from "../../../../interfaces/company-data";
import * as Highcharts from 'highcharts'
import {CompanyEarningsItem} from "../../../../interfaces/company-earnings-item";

@Component({
  selector: 'app-search-result-tab-insights-earnings',
  templateUrl: './search-result-tab-insights-earnings.component.html',
  styleUrls: ['./search-result-tab-insights-earnings.component.css']
})
export class SearchResultTabInsightsEarningsComponent implements OnInit {
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
    const data: CompanyEarningsItem[] = this._tickerData.companyEarnings
    let dates: string[] = []
    let actualEarnings: number[] = []
    let estimatedEarnings: number[] = []

    for (let i = 0; i < data.length; i++) {
      dates.push(`${data[i].period} <br>Surprise: ${data[i].surprise}`)
      actualEarnings.push(data[i].actual || 0)
      estimatedEarnings.push(data[i].estimate || 0)
    }

    this.chartOptions = {
      chart: {
        type: 'spline'
      },
      title: {
        text: 'Historical EPS Surprises'
      },
      xAxis: {
        categories: dates
      },
      yAxis: {
        title: {
          text: 'Quarterly EPS'
        }
      },
      tooltip: {
        shared: true
      },
      plotOptions: {
        spline: {
          marker: {
            radius: 4,
            lineColor: '#666666',
            lineWidth: 1
          }
        }
      },
      series: [{
        type: 'spline',
        name: 'Estimate',
        data: estimatedEarnings
      }, {
        type: 'spline',
        name: 'Actual',
        data: actualEarnings,
      }]
    }
  }
}
