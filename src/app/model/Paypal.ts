export class PaypalOrderResponse {
    paypalUrl: string = "";
}

export class PaypalCaptureResponse {
    completed: boolean = false;
    purchaseId: number = 0;
}