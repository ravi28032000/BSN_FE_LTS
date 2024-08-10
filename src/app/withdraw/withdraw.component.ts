import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommomDataService } from '../commom-data.service';
import { Output, EventEmitter } from '@angular/core';
import { TransactionServiceService } from '../transaction-service.service';
import { HttpErrorResponse } from '@angular/common/http';
import { NgxSpinnerService } from "ngx-spinner";
@Component({
  selector: 'app-withdraw',
  templateUrl: './withdraw.component.html',
  styleUrls: ['./withdraw.component.scss']
})
export class WithdrawComponent implements OnInit {
  @Output() newItemEvent = new EventEmitter<string>();
  withdrawform:any=FormGroup;
  sav_cur_val:number;
  spinshow:boolean=false;
  constructor(private fb:FormBuilder,private router:Router,private common:CommomDataService,
    private Service:TransactionServiceService,private spinner:NgxSpinnerService) { }

  ngOnInit(): void {
    this.withdrawform=this.fb.group({
      "amount":new FormControl("",[Validators.required,Validators.minLength(1)]),
      "saving":new FormControl(false),
      "current":new FormControl(false)
    });
  }
  saving_current_enb(type:string){
    if(type=='saving'){
      this.sav_cur_val=0;
    }
    else{
      this.sav_cur_val=1;
    }
  }
  cancel(){
    console.log(123);
    this.spinner.show();
    setTimeout(() => {
      this.spinner.hide();
      this.newItemEvent.emit();
    }, 5000);
    // this.spinshow=true;

    // setTimeout(() => {
      
    //   this.spinshow=false;
    //   this.newItemEvent.emit();
    // }, 5000);
   
  }
  submit(){
    if(this.withdrawform.valid){

    }
    else{
      this.common.openSnackBar("Please Enter The Valid Data","");
      return false;
    }
    if (this.sav_cur_val ==undefined  || this.sav_cur_val ==null){
      this.common.openSnackBar("Please Select  The Valid Check Box","");
      return false;
    }
    this.spinner.show();
    let Data:any={"amount":Number(this.withdrawform.get("amount").value),"acc_type":this.sav_cur_val};
    this.Service.user_withDraw(Data).subscribe((res:any)=>{
      if(res.data!=undefined && res.data!=""){
        this.common.openSnackBar(res.data,"");
        setTimeout(() => {
          /** spinner ends after 5 seconds */
          this.spinner.hide();
          this.newItemEvent.emit();
        }, 5000);
      }
      else{
        this.spinner.hide();
        this.common.openSnackBar(res.error,"");
      }
    },(error:HttpErrorResponse)=>{
      setTimeout(() => {
        /** spinner ends after 5 seconds */
        this.spinner.hide();
      }, 5000);
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
  
}
