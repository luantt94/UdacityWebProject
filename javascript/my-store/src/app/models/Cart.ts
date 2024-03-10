export class Cart {
  id: number;
  pId: number;
  pName: string;
  price: number;
  quantity: number;
  url: string;
  constructor() {
    this.id = 1;
    this.pId = 0;
    this.quantity = 0;
    this.price = 0;
    this.pName = '';
    this.url = '';
  }
}
