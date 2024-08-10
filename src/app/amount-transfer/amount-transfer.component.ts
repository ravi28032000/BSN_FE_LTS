import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CommomDataService } from '../commom-data.service';
import { TransactionServiceService } from '../transaction-service.service';
import { HttpErrorResponse } from '@angular/common/http';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-amount-transfer',
  templateUrl: './amount-transfer.component.html',
  styleUrls: ['./amount-transfer.component.scss']
})
export class AmountTransferComponent implements OnInit {
  @Output() newItemEvent:any=new EventEmitter<string>();
  constructor(private fb:FormBuilder,private common:CommomDataService,private service:TransactionServiceService,private spinner:NgxSpinnerService) { }
  amounttform_from:any=FormGroup;
  amounttform_receiver:any=FormGroup;
  spinshow:boolean=false;
  acc_validate:boolean=false;
  user_id:any;
  ngOnInit(): void {
    this.amounttform_from=this.fb.group({
      "name":new FormControl("",[Validators.required]),
      "mobile":new FormControl("",[Validators.required]),
      "accountno":new FormControl("",[Validators.required]),
      "email":new FormControl("",[Validators.required])
    });
    this.amounttform_receiver=this.fb.group({
      "name":new FormControl("",[Validators.required]),
      "mobile":new FormControl("",[Validators.required]),
      "accountno":new FormControl("",[Validators.required]),
      "email":new FormControl("",[Validators.required]),
      "amount":new FormControl("",[Validators.required])
    });
    let com_data=this.common.userData.value;
    this.amounttform_from.patchValue({"name":com_data.Name,"mobile":com_data.Mobile,"accountno":com_data.Acc_No,
    "email":com_data.Email});
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
    console.log('WWW');
    this.spinner.show();

    setTimeout(() => {
      /** spinner ends after 5 seconds */
      this.spinner.hide();
      // this.newItemEvent.emit();
      this.common.ismenuenb.next(true);
    this.newItemEvent.emit();
    }, 5000);
    
  }
  acc_submit(){
    
    if(this.amounttform_receiver.get("accountno").value==undefined || this.amounttform_receiver.get("accountno").value=="" || this.amounttform_receiver.get("accountno").value==null){
      this.common.openSnackBar("Please Enter Valid Account No","");
      return false;
    }
    let data:any={"accountno":this.amounttform_receiver.get("accountno").value};
    this.spinner.show();
    this.service.user_AccountNo_data_Get(data).subscribe((res:any)=>{
      this.spinner.hide();
      if(res.error!=undefined && res.error!=""){
        this.common.openSnackBar(res.error,"");
        this.acc_validate=false;
        this.user_id=undefined;
      }
      else{
        this.acc_validate=true;
        this.user_id=res.userId;
        this.amounttform_receiver.patchValue({
          "name":res.name,
          "mobile":res.mobile,
          "email":res.email

        });
      }
    },(error:HttpErrorResponse)=>{
      this.spinner.hide();
      this.common.openSnackBar(error.status.toString(),error.statusText);
    })

  
  }
  final_submit(){
    if(this.acc_validate==false || this.user_id==undefined){
      this.common.openSnackBar("Please Verify With The Account No","");
      return false;
    }
    if(this.amounttform_receiver.get("amount").value==undefined || this.amounttform_receiver.get("amount").value=="" || this.amounttform_receiver.get("amount").value == null){
      this.common.openSnackBar("Please Enter The Valid Amount","");
      return false;
    }
    this.spinner.show();
    let data:any={"user_id":this.user_id,"amount":this.amounttform_receiver.get("amount").value};
    this.service.user_amounttransferData(data).subscribe((result:any)=>{

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

    },
    (error:HttpErrorResponse)=>{
      this.spinner.hide();
      this.common.openSnackBar(error.status.toString(),error.statusText);
    }
    )
 
  }
}
