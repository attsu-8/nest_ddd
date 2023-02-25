import { Injectable } from '@nestjs/common';
import { ProductBacklogEntity } from 'src/core/product/domain/ProductEntiry';
import { ProductBacklogRepositoryPort } from 'src/core/product/port/secondary/ProductRepositoryPort';
import { ResultSucceeded, ResultType } from '../../../../../../shared/Result';
import { PrismaService } from '../Prisma.service';

@Injectable()
export class ProductBacklogPrismaRepositoryAdapter
  implements ProductBacklogRepositoryPort
{
  constructor(private prisma: PrismaService) {}
  async findAll(): Promise<ResultType<ProductBacklogEntity[], Error>> {
    const productBacklogs = await this.prisma.productBacklog.findMany({
      include: {
        backlogItems: true,
      },
    });

    if (productBacklogs.length === 0) {
      return new ResultSucceeded([]);
    }

    const productBacklogEntities = productBacklogs.map((productBacklog) => {
      const productBacklogEntity = ProductBacklogEntity.create({
        id: productBacklog.id,
        name: productBacklog.name,
        description: productBacklog.description,
        productOwnerId: productBacklog.productOwnerId,
      }).unwrap();

      return productBacklogEntity;
    });

    return new ResultSucceeded(productBacklogEntities);
  }

  async store(
    productBacklogEntity: ProductBacklogEntity,
  ): Promise<ResultType<string, Error>> {
    const productBacklog = await this.prisma.productBacklog.findUnique({
      where: {
        id: productBacklogEntity.id,
      },
    });

    if (!productBacklog) {
      const createResult = await this.prisma.productBacklog.create({
        data: {
          id: productBacklogEntity.id,
          name: productBacklogEntity.name,
          productOwnerId: productBacklogEntity.productOwnerId,
          description: productBacklogEntity.description,
        },
      });

      return new ResultSucceeded(createResult.id);
    }

    const updateResult = await this.prisma.productBacklog.update({
      where: { id: productBacklog.id },
      data: {
        name: productBacklogEntity.name,
        productOwnerId: productBacklogEntity.productOwnerId,
        description: productBacklogEntity.description,
      },
    });

    return new ResultSucceeded(updateResult.id);
  }
}
