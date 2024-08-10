// import { Route } from '@angular/compiler/src/core';
import { Component, OnInit, VERSION } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommomDataService } from '../commom-data.service';
import { TransactionServiceService } from '../transaction-service.service';
import { environment } from 'src/environments/environment';
import { HttpErrorResponse } from '@angular/common/http';
// import { Version } from '@angular/compiler';

// import * as packageJson from 'package.json';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginformenb:boolean=true;
  userformenb:boolean=false;

  BuildDate:any=1;
  
  endp:boolean=false;
  constructor( private formB:FormBuilder,private auth_service:TransactionServiceService,private router:Router,private common:CommomDataService) { }
  loginform:any=FormGroup;
  userform:any=FormGroup;
  ngOnInit(): void {
    // const packageJson =require('./package.json');
    // console.log(packageJson.version)
    this.loginform=this.formB.group({
      "email":new FormControl("",[Validators.required,Validators.email,Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
      "password":new  FormControl("",[Validators.required])
    });
    this.userform=this.formB.group({
      "name":new FormControl("",[Validators.required,Validators.minLength(2),Validators.maxLength(50)]),
      "email":new FormControl("",[Validators.required,Validators.email,Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
      "password":new  FormControl("",[Validators.required]),
      "mobile":new FormControl("",[Validators.required,Validators.minLength(10),Validators.maxLength(13)])
    });
  }
  passenb(){
    this.endp=!this.endp;
  }
  login(){
    this.loginformenb=true;
    this.userformenb=false;
    if(this.loginform.valid==false){
      return ;
    }
    this.auth_service.userlogin(this.loginform.value).subscribe(result=>{
      if(result['error']!=undefined && result['error']!=""){
        this.common.openSnackBar(result['error'],"");
      }
      else{
        this.common.openSnackBar("Login Successful","");
      console.log(result);
      this.common.isLogin.next(true);
      this.common.userData.next(result);
      this.router.navigate(['/home'])
      }
    },(error:HttpErrorResponse)=>{
      this.common.openSnackBar("InValid Crenditail",error.status+error.statusText+"-"+error.message+"-"+error.name);

    });
    console.log(this.loginform.value);

  }
  usercreate(){
    this.loginformenb=false;
    this.userformenb=true;
  }
  usercreatenew(){
    console.log(this.userform.value);
    this.auth_service.usercreate(this.userform.value).subscribe(result=>{
      if (result['error']!=undefined && result['error']!=""){
        this.common.openSnackBar(result['error'],"");
      }
      else{
        this.common.openSnackBar(result['data'],"");
        console.log('Login Crential Created Successfully');
        this.loginformenb=true;
        this.userformenb=false;
      }
    },(error)=>{
      this.common.openSnackBar("InValid Crenditail","");

    });
    
  }
  canceldata(){
    this.userform.reset('');
    this.loginformenb=true;
    this.userformenb=false;
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
