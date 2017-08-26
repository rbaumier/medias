import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { ConfirmDialogModule, ConfirmationService, FileUploadModule } from 'primeng/primeng';
import { ToastModule } from 'ng2-toastr/ng2-toastr';

import { TruncatePipe } from './pipes/truncate.pipe';
import { AppComponent } from './app.component';
import { FilesService } from './services/files.service';
import { UploaderComponent } from './components/uploader/uploader.component';
import { FilesListComponent } from './components/files/list/files.list.component';
import { FileOneComponent } from './components/files/one/file.one.component';

@NgModule({
  declarations: [
    AppComponent,
    UploaderComponent,
    FilesListComponent,
    FileOneComponent,
    TruncatePipe
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpModule,
    ToastModule.forRoot(),
    ConfirmDialogModule,
    FileUploadModule
  ],
  providers: [
    FilesService,
    ConfirmationService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
