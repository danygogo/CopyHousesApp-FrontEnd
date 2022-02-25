import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { House } from 'src/app/Interfaces/House';
import { VendorService } from '../../vendor.service';
import { DomSanitizer } from '@angular/platform-browser';
import Swal from 'sweetalert2'
import { Location } from '@angular/common';
import { Router } from '@angular/router';


@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

 
  myHouse!        : House;
  uploadedImage!  : any; 
  pictureArray: string[] =[]
  uploadedImages: any[] =[];
  showMap: boolean = false;
  

  constructor(private vendorService: VendorService,
              private fb: FormBuilder,
              private _sanitizer: DomSanitizer,
              private location: Location,
              private router: Router) { }

  

  ngOnInit(): void {
    
  }

  myForm: FormGroup = this.fb.group({
    title:            [, Validators.required],
    landSize:         [, [Validators.min(0), Validators.required]],
    constructionSize: [, [Validators.min(0), Validators.required]], 
    kitchenAndLiving: [false],
    price:            [, [Validators.min(0), Validators.required]],
    bedrooms:         [,[Validators.required, Validators.min(0)]],
    hasPool:          [false],
    details:          [,Validators.maxLength(400)],
    city:             ["San José", Validators.required],
    parkings:         [, [Validators.required, Validators.min(0)]],
    bathrooms:        [, [Validators.required, Validators.min(0)]],
  })

  getHouses(){
    this.vendorService.getHouses().subscribe(h => {
      console.log(h)
    })
  }


  
  async onFileChanged(event: any, index: number) {
    return new Promise((resolve) =>{
      const file = event.target.files[index]
      var reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () =>{
        resolve(reader.result)
      }
    })
  }




  sendFile(event: any){
    
    let photosReceived = event.target.files.length;
    let photosAlreadyHave = this.pictureArray.length;
    console.log("photosAlreadyHave ", +photosAlreadyHave)


    if(photosReceived + photosAlreadyHave >8){
      Swal.fire({
        text: 'the maximum number of photos allowed is 8 ',
        icon: 'warning',
        confirmButtonText: 'Ok'
      })

      event.target.value = ""
    }else
    {

      for(let i = 0; i < photosReceived; i++){
        //to get the base 64
        this.onFileChanged(event, i).then((c: any)=>{

          //to show to the user the img selected
          this.uploadedImages.push(this._sanitizer.bypassSecurityTrustResourceUrl(c)) ;

          //To manipulate the base64
          let stringBase64: string = c.toString()
          let arrayString = stringBase64.split("base64,")
          this.pictureArray.push(arrayString[1])
          
        })//end of promise

      }

    

    }
  }//end of sendFile()



  save(){

    if(this.myForm.valid){
      this.myHouse = {
        title:            this.myForm.controls["title"].value,
        landSize:         this.myForm.controls["landSize"].value,
        constructionSize: this.myForm.controls["constructionSize"].value,
        lat:              this.vendorService.getLatitude(),
        lng:              this.vendorService.getLongitude(),
        kitchenAndLiving: this.myForm.controls["kitchenAndLiving"].value,
        price:            this.myForm.controls["price"].value,
        bedrooms:         this.myForm.controls["bedrooms"].value,
        hasPool:          this.myForm.controls["hasPool"].value,
        details:          this.myForm.controls["details"].value,
        photo1:           this.pictureArray[0] || null,
        photo2:           this.pictureArray[1] || null,
        photo3:           this.pictureArray[2] || null,
        photo4:           this.pictureArray[3] || null,
        photo5:           this.pictureArray[4] || null,
        photo6:           this.pictureArray[5] || null,
        photo7:           this.pictureArray[6] || null,
        photo8:           this.pictureArray[7] || null,
        city:             this.myForm.controls["city"].value,
        parkings:         this.myForm.controls["parkings"].value,
        sold:             false,
        userId:           Number(sessionStorage.getItem("Id")), 
        bathrooms:        this.myForm.controls["bathrooms"].value,
    }
    

    this.vendorService.postHouse(this.myHouse).subscribe(h => {
      if(h == true){
        Swal.fire({
          text: 'Your house was successfully saved',
          confirmButtonText: 'Ok'
        })

        this.router.navigateByUrl("/vendor/options/dashboard")
      }
      else{
        Swal.fire({
          text: 'Something gone wrong, please check your information',
          confirmButtonText: 'Ok'
        })
      }
    })

    }
  }

  displayMap(){
    this.showMap = true;
  }

  closeWindow(newValue: boolean){
    this.showMap = newValue;
  }


  logout(){
    this.vendorService.logout()
  }

  goBack(){
      this.location.back();
  }

}//end of the class

