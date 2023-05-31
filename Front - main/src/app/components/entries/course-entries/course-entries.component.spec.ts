import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseEntriesComponent } from './course-entries.component';

describe('CourseEntriesComponent', () => {
  let component: CourseEntriesComponent;
  let fixture: ComponentFixture<CourseEntriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CourseEntriesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CourseEntriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
