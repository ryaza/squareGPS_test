class Backend<T> {
  private storageKey: string;

  constructor(storageKey: string) {
    this.storageKey = storageKey;

    if (!localStorage.getItem(this.storageKey)) {
      localStorage.setItem(this.storageKey, JSON.stringify([]));
    }
  }

  async getAll(): Promise<T[]> {
    const data = localStorage.getItem(this.storageKey);
    return data ? JSON.parse(data) : [];
  }

  async add(item: T): Promise<void> {
    const items = await this.getAll();
    items.push(item);
    localStorage.setItem(this.storageKey, JSON.stringify(items));
  }
}

export default Backend;
