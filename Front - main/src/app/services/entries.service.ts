import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environment/environment';

@Injectable({
  providedIn: 'root'
})
export class EntriesService {

  constructor(private http: HttpClient) { }

  getCourse(id: string): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/courses/${id}`);
  }

  getCourses(): Observable<any> {
    return this.http.get<any>(environment.apiUrl + `/courses`);
  }

  getCoursesByLab(lab: string): Observable<any> {
    return this.http.get<any>(environment.apiUrl + `/courses/labs/${lab}`);
  }

  addCourse(course: any): Observable<any> {
    return this.http.post<any>(environment.apiUrl + '/courses', course);
  }

  getProfessors(): Observable<any> {
    return this.http.get<any>('assets/data/professorData.json');
  }

  registerStudentEntry(obj: any): Observable<any> {
    return this.http.post<any>(environment.apiUrl + '/entries', obj);
  }
}