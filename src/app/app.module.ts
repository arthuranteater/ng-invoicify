import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BillingRecordComponent } from './components/billing-record/billing-record.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './components/home/home.component';
import { FormsModule } from '@angular/forms';
import { StatusMessageComponent } from './components/status-message/status-message.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { CompanyComponent } from './components/company/company.component';
import { CompanyFormComponent } from './components/company-form/company-form.component';
import { UserFormComponent } from './components/user-form/user-form.component';
import { BillingRecordFormComponent } from './components/billing-record-form/billing-record-form.component';
import { InvoiceFormComponent } from './components/invoice-form/invoice-form.component';
import { InvoiceComponent } from './components/invoice/invoice.component';
import { ContactComponent } from './components/contact/contact.component';
import { ContactFormComponent } from './components/contact-form/contact-form.component';
import { UserComponent } from './components/user/user.component';
import { DeleteConfirmComponent } from './components/delete-confirm/delete-confirm.component';
import {MatDialogModule} from '@angular/material/dialog';

import { AuthGuardService } from './services/auth-guard.service';
import { AuthService } from './services/auth.service';
import { DataService } from './services/data.service';

@NgModule({
  declarations: [
    AppComponent,
    BillingRecordComponent,
    HomeComponent,
    StatusMessageComponent,
    NavigationComponent,
    CompanyComponent,
    CompanyFormComponent,
    UserFormComponent,
    BillingRecordFormComponent,
    InvoiceFormComponent,
    InvoiceComponent,
    ContactComponent,
    ContactFormComponent,
    UserComponent,
    DeleteConfirmComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    MatDialogModule
  ],
  entryComponents: [DeleteConfirmComponent],
  providers: [DataService, AuthGuardService, AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
