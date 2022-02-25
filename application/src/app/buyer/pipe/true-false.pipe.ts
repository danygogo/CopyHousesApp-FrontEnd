import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'trueFalse'
})
export class TrueFalsePipe implements PipeTransform {

  transform(value:boolean): string {

    if(value){
      return "Yes";
    }else{
      return "No"
    }
  }

}
