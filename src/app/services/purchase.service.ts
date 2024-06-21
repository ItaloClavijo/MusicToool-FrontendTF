import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '../../environments/environment';
import { Purchase } from '../model/Purchase';

@Injectable({
  providedIn: 'root'
})
export class PurchaseService {
  private http = inject(HttpClient);

  create(contentsIds: number[]) {
    return this.http.post<Purchase>(`${environment.base}/musictool/purchase`, contentsIds);
  }

  get(id: number) {
    return this.http.get<Purchase>(`${environment.base}/musictool/purchase/${id}`);
  }

  downloadItem(purchaseId: number, itemId: number) {
    return this.http.get(`${environment.base}/musictool/purchase/${purchaseId}/items/${itemId}/book/file`, {
      responseType: 'blob'
    });
  }
}
