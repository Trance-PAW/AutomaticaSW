import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfessorReportsComponent } from './professor-reports.component';

describe('ProfessorReportsComponent', () => {
  let component: ProfessorReportsComponent;
  let fixture: ComponentFixture<ProfessorReportsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfessorReportsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfessorReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
