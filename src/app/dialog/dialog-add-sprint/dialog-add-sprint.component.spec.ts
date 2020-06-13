import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogAddSprintComponent } from './dialog-add-sprint.component';

describe('DialogAddUserStoryComponent', () => {
  let component: DialogAddSprintComponent;
  let fixture: ComponentFixture<DialogAddSprintComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogAddSprintComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogAddSprintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
