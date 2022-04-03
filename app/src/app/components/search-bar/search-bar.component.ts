import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { TickerAutoCompleteService } from "../../services/ticker-auto-complete.service";
import { AutocompleteOption} from "../../interfaces/autocomplete-option";
import { debounceTime } from "rxjs";
import { Router } from "@angular/router";

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent implements OnInit {

  tickerForm = this.fb.group({ticker: ['']})
  tickerAutocompleteOptions: AutocompleteOption[] = []
  isLoading: boolean = false

  constructor(private fb: FormBuilder,
              private tickerAutoCompleteService: TickerAutoCompleteService,
              private router: Router,
  ) {}

  ngOnInit(): void {
    this.tickerForm.controls["ticker"].valueChanges
      .pipe(debounceTime(500))
      .subscribe(value => this.getTickerAutocompleteOptions(value))
  }

  onSubmit() {
    console.log(this.tickerForm.controls['ticker'].value)
    this.router.navigate(["search", this.tickerForm.controls['ticker'].value])
  }

  reset() {
    this.tickerForm.controls['ticker'].reset('')
    this.router.navigate([''])
  }

  private getTickerAutocompleteOptions(value: string): void{
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
