import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../services/auth/auth.service';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public loginForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });

  constructor(private _auth: AuthService, private _snackBar: MatSnackBar) { }

  get email() { return this.loginForm.get('email'); }
  get password() { return this.loginForm.get('password'); }

  ngOnInit(): void {
  }

  async login(data: FormData){
    try{
      await this._auth.authenticate(data);
      this._snackBar.open('Login succeeded!.', 'Close', {
        politeness: 'assertive',
      });
    }
    catch (e) {
      this._snackBar.open('Login failed, check your credentials.', 'Close', {
        politeness: 'assertive',
      });
    }
  }

}
