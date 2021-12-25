import { Component, OnInit } from '@angular/core';
import { CrudService } from '../shared/crud.service';
import { Patient } from '../shared/patient'; 
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-patient-list',
  templateUrl: './patient-list.component.html',
  styleUrls: ['./patient-list.component.scss']
})

export class PatientListComponent implements OnInit {
  p: number = 1;
  Patient: Patient[];
  hideWhenNoPatient: boolean = false;
  noData: boolean = false;
  preLoader: boolean = true;
  query: string = '';
  searchPatients: Patient[];
  

  constructor(
    public crudApi: CrudService,
    public toastr: ToastrService
    ){ }


  ngOnInit() {
    this.dataState();
    let s = this.crudApi.GetPatientsList(); 
    s.snapshotChanges().subscribe(data => {
      this.Patient = [];
      data.forEach(item => {
        let a = item.payload.toJSON(); 
        a['$key'] = item.key;
        this.Patient.push(a as Patient);
      })
    })
  }

  dataState() {     
    this.crudApi.GetPatientsList().valueChanges().subscribe(data => {
      this.preLoader = false;
      if(data.length <= 0){
        this.hideWhenNoPatient = false;
        this.noData = true;
      } else {
        this.hideWhenNoPatient = true;
        this.noData = false;
      }
    })
  }

  deletePatient(patient) {
    if (window.confirm('Etes vous sure de supprimer cet patient ?')) { 
      this.crudApi.DeletePatient(patient.$key)
      this.toastr.success(patient.nom + ' a été supprimé(e)!');
    }
  }
  onSearch(){
    this.searchPatients = (this.query) ? this.Patient.filter(patient => patient.nom.toLowerCase().includes(this.query.toLowerCase())|| patient.cin.includes(this.query) || patient.prenom.toLowerCase().includes(this.query.toLowerCase())) : this.Patient;
  }

}