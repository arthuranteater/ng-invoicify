import { Component, HostListener, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.css']
})
export class InvoiceComponent implements OnInit {

  errorMessage!: string;
  successMessage!: string;
  invoices!: any[];
  originalInvoices!: any[];
  searchText: string = '';
  filterBy: string = '';

  constructor (private dataService: DataService) {}

  ngOnInit() { this.getInvoices(); }

  getInvoices() {
    this.dataService.getRecords("invoice")
      .subscribe(
        (results: any) => this.invoices = results,
        (error: any)  =>  this.errorMessage = <any>error);
    this.dataService.getRecords("invoice")
      .subscribe(
        (results: any) => this.originalInvoices = results,
        (error: any) => this.errorMessage = <any>error);
  }

  @HostListener('input') onInput(){
    if(this.filterBy=='description'){
      this.invoices = this.originalInvoices.filter(i=> i.invoiceDescription.toLowerCase().includes(this.searchText.toLowerCase()));
    } 
    else if(this.filterBy=='client'){
      this.invoices = this.originalInvoices.filter(i=> i.company.name.toLowerCase().includes(this.searchText.toLowerCase()));
    }
    else if(this.filterBy=='createdBy'){
      this.invoices = this.originalInvoices.filter(i=> i.createdBy.username.toLowerCase().includes(this.searchText.toLowerCase()));
    }
    else if(this.filterBy=='createdOn'){
      this.invoices = this.originalInvoices.filter(i=> i.createdOn.toLowerCase().includes(this.searchText.toLowerCase()));
    }
  }

  idSort(invoices: any) {
    invoices.sort(function(a: any,b: any) {
      return a.id - b.id;
    })
  }

  descSort(invoices: any){
    invoices.sort(function(a: any,b: any) {
      let nameA = a.invoiceDescription.toLowerCase(), nameB = b.invoiceDescription.toLowerCase();
      if(nameA < nameB) return -1;
      if(nameA > nameB) return 1;
      return 0;
    })
  }

  clientSort(invoices: any){
    invoices.sort(function(a: any,b: any) {
      let nameA = a.company.name.toLowerCase(), nameB = b.company.name.toLowerCase();
      if(nameA < nameB) return -1;
      if(nameA > nameB) return 1;
      return 0;
    })
  } 

}
