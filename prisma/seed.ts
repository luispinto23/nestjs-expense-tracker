import { PrismaClient } from '@prisma/client';
import { products } from '../products';
const client = new PrismaClient();

async function main() {
  for (const product of products) {
    await client.product.create({ data: product });
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await client.$disconnect();
  });
