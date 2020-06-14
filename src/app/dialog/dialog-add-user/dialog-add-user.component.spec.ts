import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import {DialogAddUserComponent, DialogData} from './dialog-add-user.component';
import {ProjectService} from '../../services/project/project.service';
import {Observable, of} from 'rxjs';
import {Project} from '../../models/Project';
import {MAT_DIALOG_DATA, MatDialog} from '@angular/material/dialog';
import {MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import {DocPipe} from '../../doc.pipe';
import {FakeProject} from '../../mocks/project.fake';




describe('DialogAddUserComponent', () => {
  let component: DialogAddUserComponent;
  let fixture: ComponentFixture<DialogAddUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogAddUserComponent ],
      providers: [ {provide: ProjectService, useClass: FakeProject}, {provide: MatDialogRef, useValue: {}}, {provide: MAT_DIALOG_DATA, useValue: {}}, DocPipe, {provide: 'DialogData', useValue: {project: {name: 'Test project', description: 'Test description', owner: null, id: 'sadasdasdasdasd', archived: false, members: ['']}}}]
    })
    .compileComponents();

    TestBed.inject(DocPipe);
    TestBed.inject(MatDialogModule);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogAddUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    component.addUserForm.reset();
    component.addUserForm.updateValueAndValidity();
  });

  it('should valid with input', () => {
    component.addUserForm.controls.email.setValue('sascha@socialbrothers.nl');
    component.addUserForm.updateValueAndValidity();
    expect(component.addUserForm.valid).toBeTruthy();
  });
});
