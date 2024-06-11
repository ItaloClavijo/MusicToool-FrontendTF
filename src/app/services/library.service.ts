import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Library } from '../model/Library';
import { Subject } from 'rxjs';

const base_url = environment.base

@Injectable({
  providedIn: 'root'
})
export class LibraryService {
  private url = `${base_url}/musictool/libraries`
  private icListaCambio=new Subject<Library[]>()
  constructor(private icHttp: HttpClient) {}

  list() {
    return this.icHttp.get<Library[]>(this.url);
  }
  insert(icR: Library) {
    return this.icHttp.post(this.url, icR);
  }

  setList(icListaNueva: Library[]) {
    this.icListaCambio.next(icListaNueva);
   }

   getList() {
    return this.icListaCambio.asObservable();
   }
   listId(id: number){
    return this.icHttp.get<Library>(`${this.url}/${id}`)
   }
   update(g: Library){
    return this.icHttp.put(this.url,g)
   }
   delete(id: number){
    return this.icHttp.delete(`${this.url}/${id}`)
   }

}
