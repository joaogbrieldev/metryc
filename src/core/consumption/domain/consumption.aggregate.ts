import { DataSize } from '@core/shared/domain/model/value-object/total-volume.vo';
import { Uuid } from '@core/shared/domain/model/value-object/uuid.vo';
import { AggregateRoot } from 'src/core/shared/domain/model/entity/aggregate-root';
import {
  ConsumptionConstructorProps,
  ConsumptionStatus,
} from './consumption.types';

export class ConsumptionId extends Uuid {}

export class ConsumptionAggregate extends AggregateRoot {
  consumption_id: ConsumptionId;
  name: string;
  customer_id: string;
  timestamp: Date;
  totalVolume: DataSize;
  status: ConsumptionStatus;
  source: string;
  resourceType: string;
  apiEndpoint: string;
  queryHash: string;

  constructor(props: ConsumptionConstructorProps) {
    super();
    this.consumption_id = props.consumption_id;
    this.name = props.name;
    this.customer_id = props.customer_id;
    this.timestamp = props.timestamp;
    this.totalVolume = props.totalVolume;
    this.status = props.status;
    this.source = props.source;
    this.resourceType = props.resourceType;
    this.apiEndpoint = props.apiEndpoint;
    this.queryHash = props.queryHash;
  }
}
