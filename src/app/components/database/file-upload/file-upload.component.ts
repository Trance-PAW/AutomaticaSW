import { Component, ViewChild } from '@angular/core';
import { NgbAlert } from '@ng-bootstrap/ng-bootstrap';
import { debounceTime, finalize, Subject } from 'rxjs';
import { DatabaseService } from 'src/app/services/database.service';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css', './file-upload.component.scss']
})
export class FileUploadComponent {

  // Atributos en relación al archivo cargado
  file: any;
  uploadedFile: any;
  workbook: any;
  binaryData: any;

  studentsSheetName: String = 'Alumnos';
  schedulesSheetName: String = 'Horarios';

  @ViewChild('selfClosingAlert', { static: false }) selfClosingAlert?: NgbAlert;
  private _message = new Subject<string>();
  message: string = '';
  messageType: string = '';

  constructor(private databaseService: DatabaseService) { }

  ngOnInit(): void {
    // Tiempo de duración y mensaje de la alerta
		this._message.subscribe((message) => (this.message = message));
		this._message.pipe(debounceTime(4000)).subscribe(() => {
			if (this.selfClosingAlert) {
				this.selfClosingAlert.close();
			}
		});
  }

  // Al seleccionar un archivo se llama la función
  getUploadedFile(event: any) {
    // Tomamos los valores del archivo para mostrar su información al usuario
    this.file = event.files[0];
  }

  // Al presionar el botón para subir el archivo se llama la función
  onUpload(fileUpload: any) {
    const fileReader = new FileReader();
    this.uploadedFile = this.file;
    fileReader.readAsBinaryString(this.uploadedFile);

    fileReader.onload = (event: any) => {
      this.binaryData = event.target.result;
      this.workbook = XLSX.read(this.binaryData, {type: 'binary'});

      // Por cada hoja realizamos una petición diferente
      this.workbook.SheetNames.forEach((sheet: any) => {
        const data = XLSX.utils.sheet_to_json(this.workbook.Sheets[sheet]);
        this.databaseService.uploadFile(data, sheet);
      });
    };
    fileUpload.clear();
    fileUpload.uploadedFileCount = 0;
  }
}
