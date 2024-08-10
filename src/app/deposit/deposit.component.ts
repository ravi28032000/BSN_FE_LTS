import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CommomDataService } from '../commom-data.service';
import { TransactionServiceService } from '../transaction-service.service';
import { HttpErrorResponse } from '@angular/common/http';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-deposit',
  templateUrl: './deposit.component.html',
  styleUrls: ['./deposit.component.scss']
})
export class DepositComponent implements OnInit {
  @Output() newItemEvent = new EventEmitter<string>();
  depositform:any=FormGroup;
  enbacc:boolean=false;
  spinshow:boolean=false;
  constructor(private common:CommomDataService,private fb:FormBuilder,private service:TransactionServiceService,private spinner:NgxSpinnerService) { }

  ngOnInit(): void {
    this.depositform=this.fb.group({
      "accountno":new FormControl("",[Validators.required]),
      "mobile":new FormControl("",[Validators.required]),
      "amount":new FormControl("",[Validators.required])
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
      this.newItemEvent.emit();
    }, 5000);
    // this.common.ismenuenb.next(true);
    // this.newItemEvent.emit();
  }
  submit(){
    if(this.depositform.get("accountno").value==undefined || this.depositform.get("accountno").value==null || this.depositform.get("accountno").value==""){
      this.common.openSnackBar('Please Enter Valid Account No..',"");
      return false;
    }
    if(this.depositform.get("mobile").value==undefined || this.depositform.get("mobile").value==null || this.depositform.get("mobile").value==""){
      this.common.openSnackBar('Please Enter Valid Mobile No..',"");
      return false;
    }
    if(this.depositform.get("amount").value==undefined || this.depositform.get("amount").value==null || this.depositform.get("amount").value==""){
      this.common.openSnackBar('Please Enter Valid Amount..',"");
      return false;
    }
    let data:any={"mobile":this.depositform.get("mobile").value,"accountno":this.depositform.get("accountno").value,"amount":this.depositform.get("amount").value};
   this.spinner.show();
    this.service.user_deposit(data).subscribe((result:any)=>{
      
      if(result.error!=undefined && result.error!=""){
        this.spinner.hide();
        this.common.openSnackBar(result.error,"");

      }
      else{
        this.common.openSnackBar(result.Data,"");
        setTimeout(() => {
          /** spinner ends after 5 seconds */
          this.spinner.hide();
          this.newItemEvent.emit();
        }, 5000);
      }

    },(error:HttpErrorResponse)=>{
      this.spinner.hide();
      this.common.openSnackBar(error.message,"")
    })
    
  }
}
