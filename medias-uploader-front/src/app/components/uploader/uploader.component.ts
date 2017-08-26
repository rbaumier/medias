import { Component } from '@angular/core';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { environment as config } from '../../../environments/environment';
import { FilesService } from '../../services/files.service';

@Component({
  selector: 'uploader',
  templateUrl: './uploader.component.html',
  styleUrls: ['./uploader.component.scss'],
})
export class UploaderComponent {
  public uploadUrl;

  constructor(
    private filesService: FilesService,
    private notifications: ToastsManager
  ) {}

  ngOnInit() {
    const { account, session } = this.filesService;
    this.uploadUrl = `${config.api.baseUrl}/accounts/${account}/sessions/${session}/upload`;
  }

  onUpload({ files }) {
    this.notifications.success(
      files.length > 1 ? 'Vos fichiers ont bien été envoyés' : 'Votre fichier a bien été envoyé',
      'Succès'
    );
  }

  onError({ xhr }) {
    const { message, error } = JSON.parse(xhr.response);
    this.notifications.error(message, error);
  }
}
