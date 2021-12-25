import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service'
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

    signupForm: FormGroup;
    firebaseErrorMessage: string;

    constructor(private authService: AuthService, private router: Router, private afAuth: AngularFireAuth) {
        this.firebaseErrorMessage = '';
    }

    ngOnInit(): void {
        this.signupForm = new FormGroup({
            'displayName': new FormControl('', Validators.required),
            'email': new FormControl('', [Validators.required, Validators.email]),
            'password': new FormControl('', Validators.required)
        });
    }

    signup() {
        if (this.signupForm.invalid)                            
            return;

        this.authService.signupUser(this.signupForm.value).then((result) => {
            if (result == null)                               
                this.router.navigate(['/login']);
            else if (result.isValid == false)
                this.firebaseErrorMessage = result.message;
        }).catch(() => {

        });
    }
}
