import { Content } from "./Content";


export class Purchase {
    id:            number = 0;
    total:         number = 0;
    createdAt:     string = "";
    paymentStatus: string = "";
    customer:      null = null;
    items:         Item[] = [];
}

export class Item {
    id:                 number = 0;
    price:              number = 0;
    downloadsAvailable: number = 0;
    content:            Content = new Content();
}