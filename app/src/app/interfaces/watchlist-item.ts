import {CompanyDescription} from "./company-description";
import {CompanyLastPrice} from "./company-last-price";

export interface WatchlistItem {
  companyDescription: CompanyDescription;
  companyLastPrice: CompanyLastPrice;
  displayColor: string;
}
