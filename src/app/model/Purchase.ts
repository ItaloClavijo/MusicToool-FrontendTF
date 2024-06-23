import { Content } from "./Content";


export class Purchase {
    idPurchase:            number = 0;
    purchaseTotal: number = 0;
    purchaseDate:     string = "";
    purchasePaymentStatus: string = "";
    customer:      null = null;
    items:         Item[] = [];
}

export class Item {
    idPurchaseContent:                 number = 0;
    purchaseContentPrice:              number = 0;
    purchaseContentAvailableDownloads: number = 0;
    contentId:            Content = new Content();
}