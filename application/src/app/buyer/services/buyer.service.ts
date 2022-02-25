import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FilteredHouses } from '../../Interfaces/FilteredHouses';
import { Observable } from 'rxjs';
import { HouseDetails } from 'src/app/Interfaces/HouseDetails';


@Injectable({
  providedIn: 'root'
})
export class BuyerService {

  constructor(private http: HttpClient) { }

  baseURL: string = "https://apisellahouse.azurewebsites.net/api"

  getHousesFiltered(city: string, price: number = 0):Observable<FilteredHouses[]>{
    const url: string = `${this.baseURL}/properties/filter/${city}/${price}`
    return this.http.get<FilteredHouses[]>(url)
  }



  getDetails(id : number): Observable<HouseDetails>{
    const url = `properties/details/${id}`
    return this.http.get<HouseDetails>(`${this.baseURL}/${url}`)
  }


}
