import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {AutocompleteOption} from "../interfaces/autocomplete-option";
import { HttpClient } from '@angular/common/http';
import {environment} from "../../environments/environment.prod";

@Injectable({
  providedIn: 'root'
})
export class TickerAutoCompleteService {
  serverURL = environment.serverURL
  constructor(private http: HttpClient) { }

  getTickerAutocompleteList(ticker: string): Observable<AutocompleteOption[]>{
    return this.http.get<AutocompleteOption[]>(`${this.serverURL}/autocomplete/${ticker}`)
  }
}
