import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommomDataService } from '../commom-data.service';
import { TransactionServiceService } from '../transaction-service.service';
import { NgxSpinnerService } from "ngx-spinner";@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  username:string="";
  mobile_num:string="";
  email:string="";
  menuenb:boolean=true;
  iswithdrawend:boolean=false;
  isamountenb:boolean=false;
  ismobileenb:boolean=false;
  isbalncecheck:boolean=false;
  ispincodeenb:boolean=false;
  istranshisferenb:boolean=false;
  isprofileupdate:boolean=false;
  spinshow:boolean=false;
  isDeposit:boolean=false;
  custome_time:number=300;
  add_time:number=1000;
  constructor(private common:CommomDataService,private service:TransactionServiceService,private router:Router,private spinner:NgxSpinnerService) { }

  ngOnInit(): void {
    let dta:any=this.common.userData.value;
    console.log(dta);
    this.username=dta['Name']+"("+dta["ID"] +")";
    this.mobile_num=dta['Mobile'];
    this.email=dta['Email'];
    this.menuenb=this.common.ismenuenb.value;
   this.showtime();
  }
  showtime(){
    setInterval(()=>{
      this.custome_time=this.custome_time-1;
      if(this.custome_time==0){
        this.common.openSnackBar("Session Timeout","");
        this.custome_time=0;
        this.add_time=0;
        this.logout();

      }
      
    },this.add_time);
  }
  logout(){
    this.service.userlogout({}).subscribe(result=>{
      if(result['error']!=undefined && result['error']!=""){
        this.common.openSnackBar(result['error'],"");
      }
      else{
        this.common.openSnackBar("Logout Successful","");
        this.common.isLogin.next(false);
        this.common.userData.next(null);
        this.router.navigate(["/login"]);
      }
    });
  }
  withdraw(){

   
    this.common.ismenuenb.next(false);
    this.iswithdrawend=true;
    this.menuenb=false;
   
  }
  amounttransfer(){
    this.common.ismenuenb.next(false);
    this.isamountenb=true;
    this.menuenb=false;
    // this.router.navigate(['withdraw']);
  }
  mobilenumberupdate(){
    this.common.ismenuenb.next(false);
    this.menuenb=false;
    this.ismobileenb=true;
  }
  balancecheck(){
    this.common.ismenuenb.next(false);
    this.menuenb=false;
    this.isbalncecheck=true;
  }
  pincodechange(){
    this.common.ismenuenb.next(false);
    this.menuenb=false;
    this.ispincodeenb=true;

  }
  transactionhistory(){
      this.common.ismenuenb.next(false);
      this.menuenb=false;
      this.istranshisferenb=true;
  }
  deposit(){
    this.common.ismenuenb.next(false);
    this.menuenb=false;
    this.isDeposit=true;
}
  addItem(){
    this.menuenb=true;
    this.iswithdrawend=false;
    this.isamountenb=false;
    this.isbalncecheck=false;
    this.ispincodeenb=false;
    this.istranshisferenb=false;
    this.isprofileupdate=false;
    this.isDeposit=false;
    this.ismobileenb=false;
  }
}
