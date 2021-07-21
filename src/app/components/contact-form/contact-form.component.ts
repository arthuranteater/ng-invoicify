import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { DataService } from '../../services/data.service';
import { Error, Validation } from '../billing-record-form/map';

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.css']
})
export class ContactFormComponent implements OnInit {

  contactForm!: NgForm;
  @ViewChild('contactForm') currentForm!: NgForm;

  successMessage!: string;
  errorMessage!: string;
  companies: any;
  contact: any;
  company: any;

  constructor(
    private dataService: DataService,
    private route: ActivatedRoute,
    private location: Location
  ) { }

  getRecordForEdit(){
      this.route.paramMap.subscribe((params: Params) =>
      this.dataService
        .getRecord('contact', +params['id'])
        .subscribe((contact: any) => (this.contact = contact))
    );
  }

  ngOnInit() {
    this.getCompanies();
    this.getRecordForEdit();
  }
  getCompanies(){
    this.dataService.getRecords("company")
    .subscribe(
      companies => this.companies = companies,
      error =>  this.errorMessage = <any>error);
  }


  saveContact(contactForm: NgForm){
    console.log(contactForm.value, " ---------------------- ")
    if(typeof contactForm.value.id === "number"){
      this.dataService.editRecord("contact", contactForm.value, contactForm.value.id)
          .subscribe(
            contact => this.successMessage = "Record updated successfully",
            error =>  this.errorMessage = <any>error);
    }else{
      this.dataService.addRecord("contact", contactForm.value)
          .subscribe(
            contact => this.successMessage = "Record added successfully",
            error =>  this.errorMessage = <any>error);
            this.contact = {};
            this.contactForm.reset()
    }

  }

  ngAfterViewChecked() {
    this.formChanged();
  }

  formChanged() {
    this.contactForm = this.currentForm;
    this.contactForm.valueChanges!
      .subscribe(
        data => this.onValueChanged(data)
      );
  }

  
  onValueChanged(data?: any) {
    let form = this.contactForm.form;

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
    'firstName': '',
    'lastName': '',
    'phoneNumber': '',
    'email': ''
  };

  validationMessages = {
    'firstName': {
      'required': 'First name is required.',
      'minlength': 'First name must be at least 2 characters long.',
      'maxlength': 'First name cannot be more than 30 characters long.'
    },
    'lastName':{
      'required': 'Last name is required.',
      'minlength': 'Last name must be at least 2 characters long.',
      'maxlength': 'Last name cannot be more than 30 characters long.'
    },
    'phoneNumber':{
      'required': 'Phone number is required.',
      'minlength': 'Phone number must be 10 digits long.',
      'maxlength': 'Phone number must be 10 digits long.',
      'pattern': 'Phone number must be seperated by -.'
    },
    'email':{
      'required': 'Email is required.',
      'minlength': 'Email must be at least 2 characters long.',
      'maxlength': 'Email cannot be more than 30 characters long.',
      'pattern': 'Must be a valid email.'
    }
  };

}
