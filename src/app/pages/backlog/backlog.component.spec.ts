import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BacklogComponent } from './backlog.component';
import {UserStoryService} from '../../services/userstory/user-story.service';
import {FakeUserStory} from '../../mocks/userstory.fake';
import {ProjectService} from '../../services/project/project.service';
import {FakeProject} from '../../mocks/projectfake';
import {ActivatedRoute} from '@angular/router';
import {of} from 'rxjs';
import {By} from '@angular/platform-browser';

describe('BacklogComponent', () => {
  let component: BacklogComponent;
  let fixture: ComponentFixture<BacklogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BacklogComponent ],
      providers: [{provide: UserStoryService, useClass: FakeUserStory}, {provide: ProjectService, useClass: FakeProject},{
        provide: ActivatedRoute,
        useValue: {
          params: of({
            project: 'sadasdasdasdasd',
          }),
        },
      }]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BacklogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  describe('User stories', () => {
    it('should contain two stories', () => {
      expect(fixture.debugElement.queryAll(By.css('.user-story')).length).toBe(2);    });

    it('should contain archived story', () => {
      expect(fixture.debugElement.queryAll(By.css('#archived-story')).length).toBe(1);
    });
  });
});
