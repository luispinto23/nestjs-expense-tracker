import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Global() // 👈 makes PrismaService globally available
@Module({
  exports: [PrismaService], // 👈 export PrismaService for DI
  providers: [PrismaService],
})
export class PrismaModule {}
