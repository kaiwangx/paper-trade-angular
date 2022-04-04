import { Component, OnInit } from '@angular/core';
import {TickerSearchService} from "../../services/ticker-search.service";
import {CompanyData} from "../../interfaces/company-data";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  togglerStatus: string = "collapse"
  activePage: string = "home"

  constructor(private tickerSearchService: TickerSearchService,
              private router: Router,
              private activeRoute: ActivatedRoute,) { }

  ngOnInit(): void {}

  changeTogglerStatus(): void {
    this.togglerStatus = this.togglerStatus === "collapse" ? "" : "collapse"
    console.log(this.togglerStatus)
  }

  getHomeRouterLink(): string {
    let cache: CompanyData | null = this.tickerSearchService.get()
    return cache === null ? "/search/home" : `/search/${cache.companyDescription.ticker}`
  }

  redirect(to: string) {
    this.activePage = to
    if (to == "home") {
      let cache: CompanyData | null = this.tickerSearchService.get()
      this.router.navigateByUrl(cache === null ? "/search/home" : `/search/${cache.companyDescription.ticker}`).then(r => console.log(r))
    } else if (to == "watchList") {
      this.router.navigateByUrl("/watchlist").then(result => {
        if (!result) {
          console.log(result)
        }
      })
    } else {
      this.router.navigateByUrl("/portfolio").then(result => {
        if (!result) {
          console.log(result)
        }
      })
    }
  }
}
