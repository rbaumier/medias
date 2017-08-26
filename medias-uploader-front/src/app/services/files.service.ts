import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { environment as config } from '../../environments/environment';
import 'rxjs/add/operator/map';

const urlParams = new URLSearchParams(window.location.search.slice(1));

['account'].forEach(param => {
  if(!urlParams.has(param)) {
    console.warn(`You didn\'t provide the ${param} parameter`);
  }
});

@Injectable()
export class FilesService {
  public account = urlParams.get('account');
  public session = 0;

  private baseUrl = `${config.api.baseUrl}/accounts/${this.account}/sessions/${this.session}`;

  constructor (private http: Http) {}

  findAll() {
    return this.http.get(`${this.baseUrl}`)
      .map(res => res.json());
  }

  getPath(filename) {
    return `${config.api.baseUrl}/${this.account}/${this.session}/${filename}`;
  }

  remove(filename) {
    return this.http.delete(`${this.baseUrl}/${filename}`);
  }
}
