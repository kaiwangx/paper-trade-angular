import {Component, Input, OnInit} from '@angular/core';
import {CompanyData} from "../../../../interfaces/company-data";
import {CompanySocialSentimentsItem} from "../../../../interfaces/company-social-sentiments-item";

@Component({
  selector: 'app-search-result-tab-insights',
  templateUrl: './search-result-tab-insights.component.html',
  styleUrls: ['./search-result-tab-insights.component.css']
})
export class SearchResultTabInsightsComponent implements OnInit {
  _tickerData: CompanyData = {} as CompanyData
  socialSentiments = {
    reddit: {
      total: 0,
      positive: 0,
      negative: 0,
    },
    twitter: {
      total: 0,
      positive: 0,
      negative: 0,
    }
  }

  @Input() set tickerData(newTickerData: CompanyData) {
    this._tickerData = newTickerData
    this.updateSocialSentiments()
    // this.updateChartOptions()
  }
  constructor() {
  }

  ngOnInit(): void {
  }

  updateSocialSentiments() {
    this.resetSocialSentiments()
    const twitterSentiments: CompanySocialSentimentsItem[] = this._tickerData.companySocialSentiment.twitter
    for (let i = 0; i < twitterSentiments.length; i++) {
      this.socialSentiments.twitter.total += twitterSentiments[i].mention
      this.socialSentiments.twitter.positive += twitterSentiments[i].positiveMention
      this.socialSentiments.twitter.negative += twitterSentiments[i].negativeMention
    }

    const redditSentiments: CompanySocialSentimentsItem[] = this._tickerData.companySocialSentiment.reddit
    for (let i = 0; i < redditSentiments.length; i++) {
      this.socialSentiments.reddit.total += redditSentiments[i].mention
      this.socialSentiments.reddit.positive += redditSentiments[i].positiveMention
      this.socialSentiments.reddit.negative += redditSentiments[i].negativeMention
    }
  }

  resetSocialSentiments() {
    this.socialSentiments = {
      reddit: {
        total: 0,
        positive: 0,
        negative: 0,
      },
      twitter: {
        total: 0,
        positive: 0,
        negative: 0,
      }
    }
  }

}
