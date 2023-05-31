import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { EntriesComponent } from './components/entries/entries.component';
import { MainComponent } from './layout/main/main.component';
import { HeaderComponent } from './layout/main/header/header.component';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { NgbAlertModule, NgbTypeaheadModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { StudentEntriesComponent } from './components/entries/student-entries/student-entries.component';
import { CourseEntriesComponent } from './components/entries/course-entries/course-entries.component';
import { ZXingScannerModule } from '@zxing/ngx-scanner';
import { ReportsComponent } from './components/reports/reports.component';
import { StudentReportsComponent } from './components/reports/student-reports/student-reports.component';
import { ProfessorReportsComponent } from './components/reports/professor-reports/professor-reports.component';
import { CalendarModule } from 'primeng/calendar';
import { TableModule } from 'primeng/table';
import { FileUploadModule } from 'primeng/fileupload';
import { DatabaseComponent } from './components/database/database.component';
import { FileUploadComponent } from './components/database/file-upload/file-upload.component';
import { UsersComponent } from './components/database/users/users.component';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { LoginComponent } from './components/login/login.component';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { AuthGuard } from './services/auth.guard';
import { TokenInterceptor } from './services/token.interceptor';
import { RoleGuard } from './services/role.guard';
import { MessageService } from 'primeng/api';
import { CustomCourseEntriesComponent } from './components/entries/custom-course-entries/custom-course-entries.component';
import { InventoryComponent } from './components/inventory/inventory.component';

@NgModule({
  declarations: [
    AppComponent,
    EntriesComponent,
    MainComponent,
    HeaderComponent,
    StudentEntriesComponent,
    CourseEntriesComponent,
    ReportsComponent,
    StudentReportsComponent,
    ProfessorReportsComponent,
    DatabaseComponent,
    FileUploadComponent,
    UsersComponent,
    LoginComponent,
    CustomCourseEntriesComponent,
    InventoryComponent,
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    AutoCompleteModule,
    NgbTypeaheadModule,
    NgbAlertModule,
    FormsModule,
    ZXingScannerModule,
    CalendarModule,
    TableModule,
    FileUploadModule,
    OverlayPanelModule,
    DialogModule,
    DropdownModule,
    MessagesModule,
    MessageModule,
  ],
  providers: [
    AuthGuard,
    RoleGuard,
    MessageService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

