import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import {AuthService} from '../../services/auth/auth.service';
import {of} from 'rxjs';
import {AngularFireAuthModule} from '@angular/fire/auth';
import {AngularFireModule} from '@angular/fire';
import {environment} from '../../../environments/environment';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Overlay} from '@angular/cdk/overlay';
import {FormBuilder} from '@angular/forms';
import {RouterTestingModule} from '@angular/router/testing';
import {Router} from '@angular/router';
import {MatInputModule} from '@angular/material/input';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {imports} from '../../app.imports';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginComponent ],
    })
    .compileComponents();

  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('should be valid with input', () => {
    component.loginForm.controls.email.setValue('sascha2009@live.bl');
    component.loginForm.controls.password.setValue('test123');
    component.loginForm.updateValueAndValidity();
    expect(component.loginForm.valid).toBeTruthy();
  });


  it('should be invalid with no input', () => {
    component.loginForm.controls.email.setValue( '');
    component.loginForm.controls.password.setValue( '');
    component.loginForm.updateValueAndValidity();
    expect(component.loginForm.valid).toBeFalsy();
  });

});
