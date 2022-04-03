import {Component, Input, OnInit} from '@angular/core';
import {CompanyData} from "../../interfaces/company-data";

@Component({
  selector: 'app-search-result-tabs',
  templateUrl: './search-result-tabs.component.html',
  styleUrls: ['./search-result-tabs.component.css']
})
export class SearchResultTabsComponent implements OnInit {

  @Input() tickerData = {} as CompanyData

  constructor() { }

  ngOnInit(): void {
  }

}
