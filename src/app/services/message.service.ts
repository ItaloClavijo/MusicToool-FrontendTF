import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Message } from '../model/Message';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
const base_url=environment.base
@Injectable({
  providedIn: 'root'
})
export class MessageService {
  private url=`${base_url}/musictool/message`
  private listaCambio=new Subject<Message[]>()
  constructor(private httpClient:HttpClient) { }
  list(){
    return this.httpClient.get<Message[]>(this.url);
  }
  insert(m:Message){
    return this.httpClient.post(this.url,m);
  }
  setList(listaNueva: Message[]) {
    this.listaCambio.next(listaNueva);
  }
  getList() {
    return this.listaCambio.asObservable();
  }
  listId(id: number) {
    return this.httpClient.get<Message>(`${this.url}/${id}`);
  }
  update(message:Message) { 
    return this.httpClient.put(this.url, message);
  }
  eliminar(id: number) {
    return this.httpClient.delete(`${this.url}/${id}`);
  }
}
