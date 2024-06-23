export class PaypalOrderResponse {
    paypalUrl: string = "";
}

export class PaypalCaptureResponse {
    completed: boolean = false;
    idPurchase: number = 0;
}