import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { Error, Validation } from '../billing-record-form/map';


@Component({
  selector: 'app-invoice-form',
  templateUrl: './invoice-form.component.html',
  styleUrls: ['./invoice-form.component.css']
})
export class InvoiceFormComponent implements OnInit {

  invoiceForm!: NgForm;
  @ViewChild('invoiceForm') currentForm!: NgForm;

  successMessage!: string;
  selectedClient: string | null = null;
  errorMessage!: string;
  billingRecords!: any;
  companies!: any;

  constructor(
    private dataService: DataService,
    private route: ActivatedRoute,
    private location: Location
  ) { }

  ngOnInit() {
    // this.getBillingRecords();
    this.getCompanies();
  }

  getBillingRecordsById(id: any) {
    this.dataService.getRecords("billing-record/" + id)
      .subscribe(
        (results: any) => this.billingRecords = results,
        (error: any) => this.errorMessage = <any>error)

  }

  getCompanies() {
    this.dataService.getRecords("company")
      .subscribe(
        companies => this.companies = companies,
        error =>  this.errorMessage = <any>error);
  }

  saveInvoice(invoiceForm: NgForm) {
    let endpoint = "invoice/" + invoiceForm.value.client;
    delete(invoiceForm.value.client)
    this.dataService.addRecord(endpoint, invoiceForm.value)
      .subscribe(
        company => this.successMessage = "Record added successfully",
        error => this.errorMessage = <any>error);
    this.invoiceForm.reset()

  }

  ngAfterViewChecked() {
    this.formChanged();
  }

  formChanged() {
    this.invoiceForm = this.currentForm;
    this.invoiceForm.valueChanges!
      .subscribe(
        data => this.onValueChanged(data)
      );
  }

  onValueChanged(data?: any) {
    let form = this.invoiceForm.form;

    let errors: Error = this.formErrors;
    for (let field in errors) {
      // clear previous error message (if any)
      errors[field] = '';
      const control = form.get(field);

      if (control && control.dirty && !control.valid) {
        let validation: Validation = this.validationMessages;
        const messages: { [key: string]: string | undefined } =
          validation[field];
        for (const key in control.errors) {
          errors[field] += messages[key] + ' ';
        }
      }
    }
  }

  formErrors = {
    'invoiceDescription': ''
  };

  validationMessages = {
    'invoiceDescription': {
      'required': 'Description name is required.',
      'minlength': 'Description name must be at least 5 characters long.',
      'maxlength': 'Description name cannot be more than 30 characters long.'
    }
  };

}
