import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-entries',
  templateUrl: './entries.component.html',
  styleUrls: ['./entries.component.css']
})
export class EntriesComponent {

  currentRoute: any;
  courseBtn: any;
  studentBtn: any;
  courseBtnLabel: any;
  studentBtnLabel: any;
  onCourse: boolean = false;
  onCustomCourse: boolean = false;
  onStudent: boolean = false;

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.courseBtn = document.getElementById('course-btn');
    this.studentBtn = document.getElementById('student-btn');
    this.courseBtnLabel = document.getElementById('course-btn-label');
    this.studentBtnLabel = document.getElementById('student-btn-label');
  }

  // Cambia el estado de los pasos dependiedo de la ruta actual
  currentStep() {
    this.onCourse = this.router.url == '/entries/course-entries';
    this.onCustomCourse = this.router.url == '/entries/custom-course-entries';
    this.onStudent = this.router.url == '/entries/student-entries';
    if(this.onCourse || this.onCustomCourse) {
      this.enableStep(this.courseBtn, this.courseBtnLabel);
      this.disableStep(this.studentBtn, this.studentBtnLabel);
    } else if(this.onStudent) {
      this.enableStep(this.studentBtn, this.studentBtnLabel);
      this.disableStep(this.courseBtn, this.courseBtnLabel);
    }
  }

  // Cambia la apariencia de un paso como desactivado
  disableStep(button: any, label: any) {
    button.style.borderColor = '#0f4c7538';
    button.style.color = '#0f4c7538';
    button.style.borderColor = '#0f4c7538';
    label.style.color = '#0f4c7538';
  }

  // Cambia la apariencia de un paso como activado
  enableStep(button: any, label: any) {
    button.style.borderColor = '#0F4C75';
    button.style.color = '#0F4C75';
    button.style.borderColor = '#0F4C75';
    label.style.color = '#0F4C75';
  }

  // Regresa a la ruta de la selección del curso y borra del almacenamiento local el curso actual
  returnToCourse() {
    localStorage.removeItem('currentCourse');
    localStorage.removeItem('registeredStudents');
    this.router.navigateByUrl('/entries/course-entries');
  }
}
