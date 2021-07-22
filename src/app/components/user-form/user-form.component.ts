import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { Error, Validation } from '../billing-record-form/map';
import {Location} from '@angular/common';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {

  userForm!: NgForm;
  @ViewChild('userForm') currentForm!: NgForm;

  successMessage!: string;
  errorMessage!: string;

  user!: any;

  constructor(
    private dataService: DataService,
    private route: ActivatedRoute,
    private location: Location
  ) {}


  getRecordForEdit(){
    this.route.paramMap.subscribe((params: Params) =>
    this.dataService
      .getRecord('user', +params['id'])
      .subscribe((user: any) => (this.user = user))
  );

  }

  ngOnInit() {
    this.route.paramMap
      .subscribe((params: Params) => {
        (+params['id']) ? this.getRecordForEdit() : null;
      });
  }

  saveUser(userForm: NgForm){
    if(userForm.value.password === ""){
      delete(userForm.value.password)
    }
    if(typeof userForm.value.id === "number"){
      this.dataService.editRecord("user", userForm.value, userForm.value.id)
          .subscribe(
            company => this.successMessage = "Record updated successfully",
            error =>  this.errorMessage = <any>error);
    }else{
      this.dataService.addRecord("user", userForm.value)
          .subscribe(
            result => this.successMessage = "Record added successfully",
            error =>  this.errorMessage = <any>error);
            this.user = {};
            this.userForm.reset()
    }

  }

  ngAfterViewChecked() {
    this.formChanged();
  }

  formChanged() {
    this.userForm = this.currentForm;
    this.userForm.valueChanges!
      .subscribe(
        data => this.onValueChanged(data)
      );
  }

  onValueChanged(data?: any) {
    let form = this.userForm.form;

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
    'username': '',
    'password': ''
  };

  validationMessages = {
    'username': {
      'required': 'Username is required.',
      'minlength': 'Username must be at least 5 characters long.',
      'maxlength': 'Company name cannot be more than 30 characters long.'
    },
    'password': {
      'pattern': 'Password must be at least one upper case letter, at least one lower case English letter, at least one digit, at least one special character, and 8 characters in length',
      'minlength': ''
    }
  };


}
