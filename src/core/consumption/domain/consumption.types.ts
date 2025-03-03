import { DataSize } from '@core/shared/domain/model/value-object/total-volume.vo';
import { ConsumptionId } from './consumption.aggregate';

export enum ConsumptionStatus {
  RECORDED = 'recorded',
  VERIFIED = 'verified',
  DISPUTED = 'disputed',
}

export type ConsumptionConstructorProps = {
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
};

export type ConsumptionCreateCommand = {
  name: string;
  customer_id: string;
  Timestamp: Date;
  TotalVolume: DataSize;
  status: ConsumptionStatus;
  Source: string;
  ResourceType: string;
  ApiEndpoint: string;
  QueryHash: string;
};
