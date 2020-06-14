import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateProjectComponent } from './create-project.component';
import {RouterTestingModule} from '@angular/router/testing';
import {ProjectService} from '../../services/project/project.service';
import {By} from '@angular/platform-browser';

describe('CreateProjectComponent', () => {
  let component: CreateProjectComponent;
  let fixture: ComponentFixture<CreateProjectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateProjectComponent ],
      imports: [RouterTestingModule],
      providers: [{provide: ProjectService, useValue: {}}]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be valid with name & desc', () => {
    component.projectForm.controls.name.setValue('Test project name');
    component.projectForm.controls.description.setValue('Test description');
    component.projectForm.updateValueAndValidity();

    expect(component.projectForm.valid).toBeTruthy();
  });

  it('should be valid with name & no desc', () => {
    component.projectForm.controls.name.setValue('Test project name');
    component.projectForm.updateValueAndValidity();
    expect(component.projectForm.valid).toBeTruthy();
  });

  it('should be invalid without name', () => {
    component.projectForm.updateValueAndValidity();
    expect(component.projectForm.valid).toBeFalsy();
  });

  it('should call the createProject function', () => {
    component.projectForm.controls.name.setValue('Test project name');
    component.projectForm.controls.description.setValue('Test description');
    component.projectForm.updateValueAndValidity();
    const el = fixture.debugElement.query(By.css('#createProjectButton')).nativeElement;
    el.click();
    fixture.detectChanges();
    expect(component.createProject).toHaveBeenCalled();
  });
});
