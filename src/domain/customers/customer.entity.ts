export class Customer {
  constructor(
    public id: string,
    public name: string,
    public location: 'US' | 'EU' | 'ASIA'
  ) {
    if (!name || name.trim().length === 0) {
      throw new Error('Customer name cannot be empty');
    }

    if (!['US', 'EU', 'ASIA'].includes(location)) {
      throw new Error('Invalid customer location');
    }
  }
}
