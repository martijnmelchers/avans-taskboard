import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterComponent } from './register.component';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisterComponent ]
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
    component.registerForm.setValue({email: 'test@socialbrothers.nl', password: 'test123', confirmPassword: 'test1234'});
    expect(component.registerForm.valid).toBeFalsy();
  });

  it('should be valid with same passwords', () => {
    component.registerForm.setValue({email: 'test@socialbrothers.nl', password: 'test123', confirmPassword: 'test123'});
    expect(component.registerForm.valid).toBeTruthy();
  });
});
