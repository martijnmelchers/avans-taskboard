import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, ValidationErrors, ValidatorFn, Validators} from '@angular/forms';
import {AuthService} from '../../services/auth/auth.service';
import {ErrorStateMatcher} from '@angular/material/core';
import {MatSnackBar} from '@angular/material/snack-bar';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;

  constructor(private _auth: AuthService, private fb: FormBuilder, private _snackBar: MatSnackBar) {
    this.registerForm = this.fb.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.minLength(3)]],
      confirmPassword: [null, Validators.required],
    }, {validators: this.passwordValidator});
  }



  get email() { return this.registerForm.get('email'); }
  get password() { return this.registerForm.get('password'); }
  get confirmPassword() { return this.registerForm.get('confirmPassword'); }



  ngOnInit(): void {
  }

 private passwordValidator: ValidatorFn = (group: FormGroup): ValidationErrors | null => { // here we have the 'passwords' group
    const pass = group.get('password').value;
    const confirmPass = group.get('confirmPassword').value;
    return pass === confirmPass ? null : { notSame: true };
  }
  async register(data: FormData){
    try{
      await this._auth.doRegister(data);
      this._snackBar.open("Register succes!", null, {
        duration: 2000,
      });
    }
    catch(e) {

    }
  }
}

