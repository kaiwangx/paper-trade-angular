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
  // activePage: string = "home"

  constructor(private tickerSearchService: TickerSearchService,
              private router: Router) { }

  ngOnInit(): void {}

  changeTogglerStatus(): void {
    this.togglerStatus = this.togglerStatus === "collapse" ? "" : "collapse"
  }

  getHomeLink(): string {
    let cache: CompanyData | null = this.tickerSearchService.get()
    return cache === null ? "/search/home" : `/search/${cache.companyDescription.ticker}`

  }
}
