import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from './services/auth-guard.service';
import { BillingRecordComponent } from './components/billing-record/billing-record.component';
import { HomeComponent } from './components/home/home.component';
import { CompanyComponent } from './components/company/company.component';
import { CompanyFormComponent } from './components/company-form/company-form.component';
import { UserComponent } from './components/user/user.component';
import { UserFormComponent} from './components/user-form/user-form.component'
import {BillingRecordFormComponent} from './components/billing-record-form/billing-record-form.component'
import { InvoiceComponent } from './components/invoice/invoice.component';
import { InvoiceFormComponent } from './components/invoice-form/invoice-form.component';
import { ContactComponent } from './components/contact/contact.component';
import { ContactFormComponent } from './components/contact-form/contact-form.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home',  component: HomeComponent },
  { path: 'company',  component: CompanyComponent, canActivate: [AuthGuardService] },
  { path: 'company/edit/:id', component: CompanyFormComponent, canActivate: [AuthGuardService] },
  { path: 'company/add', component: CompanyFormComponent, canActivate: [AuthGuardService] },
  { path: 'user',  component: UserComponent, canActivate: [AuthGuardService] },
  { path: 'user/edit/:id', component: UserFormComponent, canActivate: [AuthGuardService] },
  { path: 'user/add', component: UserFormComponent, canActivate: [AuthGuardService] },
  { path: 'billing-record',  component: BillingRecordComponent, canActivate: [AuthGuardService] },
  { path: 'billing-record/add', component: BillingRecordFormComponent, canActivate: [AuthGuardService] },
  { path: 'invoice/add', component: InvoiceFormComponent, canActivate: [AuthGuardService] },
  { path: 'invoice', component: InvoiceComponent, canActivate: [AuthGuardService] },
  { path: 'contact', component: ContactComponent, canActivate: [AuthGuardService] },
  { path: 'contact/add', component: ContactFormComponent, canActivate: [AuthGuardService] },
  { path: 'contact/edit/:id', component: ContactFormComponent, canActivate: [AuthGuardService] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
