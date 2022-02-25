import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, Validators} from '@angular/forms';

import { VendorService } from '../../vendor.service';
import { userCreate } from '../../../Interfaces/userCreate';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  constructor(private fb: FormBuilder, 
    private vendorService: VendorService,
    private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }

  @Output() id = new EventEmitter<number>();


  myForm = this.fb.group({
    name: [, [Validators.required, Validators.maxLength(100)]],
    mail: [, [Validators.required, Validators.maxLength(80), Validators.pattern("[A-Za-z0-9._%-]+@[A-Za-z0-9._%-]+\\.[a-z]{2,3}")]],
    phone: [, [Validators.required, Validators.pattern("^[0-9]{4}-[0-9]{4}$")]],
    password: [,[Validators.required, Validators.minLength(6), Validators.maxLength(15)]]
  });

 


  loginUser(){
    if(this.myForm.valid){

      let userName: string = this.myForm.controls["name"].value
      let nameLong: number = userName.trim().length
      let userPassword: string = this.myForm.controls["password"].value
      let passwordLong: number = userPassword.trim().length

      if(nameLong == 0 || passwordLong == 0 ){
        this.showSnackBar("Password and name can't be only white spaces".toString())
        return
      }
      
     const user: userCreate = {
       name: userName,
       mail: this.myForm.controls["mail"].value,
       phone: this.myForm.controls["phone"].value,
       password: userPassword,
     }

     console.log(user)

     this.vendorService.CreateUser(user).subscribe(result => {
       console.log(result)
        if( typeof result == "number" ){
          this.setId(Number(result));
          
        }else{
          this.showSnackBar(result.toString())
        }
      })
    }
    else{
      return;
    }

  }

  setId(value: number) {
    this.id.emit(value);
  }


  showSnackBar(msg: string){
    this._snackBar.open(msg, "Ok",
    {
      duration: 4000
    });
  }
}
