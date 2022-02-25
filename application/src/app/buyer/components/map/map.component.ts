import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { Loader } from '@googlemaps/js-api-loader';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit, OnChanges {

  constructor() { }

  @Output() closeInstruction = new EventEmitter<boolean>();
  @Input() latitude!: number
  @Input() longitude!: number


  map!: any;
  center!: any;
  loader!: Loader;

  ngOnInit(): void {
    console.log("OnInit")
    this.loader = new Loader({
      apiKey: environment.apiKey
    });

    this.fillMap()

  }

  ngOnChanges(): void {
      console.log("onChanges")
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
        console.log("Map",this.map)
      })
      resolve(true)
    })
  }//End of addMap


  addMarker(){
    return new Promise((resolve) => {
      this.loader.load().then(() => {
        const marker = new google.maps.Marker({
          position: { lat: this.latitude, lng: this.longitude },
          map: this.map
        });
        console.log("Marker",marker)

      })
      resolve(true)
    })
  }

  async fillMap(){
    await this.addMap();
    await this.addMarker();

  }


  closeWindow(val: boolean){
    this.closeInstruction.emit(val);
  }
}
