import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

// Ng-bootstrap
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

// Angular Material
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatAutocompleteModule } from "@angular/material/autocomplete";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";

// Routing
import { AppRoutingModule } from './app-routing/app-routing.module';

// Reactive forms
import { ReactiveFormsModule } from "@angular/forms";

// HTTP service
import { HttpClientModule } from '@angular/common/http';

// Highcharts
import { HighchartsChartModule } from 'highcharts-angular';

// Components
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SearchPageComponent } from "./components/search/search-page.component";
import { WatchlistPageComponent } from './components/watchlist/watchlist-page.component';
import { PortfolioPageComponent } from './components/portfolio/portfolio-page.component';
import { SearchBarComponent } from './components/search/search-bar/search-bar.component';
import { SearchResultComponent } from './components/search/search-result/search-result.component';
import { DummyComponent } from './components/dummy/dummy.component';
import { MatTabsModule } from "@angular/material/tabs";
import { MatListModule } from "@angular/material/list";
import { SearchResultTabsComponent } from './components/search/search-result/search-result-tabs/search-result-tabs.component';
import { SearchResultTabSummaryComponent } from './components/search/search-result/search-result-tabs/search-result-tab-summary/search-result-tab-summary.component';
import { SearchResultTabNewsComponent } from './components/search/search-result/search-result-tabs/search-result-tab-news/search-result-tab-news.component';
import { SearchResultTabChartsComponent } from './components/search/search-result/search-result-tabs/search-result-tab-charts/search-result-tab-charts.component';
import { SearchResultTabInsightsComponent } from './components/search/search-result/search-result-tabs/search-result-tab-insights/search-result-tab-insights.component';
import { SearchResultTabInsightsRecommendationTrendsComponent } from './components/search/search-result/search-result-tabs/search-result-tab-insights-recommendation-trends/search-result-tab-insights-recommendation-trends.component';
import { SearchResultTabInsightsEarningsComponent } from './components/search/search-result/search-result-tabs/search-result-tab-insights-earnings/search-result-tab-insights-earnings.component';
import { TransactionModelComponent } from './components/transaction-model/transaction-model.component';
import { SearchResultTabNewsModelComponent } from './components/search/search-result/search-result-tabs/search-result-tab-news-model/search-result-tab-news-model.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    SearchBarComponent,
    SearchResultComponent,
    DummyComponent,
    SearchResultTabsComponent,
    SearchResultTabSummaryComponent,
    SearchResultTabNewsComponent,
    SearchResultTabChartsComponent,
    SearchResultTabInsightsComponent,
    SearchResultTabInsightsRecommendationTrendsComponent,
    SearchResultTabInsightsEarningsComponent,
    SearchPageComponent,
    WatchlistPageComponent,
    PortfolioPageComponent,
    TransactionModelComponent,
    SearchResultTabNewsModelComponent,
  ],
  imports: [
    BrowserModule,
    NgbModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    HttpClientModule,
    MatProgressSpinnerModule,
    MatTabsModule,
    MatListModule,
    HighchartsChartModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
