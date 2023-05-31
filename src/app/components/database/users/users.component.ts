import { Component, ViewChild } from '@angular/core';
import { NgbAlert } from '@ng-bootstrap/ng-bootstrap';
import { debounceTime, Subject } from 'rxjs';
import { DatabaseService } from 'src/app/services/database.service';
import { EntriesService } from 'src/app/services/entries.service';

// Tipado de objetos para los usuarios
type User = { name: string; email: string; role: string; lab: string};

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css', './users.component.scss']
})
export class UsersComponent {

  public users: User[] = [];

  public displayNewUser: boolean = false;
  public displayEditUser: boolean = false;
  public displayEraseUser: boolean = false;

  public userName?: string;
  public email?: string;
  public password?: string;
  public confirmedPassword?: string;
  public selectedLab?: string;
  public selectedRole?: string;
  public filteredLabs: string[] = [];
  private labs: string[] = [];
  public roles: string[] = ['Admin', 'Auxiliar'];    // Roles existentes

  public selectedUserId: string = '';
  public selectedUserName: string = '';

  // Referencia a la alerta
  @ViewChild('selfClosingAlert', { static: false }) selfClosingAlert?: NgbAlert;
  private _message = new Subject<string>();
  errorMessage: string = '';

  constructor(private databaseService: DatabaseService) { }

  ngOnInit(): void {
    // Obtiene los usuarios por medio de una petición
    this.databaseService.getUsers().subscribe(
      (res) => {
        this.users = res;
      },
      (err) => {
        console.log(err);
      }
    );
    // Obtiene los laboratorios por medio de una petición
    this.databaseService.getLabs().subscribe(
      (res) => {
        res.forEach((element: any) => {
          if (element.name) {
            this.labs.push(String(element.name));
          }
        });
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

  // Filtra los laboratorios según lo ingresado por el usuario
  filterLab(event: any) {
    let filtered : any[] = [];
    let query = event.query;

    for(let i = 0; i < this.labs.length; i++) {
      let lab = this.labs[i];
      if (lab.toLowerCase().includes(query.toLowerCase())) {
        filtered.push(lab);
      }
    }

    this.filteredLabs = filtered;
  }

  showNewUser() {
    this.displayNewUser = true;
  }

  showEditUser(userId: any) {
    this.selectedUserId = userId;
    this.displayEditUser = true;
  }

  showEraseUser(userId: any, userName: any) {
    this.selectedUserId = userId;
    this.selectedUserName = userName;
    this.displayEraseUser = true;
  }

  addUser() {
    if(this.userName && this.email && this.password && this.confirmedPassword && this.selectedLab && this.selectedRole) {
      if(this.password == this.confirmedPassword) {
        const user = {
          name: this.userName,
          email: this.email,
          password: this.password,
          role: this.selectedRole,
          lab: this.selectedLab
        };
        this.databaseService.addUser(user).subscribe(
          (res) => {
            window.location.reload();
          },
          (err) => {
            this._message.next(`No se pudo crear el usuario debido a un error en el servidor`);
            console.log(err);
          }
        );
      } else {
        this._message.next(`Las contraseñas ingresadas no coinciden`);
      }
    } else {
      this._message.next(`Porfavor llene todos los campos solicitados`);
    }
  }

  editUser() {
    if(this.userName || this.password || this.selectedLab || this.selectedRole) {
      if(this.password) {
        if(this.password != this.confirmedPassword) {
          this._message.next(`Las contraseñas ingresadas no coinciden`);
          return;
        }
      }
      const user = {
        name: this.userName,
        email: this.email,
        password: this.password,
        role: this.selectedRole,
        lab: this.selectedLab
      };
      this.databaseService.updateUser(this.selectedUserId, user).subscribe(
        (res) => {
          window.location.reload();
        },
        (err) => {
          this._message.next(`No se pudo editar el usuario debido a un error en el servidor`);
          console.log(err);
        }
      );
    } else {
      this._message.next(`Porfavor ingrese por lo menos un campo`);
    }
  }

  deleteUser() {
    this.databaseService.deleteUser(this.selectedUserId).subscribe(
      (res) => {
        window.location.reload();
      },
      (err) => {
        this._message.next(`No se pudo eliminar el usuario debido a un error en el servidor`);
        console.log(err);
      }
    )
  }
}
