import { BrowserModule } from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import { MatInputModule } from '@angular/material/input';
import {MaterialModule} from "../app/material"
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { InterceptorService } from './http-interceptor.service';
import { HomeComponent } from './home/home.component';
import { WithdrawComponent } from './withdraw/withdraw.component';
import { AmountTransferComponent } from './amount-transfer/amount-transfer.component';
import { MobileNumberUpdateComponent } from './mobile-number-update/mobile-number-update.component';
import { BalanceCheckComponent } from './balance-check/balance-check.component';
import { PinCodeChangeComponent } from './pin-code-change/pin-code-change.component';
import { TransactionHistoryComponent } from './transaction-history/transaction-history.component';
import { DepositComponent } from './deposit/deposit.component';
import { NgxSpinnerModule } from "ngx-spinner";
// import { PostCreateComponent } from './posts/post-create/post-create.component';
import { environment } from '../environments/environment';
import { isDevMode } from '@angular/core';


console.log(environment.production);
console.log(isDevMode())
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    WithdrawComponent,
    AmountTransferComponent,
    MobileNumberUpdateComponent,
    BalanceCheckComponent,
    PinCodeChangeComponent,
    TransactionHistoryComponent,
    DepositComponent,
    
    // PostCreateComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,MaterialModule,ReactiveFormsModule,HttpClientModule,
    BrowserAnimationsModule,
    NgxSpinnerModule
  ],
  providers: [
    {  
      provide: HTTP_INTERCEPTORS,  
      useClass: InterceptorService,  
      multi: true  
    }  ,

  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent]
})
export class AppModule { }