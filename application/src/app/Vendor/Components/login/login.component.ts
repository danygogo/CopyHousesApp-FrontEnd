import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, Validators} from '@angular/forms';
import { userLogin } from '../../../Interfaces/userLogin';
import { VendorService } from '../../vendor.service';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private fb: FormBuilder, 
              private vendorService: VendorService,
              private _snackBar: MatSnackBar) { }

  @Output() id = new EventEmitter<number>();

  ngOnInit(): void {
  }

  myForm = this.fb.group({
    mail: [, [Validators.required, Validators.maxLength(80), Validators.pattern("[A-Za-z0-9._%-]+@[A-Za-z0-9._%-]+\\.[a-z]{2,3}")]],
    password: [,[Validators.required, Validators.minLength(6), Validators.maxLength(15)]]
  });

 
  loginUser(){
    if(this.myForm.valid){
     const user: userLogin = {
       mail: this.myForm.controls["mail"].value,
       password: this.myForm.controls["password"].value,
     }

     this.vendorService.Login(user).subscribe(result => {
      if(result == -1){
        this._snackBar.open("Incorrect password or e-mail", "Ok",
        {
          duration: 4000
        });
      }else{
        this.setId(result);
      }
      })//end of subscribe
    }
    else{
      return;
    }

  }


  setId(value: number) {
    this.id.emit(value);
  }

}
