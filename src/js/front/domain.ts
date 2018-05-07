export interface Item {
  id?: number;
  title?: string;
}

export interface App {
  items: Item[];
  editor: Item;
}
