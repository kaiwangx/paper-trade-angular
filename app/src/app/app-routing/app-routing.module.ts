import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SearchHomeComponent } from '../search-home/search-home.component'
import { WatchlistComponent} from "../watchlist/watchlist.component";
import { PortfolioComponent } from "../portfolio/portfolio.component";
import { SearchResultComponent } from "../search-result/search-result.component";

const routes: Routes = [
  { path: '', redirectTo: '/search/home', pathMatch: 'full' },
  { path: 'search/home', component: SearchHomeComponent },
  { path: 'search/:ticker', component:SearchResultComponent },
  { path: 'watchlist', component: WatchlistComponent },
  { path: 'portfolio', component: PortfolioComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {}
