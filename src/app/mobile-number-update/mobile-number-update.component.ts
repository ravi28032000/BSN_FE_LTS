import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CommomDataService } from '../commom-data.service';
import { TransactionServiceService } from '../transaction-service.service';
import { HttpErrorResponse } from '@angular/common/http';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-mobile-number-update',
  templateUrl: './mobile-number-update.component.html',
  styleUrls: ['./mobile-number-update.component.scss']
})
export class MobileNumberUpdateComponent implements OnInit {
  @Output() newItemEvent = new EventEmitter<string>();
  mobileform:any=FormGroup;
  constructor(private common:CommomDataService,private fb:FormBuilder,private service:TransactionServiceService,
    private spinner:NgxSpinnerService) { }
  spinshow:boolean=false;
  ngOnInit(): void {
    this.mobileform=this.fb.group({
      "oldnumber":new FormControl("",[Validators.required]),
      "newnumber":new FormControl("",[Validators.minLength(10),Validators.maxLength(15)])
    });
    let com_data:any=this.common.userData.value;
    console.log(com_data);
    this.mobileform.get('oldnumber').patchValue(com_data.Mobile);
  }
  alphaNumberOnly (e) {  // Accept only alpha numerics, not special characters 
    var regex = new RegExp("^[a-zA-Z0-9 ]+$");
    var str = String.fromCharCode(!e.charCode ? e.which : e.charCode);
    if (regex.test(str)) {
        return true;
    }

    e.preventDefault();
    return false;
  }
  alphaNumberOnlynumber (e) {  // Accept only alpha numerics, not special characters 
    var regex = new RegExp("^[0-9 ]+$");
    var str = String.fromCharCode(!e.charCode ? e.which : e.charCode);
    if (regex.test(str)) {
        return true;
    }

    e.preventDefault();
    return false;
  }

  onPaste(e) {
    e.preventDefault();
    return false;
  }
  cancel(){
    
   
    this.spinner.show();

    setTimeout(() => {
      /** spinner ends after 5 seconds */
      this.spinner.hide();
      this.common.ismenuenb.next(true);
      this.newItemEvent.emit();
    }, 5000);
  }
  submit(){
    
    if(this.mobileform.get("newnumber").value==undefined || this.mobileform.get("newnumber").value=="" || this.mobileform.get("newnumber").value==null){
      this.common.openSnackBar("Please Enter Valid New Mobile Number","");
      return false;
    }
    
    let data:any={"mobile":this.mobileform.get("newnumber").value};

    this.spinner.show();
    this.service.user_mobilenumberupdate(data).subscribe((result:any)=>{
      this.spinshow=false;
      if(result.error!=undefined && result.error!=""){
        this.spinner.hide();
        this.common.openSnackBar(result.error,"");
      }
      else{
        this.common.openSnackBar(result.data,"");
        setTimeout(() => {
          /** spinner ends after 5 seconds */
          this.spinner.hide();
          this.newItemEvent.emit();
        }, 5000);
      }

    },(error:HttpErrorResponse)=>{
      this.spinner.hide();
      this.common.openSnackBar(error.message,"");
    })
    
  }
}
