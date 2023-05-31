import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgbAlert } from '@ng-bootstrap/ng-bootstrap';
import { debounceTime, distinctUntilChanged, filter, map, Observable, OperatorFunction, Subject } from 'rxjs';
import { EntriesService } from 'src/app/services/entries.service';

// Tipado de objetos para la busqueda en el elemento dropdown
type Professor = { id: string; name: string }
type Course = { id: string; name: string; professor: Professor};

@Component({
  selector: 'app-course-entries',
  templateUrl: './course-entries.component.html',
  styleUrls: ['./course-entries.component.css', './course-entries.component.scss']
})

export class CourseEntriesComponent {

  public selectedCourse?: Course;
  private courses: Course[] = [];
  public filteredCourses: Course[] = [];
  private user: any;

  // Referencia a la alerta
  @ViewChild('selfClosingAlert', { static: false }) selfClosingAlert?: NgbAlert;
  private _message = new Subject<string>();
  errorMessage: string = '';

  constructor(private router: Router, private entriesService: EntriesService) { }

  ngOnInit(): void {
    // Tomamos el usuario actual
    this.user = localStorage.getItem('user');
    if (this.user) {
      this.user = JSON.parse(this.user);
    }
    // Obtiene los cursos/clases por medio de una petición
    this.entriesService.getCoursesByLab(this.user.user.lab).subscribe(
      (res) => {
        this.courses = res;
      },
      (err) => {
        console.log(err);
      }
    );
    // Tiempo de duración y mensaje de la alerta
		this._message.subscribe((message) => (this.errorMessage = message));
		this._message.pipe(debounceTime(4000)).subscribe(() => {
			if (this.selfClosingAlert) {
				this.selfClosingAlert.close();
			}
		});
  }

  // Filtra los cursos según lo ingresado por el usuario
  filterCourse(event: any) {
    let filtered : any[] = [];
    let query = event.query;

    for(let i = 0; i < this.courses.length; i++) {
      let course = this.courses[i];
      if (course.name.toLowerCase().includes(query.toLowerCase())) {
        filtered.push(course);
      }
    }

    this.filteredCourses = filtered;
  }
  
  // Revisión que los datos se hayan ingresado correctamente, para posteriormente guardar el objeto en el almacenamiento local
  registerClassEntry() {
    if(!this.selectedCourse) {
      this._message.next(`Porfavor seleccione una clase`);
    } else {
      localStorage.setItem('currentCourse', JSON.stringify(this.selectedCourse));
      this.router.navigateByUrl('/entries/student-entries');
    }
  }
}
