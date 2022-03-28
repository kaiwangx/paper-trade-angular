import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AutocompleteService {

  constructor() { }

  getTickerAutocompleteList(): string[] {
    return ['APPL', 'TSLA', 'AAA']
  }
}
