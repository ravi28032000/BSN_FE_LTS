import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpResponse } from '@angular/common/http';
import { HttpRequest } from '@angular/common/http';
import { Observable, } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpHandler } from '@angular/common/http';
import { HttpEvent } from '@angular/common/http';
import { CommomDataService } from './commom-data.service';
import { Router } from '@angular/router';
// import { FacadeService } from '../service/facade.service';
@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor {
  token: string;
  constructor(private common: CommomDataService,private router:Router) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    return next.handle(req).pipe(
      map(res => {
        console.log(res);
         console.log("Passed through the interceptor in response");
         if (res instanceof HttpResponse){
          console.log(res.status);
          if (res.status ==200){
            return res;
          }
          else if(res.status ==500){
            return res;
          }
          else{
            this.common.isLogin.next(false);
            this.common.userData.next(null);
            this.common.openSnackBar(res.statusText,"");
            this.router.navigate(['/home']);
          }
         }
         
         
      }),
      // catchError((error: HttpErrorResponse) => {
      //    let errorMsg = '';
      //    if (error.error instanceof ErrorEvent) {
      //       console.log('This is client side error');
      //       errorMsg = `Error: ${error.error.message}`;
      //    } else {
      //       console.log('This is server side error');
      //       errorMsg = `Error Code: ${error.status},  Message: ${error.message}`;
      //    }
      //    console.log(errorMsg);
      //    return throwError(errorMsg);
      //}
      //)
);
  }
}