import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditProjectComponent } from './edit-project.component';
import {ProjectService} from '../../services/project/project.service';
import {FakeProject} from '../../mocks/project.fake';
import {ActivatedRoute} from '@angular/router';
import {of} from 'rxjs';



describe('EditProjectComponent', () => {
  let component: EditProjectComponent;
  let fixture: ComponentFixture<EditProjectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditProjectComponent ],
      providers: [{provide: ProjectService, useClass: FakeProject}, {
        provide: ActivatedRoute,
        useValue: {
          params: of({
            project: 'sadasdasdasdasd',
          }),
        },
      },]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should contain project name', () => {
      expect(component.projectForm.controls.name.value).toBe('Test project');
  });

  it('should contain project description', () => {
    expect(component.projectForm.controls.description.value).toBe('Test description');
  });

  it('should be valid', () => {
    expect(component.projectForm.valid).toBeTruthy();
  });
});
