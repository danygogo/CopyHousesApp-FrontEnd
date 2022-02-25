import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, RouterStateSnapshot, UrlSegment, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2'

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanLoad{

  constructor(private router: Router) {
    
    
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if(sessionStorage.getItem("Id") != "-1" && sessionStorage.getItem("Id") != null){
      return true;
    }

    Swal.fire({
      icon: 'error',
      title: 'Access denied',
      text: 'You need to log in'
    })
    
    return false;
  }

  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean {
    if(sessionStorage.getItem("Id") != "-1" && sessionStorage.getItem("Id") != null ){
      return true;
    }

    Swal.fire({
      icon: 'error',
      title: 'Access denied',
      text: 'You need to log in'
    })
    this.router.navigateByUrl("/vendor");
    return false;
  }

  
}
