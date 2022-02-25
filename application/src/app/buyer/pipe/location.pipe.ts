import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'mapLocation'
})
export class LocationPipe implements PipeTransform {

  transform(value:boolean): string  {
    if(value){
      return "Show location";
    }else{
      return "Not available"
    }
  }

}
