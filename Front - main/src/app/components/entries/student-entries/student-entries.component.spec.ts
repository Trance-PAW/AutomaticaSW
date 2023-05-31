import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentEntriesComponent } from './student-entries.component';

describe('StudentEntriesComponent', () => {
  let component: StudentEntriesComponent;
  let fixture: ComponentFixture<StudentEntriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudentEntriesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudentEntriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
