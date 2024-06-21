import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '../../environments/environment';
import {PaypalOrderResponse,PaypalCaptureResponse} from '../model/Paypal'

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {
  private http = inject(HttpClient);

  createPaypalOrder(purchaseId: number) {
    let params = new HttpParams();
    params = params.append('purchaseId', purchaseId);
    params = params.append('returnUrl', environment.paypalReturnUrl);
    params = params.append('cancelUrl', environment.paypalReturnUrl);
    return this.http.post<PaypalOrderResponse>(`${environment.base}/musictool/checkout/paypal/create`, null, { params: params });
  }

  capturePaypalOrder(orderId: string) {
    return this.http.post<PaypalCaptureResponse>(`${environment.base}/checkout/paypal/capture?orderId=${orderId}`, null);
  }

}
