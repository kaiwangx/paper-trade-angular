import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { AutocompleteService } from "../services/autocomplete.service";

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent implements OnInit {

  tickerForm = this.fb.group({ticker: ['']})

  constructor(private fb: FormBuilder, private autocompleteService: AutocompleteService) { }

  ngOnInit(): void {
  }

  onSubmit() {
    console.log(this.tickerForm.controls['ticker'].value)
  }

  reset() {
    this.tickerForm.reset()
  }
}
