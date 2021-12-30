import { ApiProperty } from '@nestjs/swagger';
import { Product } from '@prisma/client';
import { Decimal } from '@prisma/client/runtime';
import { Transform } from 'class-transformer';

export class ProductEntity implements Product {
  @ApiProperty()
  id: string;
  @ApiProperty()
  createdAt: Date;
  @ApiProperty()
  updatedAt: Date;
  @ApiProperty()
  name: string;
  @ApiProperty({ required: false, nullable: true })
  description: string;
  @Transform(({ value }) => value.toNumber())
  @ApiProperty({ type: Number })
  price: Decimal;
  @ApiProperty()
  sku: string;
  @ApiProperty({ default: false })
  published: boolean;

  constructor(partial: Partial<ProductEntity>) {
    Object.assign(this, partial);
  }
}
