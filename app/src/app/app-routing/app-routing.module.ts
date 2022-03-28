import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from '../home/home.component'

const routes: Routes = [
  {path: '', redirectTo: '/search/home', pathMatch: 'full'},
  {path: 'search/home', component: HomeComponent},
  // {path: 'search/:ticker'},
  // {path: 'watchlist'},
  // {path: 'portfolio'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
