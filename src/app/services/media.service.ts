import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { uploadResponse } from '../model/Media';
import { Observable } from 'rxjs';

const base_url = environment.base

@Injectable({
  providedIn: 'root'
})

export class MediaService {
  private url = `${environment.base}/musictool/mediastorage/upload`;
  constructor(private http: HttpClient) { }

  upload(formData : FormData):Observable<uploadResponse>{
    return this.http.post<uploadResponse>(this.url,formData);
  }
}
