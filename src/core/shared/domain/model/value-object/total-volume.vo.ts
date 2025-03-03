import { ValueObject } from '../../contracts/value-objects/value-objects';

export class DataSize extends ValueObject {
  private readonly bytes: bigint;

  constructor(value: number | bigint, unit: DataUnit = DataUnit.BYTE) {
    super();
    // Converter para bytes independente da unidade fornecida
    this.bytes =
      typeof value === 'number'
        ? BigInt(Math.floor(value * this.getMultiplierForUnit(unit)))
        : value * this.getMultiplierForUnit(unit);
  }

  private getMultiplierForUnit(unit: DataUnit): bigint {
    switch (unit) {
      case DataUnit.BYTE:
        return 1n;
      case DataUnit.KILOBYTE:
        return 1024n;
      case DataUnit.MEGABYTE:
        return 1024n * 1024n;
      case DataUnit.GIGABYTE:
        return 1024n * 1024n * 1024n;
      case DataUnit.TERABYTE:
        return 1024n * 1024n * 1024n * 1024n;
      case DataUnit.PETABYTE:
        return 1024n * 1024n * 1024n * 1024n * 1024n;
      default:
        return 1n;
    }
  }

  // Retornar valor em diferentes unidades
  toBytes(): bigint {
    return this.bytes;
  }
  toKilobytes(): number {
    return Number(this.bytes / 1024n);
  }
  toMegabytes(): number {
    return Number(this.bytes / (1024n * 1024n));
  }
  toGigabytes(): number {
    return Number(this.bytes / (1024n * 1024n * 1024n));
  }
  toTerabytes(): number {
    return Number(this.bytes / (1024n * 1024n * 1024n * 1024n));
  }

  // Retornar na unidade mais apropriada
  toBestUnit(): { value: number; unit: DataUnit } {
    if (this.bytes < 1024n)
      return { value: Number(this.bytes), unit: DataUnit.BYTE };
    if (this.bytes < 1024n * 1024n)
      return { value: this.toKilobytes(), unit: DataUnit.KILOBYTE };
    if (this.bytes < 1024n * 1024n * 1024n)
      return { value: this.toMegabytes(), unit: DataUnit.MEGABYTE };
    if (this.bytes < 1024n * 1024n * 1024n * 1024n)
      return { value: this.toGigabytes(), unit: DataUnit.GIGABYTE };
    return { value: this.toTerabytes(), unit: DataUnit.TERABYTE };
  }

  // Representação formatada
  toString(): string {
    const { value, unit } = this.toBestUnit();
    return `${value.toFixed(2)} ${unit}`;
  }

  // Operações matemáticas
  add(other: DataSize): DataSize {
    return new DataSize(this.bytes + other.toBytes(), DataUnit.BYTE);
  }

  subtract(other: DataSize): DataSize {
    return new DataSize(this.bytes - other.toBytes(), DataUnit.BYTE);
  }

  multiply(factor: number): DataSize {
    return new DataSize(this.bytes * BigInt(Math.floor(factor)), DataUnit.BYTE);
  }

  // Comparações
  equals(other: DataSize): boolean {
    return this.bytes === other.toBytes();
  }

  greaterThan(other: DataSize): boolean {
    return this.bytes > other.toBytes();
  }

  lessThan(other: DataSize): boolean {
    return this.bytes < other.toBytes();
  }
}

enum DataUnit {
  BYTE = 'B',
  KILOBYTE = 'KB',
  MEGABYTE = 'MB',
  GIGABYTE = 'GB',
  TERABYTE = 'TB',
  PETABYTE = 'PB',
}
