import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Subject } from 'rxjs';
import { Users } from '../model/User';
import { HttpClient } from '@angular/common/http';

const base_url = environment.base

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private url = `${base_url}/musictool/users`
  private ListaCambio = new Subject<Users[]>()

  constructor(private httpClient:HttpClient) { }

  list(){
    return this.httpClient.get(this.url)
  }

  insert(u:Users){
    return this.httpClient.post(this.url,u)
  }

  setList(ListaNueva:Users[]){
    this.ListaCambio.next(ListaNueva)
  }

  getList(){
    return this.ListaCambio.asObservable()
  }

  listId(id:number){
    return this.httpClient.get<Users>(`${this.url}/${id}}`)
  }

  update(u:Users){
    return this.httpClient.put(this.url,u)
  }

  eliminar(id:number){
    return this.httpClient.delete(`${this.url}/${id}}`)
  }
}
