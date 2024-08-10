import { AfterViewInit, Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { CommomDataService } from '../commom-data.service';
import { TransactionServiceService } from '../transaction-service.service';
import { HttpErrorResponse } from '@angular/common/http';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-transaction-history',
  templateUrl: './transaction-history.component.html',
  styleUrls: ['./transaction-history.component.scss']
})
export class TransactionHistoryComponent implements OnInit,AfterViewInit {
  @Output() newItemEvent = new EventEmitter<string>();
  
  pinchangeform:any=FormGroup;
  enbacc:boolean=false;
  spinshow:boolean=false;
  pageIndex=1;
  PageSize:number=5;
  totalDataLength:number=0;
  displayedColumns: string[] = ['NO', 'Name', 'Type', 'Amount','TransactionDate'];
  dataSource = new MatTableDataSource<any>();

  @ViewChild(MatPaginator,{static: true}) paginator: MatPaginator;
  constructor(private common:CommomDataService,private fb:FormBuilder,private service:TransactionServiceService,
    private spinner:NgxSpinnerService) { }
  ngOnInit(): void {
   this.getdata();
  }
  getdata(){
    this.spinner.show();
    this.service.user_transactionHistory(this.pageIndex,this.PageSize).subscribe((resule:any)=>{
      this.spinshow=false;
      if(resule.error!=undefined && resule.error!=""){
        this.spinner.hide();
        this.dataSource= new MatTableDataSource<any>([]);
      }
      else{
        this.spinner.hide();
        this.dataSource= new MatTableDataSource<any>(resule.data);
        // this.dataSource.paginator = this.paginator;
        this.totalDataLength=resule.count;
        console.log(this.totalDataLength);
      }
    },(error:HttpErrorResponse)=>{
      this.spinshow=false;
      this.spinner.hide();
      this.common.openSnackBar(error.message,"");
    })
  }
  getPageDetails(event:any) {
    console.log(event);
    this.pageIndex=event.pageIndex+1;
    this.PageSize=event.pageSize;
    console.log(this.pageIndex);
    console.log(this.PageSize);
    this.getdata();
  }
  ngAfterViewInit() {
    console.log(this.paginator);
    // this.dataSource.paginator = this.paginator;
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
      this.common.ismenuenb.next(true);
    this.newItemEvent.emit();
    }, 5000);
  }
  submit(){
    this.spinshow=true;

    setTimeout(() => {
      /** spinner ends after 5 seconds */
      this.spinshow=false;
      this.newItemEvent.emit();
    }, 5000);
    
    
  }
}
