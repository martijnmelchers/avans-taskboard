import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import {DialogAddUserComponent, DialogData} from './dialog-add-user.component';
import {ProjectService} from '../../services/project/project.service';
import {Observable, of} from 'rxjs';
import {Project} from '../../models/Project';
import {MAT_DIALOG_DATA, MatDialog} from '@angular/material/dialog';
import {MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import {DocPipe} from '../../doc.pipe';
import {FakeProject} from '../../mocks/project.fake';
import {AuthService} from '../../services/auth/auth.service';

class AuthFake {
  getUser(){
    return {uuid: 'varken'};
  }
}
describe('DialogAddUserComponent', () => {
  let component: DialogAddUserComponent;
  let fixture: ComponentFixture<DialogAddUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogAddUserComponent ],
      providers: [ {provide: ProjectService, useClass: FakeProject}, {provide: MatDialogRef, useValue: {}}, DocPipe, {provide: MAT_DIALOG_DATA, useValue: {project: {name: 'Test project', description: 'Test description', owner: null, id: 'sadasdasdasdasd', archived: false, members: ['']}}}, {provide: AuthService, useClass: AuthFake}]
    })
    .compileComponents();

    TestBed.inject(DocPipe);
    TestBed.inject(AuthService);
    TestBed.inject(MatDialogModule);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogAddUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should valid with input', () => {
    component.addUserForm.controls.email.setValue('sascha@socialbrothers.nl');
    component.addUserForm.updateValueAndValidity();
    expect(component.addUserForm.valid).toBeTruthy();
  });

  it('should valid with no input', () => {
    component.addUserForm.updateValueAndValidity();
    expect(component.addUserForm.valid).toBeFalsy();
  });
});
