import { IEntityBase } from '../../contracts/entity/entity-base';

export abstract class AggregateRoot implements IEntityBase {
  id?: string;
  createdAt?: Date;
  updatedAt?: Date;

  static isEntity(value: any): boolean {
    return value instanceof AggregateRoot;
  }
}
