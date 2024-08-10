import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import {MatSnackBar} from '@angular/material/snack-bar';
@Injectable({
  providedIn: 'root'
})
export class CommomDataService {

  constructor(private _snackBar:MatSnackBar) { }
  isLogin:any=new BehaviorSubject<any>(false);
  userData:any=new BehaviorSubject<any>(null);
  ismenuenb:any=new BehaviorSubject<any>(true);
  isDate:any=new BehaviorSubject<any>(null);
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action,{  
      duration: 2000,  
   });
  }
}
