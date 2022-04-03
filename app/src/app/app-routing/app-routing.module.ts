import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SearchResultComponent } from "../components/search-result/search-result.component";
import { DummyComponent } from "../components/dummy/dummy.component";
import { SearchPageComponent } from "../components/search-page/search-page.component";
import { PortfolioPageComponent } from "../components/portfolio-page/portfolio-page.component";
import { WatchlistPageComponent } from "../components/watchlist-page/watchlist-page.component";

const routes: Routes = [
  { path: '', redirectTo: '/search/home', pathMatch: 'full' },
  { path: 'search', component: SearchPageComponent, children: [
      { path: 'home' , component: DummyComponent},
      { path: ':ticker', component: SearchResultComponent },
    ]},
  { path: 'watchlist', component: WatchlistPageComponent },
  { path: 'portfolio', component: PortfolioPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {}
