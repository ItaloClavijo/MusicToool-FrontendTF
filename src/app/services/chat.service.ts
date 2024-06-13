import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Chat } from '../model/Chat';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
const base_url=environment.base
@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private url=`${base_url}/musictool/chats`
  private listaCambio=new Subject<Chat[]>()
  constructor(private httpClient:HttpClient) { }  

  list(){
    return this.httpClient.get<Chat[]>(this.url);
  }
  insert(c:Chat){
    return this.httpClient.post(this.url,c);
  }
  setList(listaNueva: Chat[]) {
    this.listaCambio.next(listaNueva);
  }
  getList() {
    return this.listaCambio.asObservable();
  }
  listId(id: number) {
    return this.httpClient.get<Chat>(`${this.url}/${id}`);
  }
  update(c:Chat) { 
    return this.httpClient.put(this.url, c);
  }
  eliminar(id: number) {
    return this.httpClient.delete(`${this.url}/${id}`);
  }
}
