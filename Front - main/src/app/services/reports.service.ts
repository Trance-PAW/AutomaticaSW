import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environment/environment';

@Injectable({
  providedIn: 'root'
})
export class ReportsService {

  constructor(private http: HttpClient) { }

  getLabs(): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/courses/current-labs/list`);
  }

  getStudentReport(reportParams: any): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/entries/students/reports`, { params: reportParams });
  }

  getProfessorReport(reportParams: any): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/entries/professors/reports`, { params: reportParams });
  }
}
