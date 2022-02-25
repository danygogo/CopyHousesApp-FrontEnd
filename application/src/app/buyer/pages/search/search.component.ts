import { Component, OnInit } from '@angular/core';
import { Search } from 'src/app/Interfaces/search';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  constructor() { }


  terms_Of_Search!: Search

  ngOnInit(): void {
    
  }


  termsOfSearch(termsOfSearch: Search){
    this.terms_Of_Search = termsOfSearch;
  }
}
