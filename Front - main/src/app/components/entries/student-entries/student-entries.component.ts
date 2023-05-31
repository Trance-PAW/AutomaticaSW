import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgbAlert } from '@ng-bootstrap/ng-bootstrap';
import { debounceTime, Subject } from 'rxjs';
import { EntriesService } from 'src/app/services/entries.service';

// Tipado de objeto para la busqueda de alumnos registrados
type RegisteredStudent = { studentId: string; name: string; course: string; date: String }
type AlertMessage = { message: string; type: string }

@Component({
  selector: 'app-student-entries',
  templateUrl: './student-entries.component.html',
  styleUrls: ['./student-entries.component.css', './student-entries.component.scss']
})
export class StudentEntriesComponent {

  public studentId?: string;
  public registeredStudents: Array<RegisteredStudent> = [];
  public currentCourse: any;
  private user: any;

  // Atributos relacionados con la cámara
  cameras: MediaDeviceInfo[]=[];
  myDevice!: MediaDeviceInfo;
  scannerEnabled = false;

  @ViewChild('selfClosingAlert', { static: false }) selfClosingAlert?: NgbAlert;
  private _message = new Subject<string>();
  alertMessage: AlertMessage = {
    message: '',
    type: ''
  };

  constructor(private router: Router, private entriesService: EntriesService) { }

  ngOnInit(): void {
    // Tomamos el objeto del curso actual
    this.currentCourse = localStorage.getItem('currentCourse');
    this.currentCourse = JSON.parse(this.currentCourse);
    // Almacenamos los alumnos que ya se han registrado al curso
    let registered: any = localStorage.getItem('registeredStudents');
    registered = JSON.parse(registered);
    if(registered) {
      this.registeredStudents = registered;
    }
    // Tomamos el usuario actual
    this.user = localStorage.getItem('user');
    if (this.user) {
      this.user = JSON.parse(this.user);
    }
    // Tiempo de duración y mensaje de la alerta
		this._message.subscribe((message) => (this.alertMessage.message = message));
		this._message.pipe(debounceTime(4000)).subscribe(() => {
			if (this.selfClosingAlert) {
				this.selfClosingAlert.close();
			}
		});
  }

  // Indica las camaras que se encontraron en el dispositivo
  camerasFoundHandler(cameras: MediaDeviceInfo[]){
    this.cameras = cameras;
    this.selectCamera(this.cameras[0].label);
  }

  // En el caso que se haya escaneado un codigo exitosamente, ...
  scanSuccessHandler(event: any){
    this.studentId = event.substr(1, 6);
    document.getElementById("qr-scanner")?.setAttribute("class", "border border-4 w-75 rounded border-success");
    this.registerStudentEntry();
    setTimeout(function() {
      document.getElementById("qr-scanner")?.setAttribute("class", "border rounded w-75");
    }, 1000);
  }

  // Abre la opción para seleccionar una camara
  selectCamera(cameraLabel: any){    
    this.cameras.forEach(camera=>{
      if(camera.label.includes(cameraLabel)){
        this.myDevice=camera;
        this.scannerEnabled=true;
      }
    })    
  }
  
  // Revisión que la matrícula se haya ingresado, para posteriormente guardar la matrícula en el almacenamiento local dentro de un arreglo
  registerStudentEntry() {
    if(!this.studentId) {
      this._message.next(`Porfavor ingrese la matrícula del alumno`);
      this.alertMessage.type = 'danger';
      return;
    }
    // Eliminamos los números 4400 de la matrícula escaneada
    this.studentId = this.studentId.substr(1, 6);
    let registered = false;
    this.registeredStudents.forEach((element: RegisteredStudent) => {
      if(element.studentId == this.studentId) {
        if(element.course == this.currentCourse.name) {
          registered = true;
        }
      }
    });
    if(registered) {
      this._message.next(`Este alumno ya ha sido registrado`);
      this.alertMessage.type = 'danger';
    } else {
      this.entriesService.getCourse(this.currentCourse._id).subscribe(
        (res) => {
          // Creamos el objeto de la entrada
          const entry = {
            date: new Date(),
            course: res,
            student: this.studentId,
            lab: this.user.user.lab
          }
          // Registramos la nueva entrada
          this.entriesService.registerStudentEntry(entry).subscribe(
            (res) => {
              // Revisamos si existe alumno en la base de datos con dicha matrícula
              if(res.status == 400) {
                this._message.next(`No se tiene alumno registrado con esta matrícula`);
                this.alertMessage.type = 'danger';
              } else {
                this._message.next(`Alumno registrado correctamente`);
                this.alertMessage.type = 'success';
                this.registeredStudents = [...this.registeredStudents, {
                  studentId: res.student._id,
                  name: res.student.name,
                  course: this.currentCourse.name,
                  date: new Date(res.date).toLocaleString()
                }];
                localStorage.setItem('registeredStudents', JSON.stringify(this.registeredStudents));
                this.studentId = '';
              }
            },
            (err) => {
              console.log(err);
            }
          );
        },
        (err) => {
          console.log(err);
        }
      );
    }
  }
}
