import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {AutocompleteOption} from "../interfaces/autocomplete-option";
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TickerAutoCompleteService {
  serverURL = "https://paper-trade-nodejs.wl.r.appspot.com/"
  constructor(private http: HttpClient) { }

  getTickerAutocompleteList(ticker: string): Observable<AutocompleteOption[]>{
    return this.http.get<AutocompleteOption[]>(`${this.serverURL}/autocomplete/${ticker}`)
  }
}
