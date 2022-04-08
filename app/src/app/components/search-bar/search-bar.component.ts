import {Component, OnInit} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {TickerAutoCompleteService} from "../../services/ticker-auto-complete.service";
import {AutocompleteOption} from "../../interfaces/autocomplete-option";
import {debounceTime} from "rxjs";
import {Router} from "@angular/router";
import {TickerSearchService} from "../../services/ticker-search.service";

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent implements OnInit {

  tickerForm = this.fb.group({ticker: ['']})
  tickerAutocompleteOptions: AutocompleteOption[] = []
  isLoading: boolean = false
  emptyTickerSubmitted: boolean

  constructor(private fb: FormBuilder,
              private tickerAutoCompleteService: TickerAutoCompleteService,
              private router: Router,
              private tickerSearchService: TickerSearchService
  ) {
    this.emptyTickerSubmitted = false
  }

  ngOnInit(): void {
    this.tickerForm.controls["ticker"].valueChanges
      .pipe(debounceTime(500))
      .subscribe(value => this.getTickerAutocompleteOptions(value))
  }

  onSubmit() {
    const value = this.tickerForm.controls['ticker'].value
    if (value == "") {
      this.emptyTickerSubmitted = true
    } else {
      this.emptyTickerSubmitted = false
      this.router.navigate(["search", value])
    }
  }

  reset() {
    this.tickerForm.controls['ticker'].reset('')
    this.router.navigate([''])
    this.tickerSearchService.reset()
  }

  private getTickerAutocompleteOptions(value: string): void {
    if (value.replace(/\s+/g, '') === "") {
      this.tickerAutocompleteOptions = []
      return
    }

    this.isLoading = true
    this.tickerAutoCompleteService.getTickerAutocompleteList(value).subscribe(
      option => {
        this.tickerAutocompleteOptions = option
        this.isLoading = false
      }
    )
  }
}
