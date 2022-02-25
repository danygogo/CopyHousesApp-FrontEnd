import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'btnText'
})
export class BtnTextPipe implements PipeTransform {

  transform(value: boolean): string {
    if(value){
      return "Create an account"
    }
    else{
      return "I have an account"
    }
  }

}
