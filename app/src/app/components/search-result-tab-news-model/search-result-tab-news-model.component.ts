import {Component, Input} from '@angular/core';
import {NgbActiveModal, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {CompanyNewItem} from "../../interfaces/company-new-item";
import * as dayjs from "dayjs";
@Component({
  selector: 'app-search-result-tab-news-model',
  templateUrl: './search-result-tab-news-model.component.html',
  styleUrls: ['./search-result-tab-news-model.component.css']
})
export class SearchResultTabNewsModelComponent{
  @Input() companyNew!: CompanyNewItem


  constructor(public activeModal: NgbActiveModal) { }

  getFormatDateFromUnix(unix: number) {
    return dayjs.unix(unix).format('MMMM DD, YYYY')
  }

}
