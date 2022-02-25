import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { House } from '../Interfaces/House';
import { userLogin } from '../Interfaces/userLogin';
import { dashboardList } from '../Interfaces/dashboadList';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class VendorService {

  baseURL: string = "https://apisellahouse.azurewebsites.net/api"
//https://localhost:7092/api
//https://apisellahouse.azurewebsites.net/api
  constructor(private http: HttpClient,
              private router: Router) { }

  latitude: number = 0;
  longitude: number = 0

  getHouses(): Observable<House[]>{
    const url: string = `${this.baseURL}/properties/showall`
    return this.http.get<House[]>(url)
  }

  getLatitude(){
    return this.latitude;
  }

  getLongitude(){
    return this.longitude;
  }

  postHouse(myHouse: House){
    const url: string = `${this.baseURL}/properties`
    return this.http.post(url, myHouse)
  }

  getCoords(latitude: number, longitude: number){
    this.latitude = latitude;
    this.longitude = longitude;
  }

  Login(usLogin : userLogin){
    const url: string = `${this.baseURL}/user/login`
    return this.http.post<number>(url, usLogin)
  }


  CreateUser(user : userLogin): Observable<number | string>{
    const url: string = `${this.baseURL}/user`
    return this.http.post<number | string>(url, user)
  }


  dashboardList():Observable<dashboardList[]>{
    let id: number = Number(sessionStorage.getItem("Id"))
    const url: string = `${this.baseURL}/properties/filterByOwner/${id}`
    return this.http.get<dashboardList[]>(url)
  }


  setAsSold(id: number):Observable<boolean>{
    const url: string = `${this.baseURL}/properties/sold`
    return this.http.put<boolean>(url, id);
  } 


  logout(){
    sessionStorage.clear();
    this.router.navigateByUrl("/")
  }

}
