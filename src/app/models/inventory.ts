import { Thing } from "./thing";
import { Category } from "./category";
import { InventoryUser } from "./inventory-user";

export class Inventory {
  id: number;
  name: string;
  createdOn?: Date;
  users?: InventoryUser[];
  things?: Thing[];
  categories?: Category[];
}