import { Component, OnInit } from '@angular/core';
import { CrudService } from '../shared/crud.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-add-patient',
  templateUrl: './add-patient.component.html',
  styleUrls: ['./add-patient.component.scss']
})

export class AddPatientComponent implements OnInit {
  public patientForm: FormGroup;
 
  constructor(
    public crudApi: CrudService,
    public fb: FormBuilder,
    public toastr: ToastrService
  ) { }

 
  ngOnInit() {
    this.crudApi.GetPatientsList();
    this.patForm();
  }

  patForm() {
    this.patientForm = this.fb.group({
      nom: ['', [Validators.required, Validators.minLength(2)]],
      prenom: [''],
      email: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')]],
      tel: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      cin: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      pb: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      notes: [''],
      prdv: [''],
      dn: [''],
      sexe: ['',[Validators.required, Validators.pattern('^[F-H]+$')]]

      
    }) }

    get nom() {
      return this.patientForm.get('nom');
    }
    
    get prenom() {
      return this.patientForm.get('prenom');
    }  
    
    get email() {
      return this.patientForm.get('email');
    }
    
    get tel() {
      return this.patientForm.get('tel');
    }
    get cin() {
      return this.patientForm.get('cin');
    }
    get prdv() {
      return this.patientForm.get('prdv');
    }
    get notes() {
      return this.patientForm.get('notes');
    }
    get sexe() {
      return this.patientForm.get('sexe');
    }
    get pb() {
      return this.patientForm.get('pb');
    }
    get dn() {
      return this.patientForm.get('dn');
    }
    


    ResetForm() {
      this.patientForm.reset();
    }  
    
    submitPatientData() {
      this.crudApi.AddPatient(this.patientForm.value);
      this.toastr.success(this.patientForm.controls['nom'].value + ' a été bien ajouté(e)!');
      this.ResetForm();
     };

}