import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomCourseEntriesComponent } from './custom-course-entries.component';

describe('CustomCourseEntriesComponent', () => {
  let component: CustomCourseEntriesComponent;
  let fixture: ComponentFixture<CustomCourseEntriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomCourseEntriesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomCourseEntriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
