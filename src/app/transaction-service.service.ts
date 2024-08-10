import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http"
import {environment} from '../environments/environment'
import { CommomDataService } from './commom-data.service';
@Injectable({
  providedIn: 'root'
})
export class TransactionServiceService  {
   be_url:any=environment.be_url;
  constructor(private httpClient:HttpClient,private common:CommomDataService) { }
  public usercreate(data:any){
    let httpHeader=new HttpHeaders({'content-type': 'application/json','Authorization':'ASDT Create_user'});
    // httpHeader.set('content-type', 'application/json');
    // httpHeader.set('Authorization','ASDT Create_user');
    console.log(httpHeader)
    return this.httpClient.post(this.be_url+"transaction/signin",data,{headers:httpHeader});
  }
  public userlogin(data:any){
    let httpHeader=new HttpHeaders({'content-type': 'application/json','Authorization':'ASDT Create_user'});
    // httpHeader.set('content-type', 'application/json');
    // httpHeader.set('Authorization','ASDT Create_user');
    console.log(httpHeader)
    return this.httpClient.post(this.be_url+"transaction/login",data,{headers:httpHeader});
  }
  public userlogout(data:any){
    let httpHeader=new HttpHeaders({'content-type': 'application/json','Authorization':'ASDF ' + this.common.userData.value['Token']});
    // httpHeader.set('content-type', 'application/json');
    // httpHeader.set('Authorization','ASDT Create_user');
    console.log(httpHeader)
    return this.httpClient.post(this.be_url+"transaction/logout",data,{headers:httpHeader});
  }
  public user_withDraw(data:any){
    let httpHeader=new HttpHeaders({'content-type': 'application/json','Authorization':'ASDF ' + this.common.userData.value['Token']});
    // httpHeader.set('content-type', 'application/json');
    // httpHeader.set('Authorization','ASDT Create_user');
    console.log(httpHeader)
    return this.httpClient.post(this.be_url+"transaction/withdraw",data,{headers:httpHeader});
  }
  public user_AccountNo_data_Get(data:any){
    let httpHeader=new HttpHeaders({'content-type': 'application/json','Authorization':'ASDF ' + this.common.userData.value['Token']});
    // httpHeader.set('content-type', 'application/json');
    // httpHeader.set('Authorization','ASDT Create_user');
    console.log(httpHeader)
    return this.httpClient.post(this.be_url+"transaction/accountnodata",data,{headers:httpHeader});
  }
  public user_amounttransferData(data:any){
    let httpHeader=new HttpHeaders({'content-type': 'application/json','Authorization':'ASDF ' + this.common.userData.value['Token']});
    // httpHeader.set('content-type', 'application/json');
    // httpHeader.set('Authorization','ASDT Create_user');
    console.log(httpHeader)
    return this.httpClient.post(this.be_url+"transaction/amounttfr",data,{headers:httpHeader});
  }
  public user_mobilenumberupdate(data:any){
    let httpHeader=new HttpHeaders({'content-type': 'application/json','Authorization':'ASDF ' + this.common.userData.value['Token']});
    // httpHeader.set('content-type', 'application/json');
    // httpHeader.set('Authorization','ASDT Create_user');
    console.log(httpHeader)
    return this.httpClient.post(this.be_url+"transaction/mobilenumberupdate",data,{headers:httpHeader});
  }
  public user_passwordchange(data:any){
    let httpHeader=new HttpHeaders({'content-type': 'application/json','Authorization':'ASDF ' + this.common.userData.value['Token']});
    // httpHeader.set('content-type', 'application/json');
    // httpHeader.set('Authorization','ASDT Create_user');
    console.log(httpHeader)
    return this.httpClient.post(this.be_url+"transaction/passwordchange",data,{headers:httpHeader});
  }
  public user_deposit(data:any){
    let httpHeader=new HttpHeaders({'content-type': 'application/json','Authorization':'ASDF ' + this.common.userData.value['Token']});
    // httpHeader.set('content-type', 'application/json');
    // httpHeader.set('Authorization','ASDT Create_user');
    console.log(httpHeader)
    return this.httpClient.post(this.be_url+"transaction/deposit",data,{headers:httpHeader});
  }
  public user_transactionHistory(page:number,pagesize:number){
    let httpHeader=new HttpHeaders({'content-type': 'application/json','Authorization':'ASDF ' + this.common.userData.value['Token']});
    // httpHeader.set('content-type', 'application/json');
    // httpHeader.set('Authorization','ASDT Create_user');
    console.log(httpHeader)
    return this.httpClient.get(this.be_url+"transaction/transactionhistory?page="+page+"&pagesize="+pagesize,{headers:httpHeader});
  }
}
