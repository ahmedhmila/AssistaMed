import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule, Routes } from '@angular/router';

import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthGuard } from './services/auth.guard';

import { AddPatientComponent } from './add-patient/add-patient.component';
import { PatientListComponent } from './patient-list/patient-list.component';
import { EditPatientComponent } from './edit-patient/edit-patient.component';

import { HomeComponent } from './home/home.component';
const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'register-patient', component: AddPatientComponent },
  { path: 'view-patient', component: PatientListComponent },
  { path: 'edit-patient/:id', component: EditPatientComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'home', component: HomeComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [CommonModule,RouterModule.forRoot(routes)],
  exports: [RouterModule],
  declarations: []
})

export class AppRoutingModule { }
