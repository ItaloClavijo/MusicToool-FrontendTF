import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Subject } from 'rxjs';
import { Plan } from '../model/Plan';
import { HttpClient } from '@angular/common/http';
const base_url = environment.base
@Injectable({
  providedIn: 'root'
})
export class PlanService {
  private url=`${base_url}/musictool/plans`
  private listaCambioth=new Subject<Plan[]>()
  constructor(private httpTh:HttpClient) { }
  list(){
    return this.httpTh.get<Plan[]>(this.url);
  }
  insertar(plTh:Plan){
    return this.httpTh.post(this.url,plTh);
  }

  setList(thlistaNueva:Plan[]){
    this.listaCambioth.next(thlistaNueva);
  }

  getList(){
    return this.listaCambioth.asObservable();
  }

  update(plans:Plan) { 
    return this.httpTh.put(this.url, plans);
  }
  eliminar(id: number) {
    return this.httpTh.delete(`${this.url}/${id}`);
  }

  listId(id: number) {
    return this.httpTh.get<Plan>(`${this.url}/${id}`);
  }
}
