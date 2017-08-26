import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { FilesService } from '../../../services/files.service';
import { ConfirmationService } from 'primeng/primeng';

@Component({
  selector: 'file-one',
  templateUrl: './file.one.component.html',
  styleUrls: ['./file.one.component.scss'],
})
export class FileOneComponent {
  @Input() file;
  @Output() onRemove = new EventEmitter<String>();

  constructor(
    private filesService: FilesService,
    private confirmationService: ConfirmationService,
    private notifications: ToastsManager
  ) {}

  ngOnInit() {}

  getPath(filename) {
    return this.filesService.getPath(filename);
  }

  remove() {
    this.confirmationService.confirm({
      message: `Voulez-vous vraiment supprimer ce fichier ?`,
      accept: () => {
        this.filesService.remove(this.file)
          .subscribe(
            () => {
              this.onRemove.emit(this.file);
              this.notifications.success('Votre fichier a été supprimé !', 'Succès');
            },
            err => this.notifications.error(`${err.message}`, `ERREUR : ${err.code}`)
          );
      }
    });
  }
}
