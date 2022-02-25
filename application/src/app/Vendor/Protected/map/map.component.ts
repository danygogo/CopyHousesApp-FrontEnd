import { Component, OnInit,Output, EventEmitter, AfterViewInit } from '@angular/core';
import { Loader } from '@googlemaps/js-api-loader';
import { environment } from '../../../../environments/environment';
import Swal from 'sweetalert2'
import { VendorService } from '../../vendor.service';


@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit, AfterViewInit {
  
  constructor(private vendorService: VendorService) { }

  @Output() closeInstruction = new EventEmitter<boolean>();


  map!: any;
  center!: any;
  loader!: Loader;
  browserError: boolean = false;
  locationError: boolean = false;
  latitude!: number;
  longitude!: number;

 
  ngOnInit(): void {
    this.loader = new Loader({
      apiKey: environment.apiKey
    });
  }//end of ng on init



  ngAfterViewInit(): void {
    this.fillMap();
  }
 
  

  closeWindow(val: boolean){
    this.closeInstruction.emit(val);
  }

  cancel(){
    this.latitude = 0;
    this.longitude = 0; 
    this.closeWindow(false)
  }


  getLocation(){
    return new Promise((resolve) => {
      
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position: GeolocationPosition) => {
            this.latitude = position.coords.latitude;
            this.longitude = position.coords.longitude,
            this.vendorService.getCoords(this.latitude, this.longitude)
            resolve(this.longitude)
          },
          () => {
            this.locationError = true;
            Swal.fire({
              title: 'Location error',
              text: "Please check your GPS",
              icon: 'warning',
              showCancelButton: true,
              confirmButtonColor: '#3085d6',
              cancelButtonColor: '#d33',
              confirmButtonText: 'Try againg!'
            }).then((result) => {
              if (result.isConfirmed) {
                this.getLocation()
              }
              else{
                this.closeWindow(false)
              }
            })
          }
        );    
      } else {
        // Browser doesn't support Geolocation
        this.browserError = true;
        Swal.fire({
          title: 'Location error',
          text: "Your browser doesn't support Geolocation",
          icon: 'error',
          showCancelButton: false,
          confirmButtonColor: '#3085d6',
          confirmButtonText: 'Ok!'
        }).then((result) => {
          if (result.isConfirmed) {
            this.closeWindow(false)
          }
        })
      }

    })
  }



  addMarker(){
    return new Promise((resolve) => {
      this.loader.load().then(() => {
        const marker = new google.maps.Marker({
          position: { lat: this.latitude, lng: this.longitude },
          map: this.map
        });

      })
      resolve(true)
    })
  }


  addMap(){
    return new Promise((resolve) => {
      this.loader.load().then(() => {
        this.map = new google.maps.Map(document.getElementById("map")!,{
          center: { lat: this.latitude, lng: this.longitude },
          zoom: 15,
          styles: [
            {
              "featureType": "administrative",
              "elementType": "geometry",
              "stylers": [
                {
                  "visibility": "off"
                }
              ]
            },
            {
              "featureType": "poi",
              "stylers": [
                {
                  "visibility": "off"
                }
              ]
            },
            {
              "featureType": "road",
              "elementType": "labels.icon",
              "stylers": [
                {
                  "visibility": "off"
                }
              ]
            },
            {
              "featureType": "transit",
              "stylers": [
                {
                  "visibility": "off"
                }
              ]
            }
          ]
        });
      })
      resolve(true)
    })
  }//End of addMap

  async fillMap(){
    await this.getLocation();
    await this.addMap();
    await this.addMarker();
  }



}//End of the class



