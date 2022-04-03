import {CompanyDescription} from "./company-description";

export interface PortfolioItem {
  companyDescription: CompanyDescription;
  quantity: number;
  change: number;
  averageCostPerShare: number;
  currentPrice: number;
  totalCost: number;
  marketValue: number;
  displayColor: string;
}
