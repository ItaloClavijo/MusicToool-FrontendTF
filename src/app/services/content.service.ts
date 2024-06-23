import { Injectable } from '@angular/core';
import { Content } from '../model/Content';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';

const base_url = environment.base

@Injectable({
  providedIn: 'root'
})
export class ContentService {
  private url = `${base_url}/musictool/content`
  private icListaCambio=new Subject<Content[]>()
  constructor(private Http: HttpClient) {}

  list(): Observable<Content[]> {
    return this.Http.get<Content[]>(this.url);
  }
  insert(icR: Content) {
    return this.Http.post(this.url, icR);
  }

  setList(icListaNueva: Content[]) {
    this.icListaCambio.next(icListaNueva);
   }

   getList() {
    return this.icListaCambio.asObservable();
   }
   listId(id: number){
    return this.Http.get<Content>(`${this.url}/${id}`)
   }
   update(g: Content){
    return this.Http.put(this.url,g)
   }
   delete(id: number){
    return this.Http.delete(`${this.url}/${id}`)
   }
  }