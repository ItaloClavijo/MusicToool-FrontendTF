import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Roles } from '../model/Role';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

const base_url = environment.base

@Injectable({
  providedIn: 'root'
})
export class RoleService {
  private url = `${base_url}/musictool/users`
  private ListaCambio = new Subject<Roles[]>()

  constructor(private httpClient:HttpClient) { }

  list(){
    return this.httpClient.get(this.url)
  }

  insert(r:Roles){
    return this.httpClient.post(this.url,r)
  }

  setList(ListaNueva:Roles[]){
    this.ListaCambio.next(ListaNueva)
  }

  getList(){
    return this.ListaCambio.asObservable()
  }

  listId(id:number){
    return this.httpClient.get<Roles>(`${this.url}/${id}}`)
  }

  update(r:Roles){
    return this.httpClient.put(this.url,r)
  }

  eliminar(id:number){
    return this.httpClient.delete(`${this.url}/${id}}`)
  }
}
