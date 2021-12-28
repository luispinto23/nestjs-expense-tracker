import { Controller, Get } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';

@Controller()
export class AppController {
  constructor(private prisma: PrismaService) {}

  @Get('products')
  getProducts() {
    return this.prisma.product.findMany({ where: { published: true } });
  }
}
