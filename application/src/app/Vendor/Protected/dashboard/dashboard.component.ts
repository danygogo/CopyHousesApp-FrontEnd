import { Component, OnInit } from '@angular/core';
import { VendorService } from '../../vendor.service';
import { dashboardList } from '../../../Interfaces/dashboadList';
import { Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private vs: VendorService,
              private fb: FormBuilder) { }

  noData: boolean = true;

  properties!: dashboardList[]

  ngOnInit(): void {
    this.vs.dashboardList().subscribe((list) => {
      this.noData = false;
      this.properties = list
    })
  }



  myForm = this.fb.group({
    soldHouses: this.fb.array([
      this.fb.control(false)
    ])
  });



  
  logout(){
    this.vs.logout()
  }




  changeToSold(e: any, val: number){
    Swal.fire({
      title: 'Do you want to mark your house as sold?',
      text: "This action can't be reverted and your house will not appear in the ads",
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes'
    }).then((result) => {
      if (result.isConfirmed) {
        this.properties[val].sold = true
        let id = this.properties[val].id
        this.vs.setAsSold(id).subscribe()
      }
      else{
        e.source.checked = false;
      }
    }) 
  }

}//End of the class
