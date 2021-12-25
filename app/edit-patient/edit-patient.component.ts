import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CrudService } from '../shared/crud.service';
import { ActivatedRoute, Router } from "@angular/router";
import { Location } from '@angular/common';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-edit-patient',
  templateUrl: './edit-patient.component.html',
  styleUrls: ['./edit-patient.component.scss']
})

export class EditPatientComponent implements OnInit {
  editForm: FormGroup;
  
  constructor(
    private crudApi: CrudService,
    private fb: FormBuilder,
    private location: Location,
    private actRoute: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService
  ){ }

  ngOnInit() {
    this.updatePatientData();
    const id = this.actRoute.snapshot.paramMap.get('id');
    this.crudApi.GetPatient(id).valueChanges().subscribe(data => {
      this.editForm.setValue(data)
    })
  }

   get nom() {
      return this.editForm.get('nom');
    }
    
    get prenom() {
      return this.editForm.get('prenom');
    }  
    
    get email() {
      return this.editForm.get('email');
    }
    
    get tel() {
      return this.editForm.get('tel');
    }
    get cin() {
      return this.editForm.get('cin');
    }
    get prdv() {
      return this.editForm.get('prdv');
    }
    get notes() {
      return this.editForm.get('notes');
    }
    get sexe() {
      return this.editForm.get('sexe');
    }
    get pb() {
      return this.editForm.get('pb');
    }
    get dn() {
      return this.editForm.get('dn');
    }
    


  updatePatientData() {
    this.editForm = this.fb.group({
      nom: ['', [Validators.required, Validators.minLength(2)]],
      prenom: [''],
      email: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')]],
      tel: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      cin: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      pb: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      notes: [''],
      prdv: [''],
      dn: [''],
      sexe: ['',[Validators.required, Validators.pattern('^[F-H]+$')]],
    })
  }

  goBack() {
    this.location.back();
  }

  updateForm(){
    this.crudApi.UpdatePatient(this.editForm.value);
    this.toastr.success(this.editForm.controls['nom'].value + ' a été mis à jour');
    this.router.navigate(['view-patients']);
  }

}