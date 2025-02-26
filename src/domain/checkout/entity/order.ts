import OrderItem from "./order_item";

export default class Order {
  private _id: string;
  private _customerId: string;
  private _items: OrderItem[];
  private _total: number;

  constructor(id: string, customerId: string, items: OrderItem[]) {
    this._id = id;
    this._customerId = customerId;
    this._items = items;
    this._total = this.total(); // Add this line to calculate the total
    this.validate();
  }

  get id(): any {
    return this._id;
  }

  get customerId(): string {
    return this._customerId;
  }

  get items(): OrderItem[] {
    return this._items;
  }

  validate(): boolean {
    if (this._id.length === 0) {
      throw new Error("Id is required");
    }
    if (this._customerId.length === 0) {
      throw new Error("CustomerId is required");
    }
    if (this._items.length === 0) {
      throw new Error("Items are required");
    }

    if (this._items.some((item) => item.quantity <= 0)) {
      throw new Error("Quantity must be greater than 0");
    }

    return true;
  }
  addItem(orderItem: OrderItem) {
    this._items.push(orderItem);
    this._total = this.total(); // Update the total after adding an item
  }

	removeItem(itemId: string) {
		const itemIndex = this._items.findIndex(item => item.id === itemId);
		const itemExists = itemIndex !== -1 && itemIndex >= 0;

		if (!itemExists) {
			throw new Error("Item not found");
		}

		this._items.splice(itemIndex, 1);
	}
  total(): number {
    return this._items.reduce((acc, item) => acc + item.total(), 0);
  }
}