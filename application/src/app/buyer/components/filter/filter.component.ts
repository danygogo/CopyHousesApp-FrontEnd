import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Output, EventEmitter } from '@angular/core';
import { Search } from 'src/app/Interfaces/search';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit {

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
  }

  @Output() mySearch = new EventEmitter<Search>();

  myForm = this.fb.group({
    city: [, Validators.required],
    price: [, Validators.min(1)]
  });

  SearchProperties() {
    let search: Search
    if(this.myForm.valid){
      search = {
        city: this.myForm.controls["city"].value,
        price: this.myForm.controls["price"]?.value || 0
      }
      this.mySearch.emit(search);
        
    }else{
      return
    }
  }

}//end of the class
