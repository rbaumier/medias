import { Component, ViewChild } from '@angular/core';
import { FilesService } from '../../../services/files.service';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

@Component({
  selector: 'files-list',
  templateUrl: './files.list.component.html',
  styleUrls: ['./files.list.component.scss'],
})
export class FilesListComponent {
  public files$ = new BehaviorSubject<String[]>([]);

  constructor(
    private filesService: FilesService,
    private notifications: ToastsManager
  ) {}

  ngOnInit() {
    this.filesService.findAll()
      .subscribe(
        files => this.files$.next(files),
        err => this.notifications.error(`${err.message}`, `ERREUR : ${err.code}`)
      );
  }

  onRemove(filename) {
    this.files$.next(
      this.files$.value.filter(file => file !== filename),
    );
  }

  onUpload() {
    this.ngOnInit();
  }
}
