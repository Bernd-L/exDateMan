import {Entity, model, property, hasMany} from '@loopback/repository';
import {InventoryUser} from './inventory-user.model';

@model({settings: {}})
export class User extends Entity {
  @property({
    type: 'number',
    id: true,
    required: true,
    generated: true,
  })
  id: number;

  @property({
    type: 'string',
    required: true,
  })
  name: string;

  @property({
    type: 'string',
    required: true,
  })
  email: string;

  @property({
    type: 'string',
    required: true,
  })
  saltedPwdHash: string;

  @property({
    type: 'date',
    required: true,
  })
  createdOn: string;

  @property({
    type: 'boolean',
    required: true,
    default: false,
  })
  tfaEnabled: boolean;

  @property({
    type: 'string',
  })
  tfaSecret?: string;

  @property({
    type: 'string',
  })
  tfaUrl?: string;

  @hasMany(() => InventoryUser)
  inventoryUsers: InventoryUser[];

  constructor(data?: Partial<User>) {
    super(data);
  }
}

export interface UserRelations {
  // describe navigational properties here
}

export type UserWithRelations = User & UserRelations;
