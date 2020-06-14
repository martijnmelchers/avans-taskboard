import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterComponent } from './register.component';
import {DocPipe} from '../../doc.pipe';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisterComponent ],
      providers: [DocPipe]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be invalid with different passwords', () => {
    component.registerForm.controls.email.setValue('test@socialbrothers.nl');
    component.registerForm.controls.password.setValue('test123');
    component.registerForm.controls.confirmPassword.setValue('test1234');
    component.registerForm.updateValueAndValidity();
    expect(component.registerForm.valid).toBeFalsy();
  });

  it('should be valid with same passwords', () => {
    component.registerForm.controls.email.setValue('test@socialbrothers.nl');
    component.registerForm.controls.password.setValue('test123');
    component.registerForm.controls.confirmPassword.setValue('test123');
    component.registerForm.updateValueAndValidity();
    expect(component.registerForm.valid).toBeTruthy();
  });
});
