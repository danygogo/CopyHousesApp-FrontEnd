import { Component, OnInit, Input, ViewChild, OnChanges } from '@angular/core';
import { Search } from 'src/app/Interfaces/search';
import { BuyerService } from '../../services/buyer.service';
import { FilteredHouses } from '../../../Interfaces/FilteredHouses';
import { MatPaginator, PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit, OnChanges {

  constructor(private buyerService: BuyerService) { }

  @Input() termsOfSearch!: Search;
  filteredHouses: FilteredHouses[] = [];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  pageSlice: FilteredHouses[] = [];
  searching: boolean = true;


  ngOnInit(): void {
    
  }

  ngOnChanges(): void {
    this.buyerService.getHousesFiltered(this.termsOfSearch.city, this.termsOfSearch.price).subscribe(houses =>{
      this.filteredHouses = houses;
      this.pageSlice = this.filteredHouses.slice(0, 5);
      this.searching = false;
    })
  }



  onPageChange(event: PageEvent){
    const startIndex =  event.pageIndex * event.pageSize;
    let endIndex = startIndex +event.pageSize;
    if (endIndex > this.filteredHouses.length) {
      endIndex = this.filteredHouses.length
    }
    this.pageSlice = this.filteredHouses.slice(startIndex, endIndex)
  }





}
