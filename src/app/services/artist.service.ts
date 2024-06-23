import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Artist } from '../model/Artist';
import { Subject } from 'rxjs';

const base_url = environment.base

@Injectable({
  providedIn: 'root'
})
export class ArtistService {
  private url = `${base_url}/musictool/artists`
  private icListaCambio=new Subject<Artist[]>()
  constructor(private Http: HttpClient) {}

  list() {
    return this.Http.get<Artist[]>(this.url);
  }
  insert(icR: Artist) {
    return this.Http.post(this.url, icR);
  }

  setList(icListaNueva: Artist[]) {
    this.icListaCambio.next(icListaNueva);
   }

   getList() {
    return this.icListaCambio.asObservable();
   }
   listId(id: number){
    return this.Http.get<Artist>(`${this.url}/${id}`)
   }
   update(g: Artist){
    return this.Http.put(this.url,g)
   }
   delete(id: number){
    return this.Http.delete(`${this.url}/${id}`)
   }
}
