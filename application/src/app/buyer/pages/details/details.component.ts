import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs';
import { BuyerService } from '../../services/buyer.service';
import { HouseDetails } from '../../../Interfaces/HouseDetails';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {

  constructor(private buyerService: BuyerService,
              private activatedRoute: ActivatedRoute
              ) { }

  house!: HouseDetails;
  loading: boolean = true;
  photoArray: any[] = [];
  location: boolean = false;
  showTheMap: boolean = false;



  ngOnInit(): void {
    this.activatedRoute.params.pipe(
      switchMap(({id}) => this.buyerService.getDetails(id))
    )
    .subscribe(h => {
      this.house = h;
      this.loading = false;

      if( this.house.lat!= 0 && this.house.lng != 0){
        this.location = true;
      }

      if(h.photo1!=null){this.photoArray.push(h.photo1)}
      if(h.photo2!=null){this.photoArray.push(h.photo2)}
      if(h.photo3!=null){this.photoArray.push(h.photo3)}
      if(h.photo4!=null){this.photoArray.push(h.photo4)}
      if(h.photo5!=null){this.photoArray.push(h.photo5)}
      if(h.photo6!=null){this.photoArray.push(h.photo6)}
      if(h.photo7!=null){this.photoArray.push(h.photo7)}
      if(h.photo8!=null){this.photoArray.push(h.photo8)}
    })//End of subscribe
  }//End of ngOnInit

  showMap(){
    this.showTheMap = true;

  }

  closeMap(){
    this.showTheMap = false;

  }
  
}


