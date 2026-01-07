export class Product {
  constructor(
    public id: string,
    public name: string,
    public description: string,
    public price: number,
    public stock: number,
    public category: string,
  ) {
    if (price <= 0) throw new Error('Price must be positive');
    if (stock < 0) throw new Error('Stock cannot be negative');
  }

  restock(amount: number) {
    if (amount <= 0) throw new Error('Restock amount must be positive');
    this.stock += amount;
  }

  sell(amount: number) {
    if (amount <= 0) throw new Error('Sell amount must be positive');
    if (this.stock - amount < 0) throw new Error('Insufficient stock');
    this.stock -= amount;
  }
}
