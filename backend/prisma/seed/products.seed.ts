import { Logger } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { PrimitiveUser } from 'src/contexts/authentication/domain/entities/user';
import { PrimitiveProduct, Product } from 'src/contexts/products/domain/entities/product';

const prisma  = new PrismaClient();
const logger = new Logger(`Products-seeder`)

const products:PrimitiveProduct[] = [
  {
    "id": 1,
    "name": "Laptop Gamer",
    "description": "Laptop de alto rendimiento con tarjeta gráfica dedicada.",
    "picture": "https://example.com/images/laptop-gamer.jpg",
    "stock": 15,
    "price": 1200999
  },
  {
    "id": 2,
    "name": "Mouse Inalámbrico",
    "description": "Mouse ergonómico con conectividad Bluetooth.",
    "picture": "https://example.com/images/mouse-inalambrico.jpg",
    "stock": 50,
    "price": 20999
  },
  {
    "id": 3,
    "name": "Teclado Mecánico",
    "description": "Teclado con switches mecánicos y retroiluminación RGB.",
    "picture": "https://example.com/images/teclado-mecanico.jpg",
    "stock": 30,
    "price": 89990
  },
  {
    "id": 4,
    "name": "Auriculares Over-Ear",
    "description": "Auriculares con cancelación de ruido y sonido Hi-Fi.",
    "picture": "https://example.com/images/auriculares-over-ear.jpg",
    "stock": 20,
    "price": 150490
  },
  {
    "id": 5,
    "name": "Monitor 4K",
    "description": "Monitor Ultra HD de 27 pulgadas con tecnología IPS.",
    "picture": "https://example.com/images/monitor-4k.jpg",
    "stock": 10,
    "price": 340999
  }
] 

async function main() {

  logger.log('check if Already Exist...');
  const findProduct =  await prisma.product.findFirst()
  if(findProduct){
    logger.log('seeder had been execute...');
    return 
  }

  logger.log('Seeding...');
  
  /// --------- Users ---------------
  for (let i = 0; i < products.length; i++) {
    await prisma.product.create({ data: products[i] });
  }
};

  

main()
  .catch((e) => logger.error(e))
  .finally(async () => {
  await prisma.$disconnect();
});