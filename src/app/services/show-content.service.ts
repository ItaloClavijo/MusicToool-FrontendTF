import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Subject } from 'rxjs';
import { Content } from '../model/Content';

const base_url = environment.base

@Injectable({
  providedIn: 'root'
})
export class ShowContentService {

  private url = `${base_url}/musictool/content`
  private icListaCambio=new Subject<Content[]>()

  constructor(private http: HttpClient) { }

  getLastContents(){
    return this.http.get<Content[]>(`${this.url}/last`)
  }

  list() {
    return this.http.get<Content[]>(this.url);
  }

  setList(icListaNueva: Content[]) {
    this.icListaCambio.next(icListaNueva);
   }

   getList() {
    return this.icListaCambio.asObservable();
   }
   listId(id: number){
    return this.http.get<Content>(`${this.url}/${id}`)
   }

}
