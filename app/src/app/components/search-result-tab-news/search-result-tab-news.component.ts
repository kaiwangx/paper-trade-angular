import {Component, Input, OnInit} from '@angular/core';
import {CompanyData} from "../../interfaces/company-data";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {CompanyNewItem} from "../../interfaces/company-new-item";
import {
  SearchResultTabNewsModelComponent
} from "../search-result-tab-news-model/search-result-tab-news-model.component";


@Component({
  selector: 'app-search-result-tab-news',
  templateUrl: './search-result-tab-news.component.html',
  styleUrls: ['./search-result-tab-news.component.css']
})
export class SearchResultTabNewsComponent implements OnInit {

  @Input() tickerData!: CompanyData

  constructor(private modalService: NgbModal) { }

  ngOnInit(): void {
  }

  openNewsModel(companyNew: CompanyNewItem) {
    const modalRef = this.modalService.open(SearchResultTabNewsModelComponent);
    modalRef.componentInstance.companyNew = companyNew;
  }

}
