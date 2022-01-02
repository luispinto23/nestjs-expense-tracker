import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { findManyCursorConnection } from '@devoxa/prisma-relay-cursor-connection';
import { Prisma } from '@prisma/client';
import { ConnectionArgs } from 'src/page/connection-args.dto';
import { ProductEntity } from './entities/product.entity';
import { Page } from 'src/page/page.dto';

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) {}
  create(createProductDto: CreateProductDto) {
    return this.prisma.product.create({ data: createProductDto });
  }

  async findPage(connectionArgs: ConnectionArgs) {
    const where: Prisma.ProductWhereInput = {
      published: true,
    };
    const productPage = await findManyCursorConnection(
      // 👇 args contain take, skip and cursor
      (args) =>
        this.prisma.product.findMany({
          ...args, // 👈 apply paging arguments
          where: where,
        }),
      () =>
        this.prisma.product.count({
          where: where,
        }),
      connectionArgs, // 👈 returns all product records
      {
        recordToEdge: (record) => ({
          node: new ProductEntity(record), // 👈 instance to transform price
        }),
      },
    );
    return new Page<ProductEntity>(productPage); // 👈 instance as this object is returned
  }

  findAll() {
    return this.prisma.product.findMany({ where: { published: true } });
  }

  findDrafts() {
    return this.prisma.product.findMany({ where: { published: false } });
  }

  findOne(id: string) {
    return this.prisma.product.findUnique({ where: { id } });
  }

  update(id: string, updateProductDto: UpdateProductDto) {
    return this.prisma.product.update({
      where: { id: id },
      data: updateProductDto,
    });
  }

  remove(id: string) {
    return this.prisma.product.delete({ where: { id } });
  }
}
