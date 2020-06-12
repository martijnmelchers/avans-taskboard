import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogAddUserStoryComponent } from './dialog-add-userstory.component';

describe('DialogAddUserStoryComponent', () => {
  let component: DialogAddUserStoryComponent;
  let fixture: ComponentFixture<DialogAddUserStoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogAddUserStoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogAddUserStoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
