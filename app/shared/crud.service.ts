import { Injectable } from '@angular/core';
import { Patient } from './patient';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})

export class CrudService {
 patientsRef: AngularFireList<any>;
  patientRef: AngularFireObject<any>;
  
  constructor(private db: AngularFireDatabase) { }

  AddPatient(patient: Patient) {
    this.patientsRef.push({
      nom: patient.nom,
      prenom: patient.prenom,
      email: patient.email,
      tel: patient.tel,
      cin:  patient.cin,
      prdv: patient.prdv,
      notes: patient.notes,
      sexe:  patient.sexe,
      dn: patient.dn,
      pb:  patient.pb
   
    })
  }
 // jib patient bark
 GetPatient(id: string) {
  this.patientRef = this.db.object('patients-list/' + id);
  return this.patientRef;
}

  
  GetPatientsList() {
    this.patientsRef = this.db.list('patients-list');
    return this.patientsRef;
  }  

  
  UpdatePatient(patient: Patient) {
    this.patientRef.update({
      nom: patient.nom,
      prenom: patient.prenom,
      email: patient.email,
      tel: patient.tel,
      cin:  patient.cin,
      prdv: patient.prdv,
      notes: patient.notes,
      sexe:  patient.sexe,
      dn: patient.dn,
      pb:  patient.pb
    })
  }  

  
   DeletePatient(id: string) { 
    this.patientRef = this.db.object('patients-list/'+id);
    this.patientRef.remove();
  }
  
  
}