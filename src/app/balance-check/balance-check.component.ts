import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CommomDataService } from '../commom-data.service';
import { TransactionServiceService } from '../transaction-service.service';
import { HttpErrorResponse } from '@angular/common/http';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-balance-check',
  templateUrl: './balance-check.component.html',
  styleUrls: ['./balance-check.component.scss']
})
export class BalanceCheckComponent implements OnInit {
  @Output() newItemEvent = new EventEmitter<string>();
  balancecheckform:any=FormGroup;
  enbacc:boolean=false;
  spinshow:boolean=false;
  constructor(private common:CommomDataService,private fb:FormBuilder,private service:TransactionServiceService,
    private spinner:NgxSpinnerService) { }
  ngOnInit(): void {
    this.balancecheckform=this.fb.group({
      "name":new FormControl("",[Validators.required]),
      "mobilenumber":new FormControl("",[Validators.required]),
      "accountno":new FormControl("",[Validators.required]),
      "balance":new FormControl(0)
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
    
    // this.common.ismenuenb.next(true);
    // this.newItemEvent.emit();
    this.spinner.show();

    setTimeout(() => {
      /** spinner ends after 5 seconds */
      this.spinner.hide();
      this.newItemEvent.emit();
    }, 5000);
  }
  submit(){
    
    
    
    if(this.balancecheckform.get("accountno").value==undefined || this.balancecheckform.get("accountno").value=="" || this.balancecheckform.get("accountno").value==null){
      this.common.openSnackBar("Please Enter Valid Account No","");
      return false;
    }
    let data:any={"accountno":this.balancecheckform.get("accountno").value};
    this.spinner.show();
    this.service.user_AccountNo_data_Get(data).subscribe((res:any)=>{
      
      if(res.error!=undefined && res.error!=""){
        this.spinner.hide();
        this.common.openSnackBar(res.error,"");
        this.enbacc=false;
      }
      else{
        this.spinner.hide();
       this.enbacc=true;
        this.balancecheckform.patchValue({
          "name":res.name,
          "mobilenumber":res.mobile,
          "email":res.email,
          "balance":res.amount

        });
      }
    },(error:HttpErrorResponse)=>{
      this.spinner.hide();
      this.common.openSnackBar(error.status.toString(),error.statusText);
      this.enbacc=false;
    })
    // setTimeout(() => {
    //   /** spinner ends after 5 seconds */
    //   this.spinshow=false;
    //   this.newItemEvent.emit();
    // }, 5000);
  }

}
