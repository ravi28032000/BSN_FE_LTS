import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CommomDataService } from '../commom-data.service';
import { TransactionServiceService } from '../transaction-service.service';
import { HttpErrorResponse } from '@angular/common/http';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-pin-code-change',
  templateUrl: './pin-code-change.component.html',
  styleUrls: ['./pin-code-change.component.scss']
})
export class PinCodeChangeComponent implements OnInit {
  @Output() newItemEvent = new EventEmitter<string>();
  pinchangeform:any=FormGroup;
  enbacc:boolean=false;
  spinshow:boolean=false;
  constructor(private common:CommomDataService,private fb:FormBuilder,private service:TransactionServiceService,
    private spinner:NgxSpinnerService) { }

  ngOnInit(): void {
    this.pinchangeform=this.fb.group({
      "name":new FormControl("",[Validators.required]),
      "mobile":new FormControl("",[Validators.required,Validators.minLength(10),Validators.maxLength(15)]),
      "accoutnno":new FormControl("",[Validators.required]),
      "oldpassword":new FormControl("",[Validators.required]),
      "newpassword":new FormControl("",[Validators.required]),
      "confirmpassword":new FormControl("",[Validators.required])
    });
    let com_data:any=this.common.userData.value;
    this.pinchangeform.patchValue({
      "name":com_data.Name,
      "mobile":com_data.Mobile,
      "accoutnno":com_data.Acc_No
    });
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
      // this.newItemEvent.emit();
      this.common.ismenuenb.next(true);
    this.newItemEvent.emit();
    }, 5000);
  }
  submit(){
    
   
    
    if(this.pinchangeform.get('oldpassword').value==undefined || this.pinchangeform.get('oldpassword').value=="" || this.pinchangeform.get('oldpassword').value==null){
      this.common.openSnackBar("Please Enter Valid OldPassword","");
      return false;
    }
    if(this.pinchangeform.get('newpassword').value==undefined || this.pinchangeform.get('newpassword').value=="" || this.pinchangeform.get('newpassword').value==null){
      this.common.openSnackBar("Please Enter Valid OldPassword","");
      return false;
    }
    if(this.pinchangeform.get('confirmpassword').value==undefined || this.pinchangeform.get('confirmpassword').value=="" || this.pinchangeform.get('confirmpassword').value==null){
      this.common.openSnackBar("Please Enter Valid OldPassword","");
      return false;
    }
    if(this.pinchangeform.get('newpassword').value !=this.pinchangeform.get('confirmpassword').value){
      this.common.openSnackBar("Please Enter The New Password and Confirm Password","");
      return false;
    }
    let data:any={"oldpassword":this.pinchangeform.get('oldpassword').value,"newpassword":this.pinchangeform.get('newpassword').value,
    "confirmpassword":this.pinchangeform.get('newpassword').value
  };
  this.spinner.show();
  this.service.user_passwordchange(data).subscribe((result:any)=>{
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
    this.spinshow=false;
    this.spinner.hide();
    this.common.openSnackBar(error.message,"");
  });
    
  }
}
