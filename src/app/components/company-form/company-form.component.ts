import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import { NgForm } from '@angular/forms';
import { DataService } from '../../services/data.service';
import { fadeInAnimation } from '../../styling/fade-in.animation';
import { Error, Validation } from '../billing-record-form/map';

@Component({
  selector: 'app-company-form',
  templateUrl: './company-form.component.html',
  styleUrls: ['./company-form.component.css'],
  animations: [fadeInAnimation],
})
export class CompanyFormComponent implements OnInit {
  companyForm!: NgForm;
  @ViewChild('companyForm') currentForm!: NgForm;

  successMessage!: string;
  errorMessage!: string;

  company!: any;

  constructor(
    private dataService: DataService,
    private route: ActivatedRoute,
    private location: Location
  ) {}

  getRecordForEdit(id: string) {
    this.dataService
      .getRecord('company', +id)
      .subscribe((company: any) => (this.company = company));
  }

  ngOnInit() {
    const companyId = this.route.snapshot.paramMap.get('id');
    companyId ? this.getRecordForEdit(companyId) : null;
  }

  saveCompany(companyForm: NgForm) {
    if (typeof companyForm.value.id === 'number') {
      this.dataService
        .editRecord('company', companyForm.value, companyForm.value.id)
        .subscribe(
          (company) => (this.successMessage = 'Record updated successfully'),
          (error) => (this.errorMessage = <any>error)
        );
    } else {
      this.dataService.addRecord('company', companyForm.value).subscribe(
        (company) => (this.successMessage = 'Record added successfully'),
        (error) => (this.errorMessage = <any>error)
      );
      this.company = {};
      this.companyForm.reset();
    }
  }

  ngAfterViewChecked() {
    this.formChanged();
  }

  formChanged() {
    this.companyForm = this.currentForm;
    this.companyForm.valueChanges!.subscribe((data) =>
      this.onValueChanged(data)
    );
  }

  onValueChanged(data?: any) {
    let form = this.companyForm.form;

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
    name: '',
  };

  validationMessages = {
    name: {
      required: 'Company name is required.',
      minlength: 'Company name must be at least 2 characters long.',
      maxlength: 'Company name cannot be more than 30 characters long.',
    },
  };
}
