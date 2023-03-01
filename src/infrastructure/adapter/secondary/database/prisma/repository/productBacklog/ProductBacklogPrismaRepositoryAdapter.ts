import { Injectable } from '@nestjs/common';
import { ProductBacklogEntity } from 'src/core/productBacklog/domain/ProductBacklogEntiry';
import { ProductBacklogRepositoryPort } from 'src/core/productBacklog/port/secondary/ProductRepositoryPort';
import {
  ResultFailed,
  ResultSucceeded,
  ResultType,
} from '../../../../../../../shared/Result';
import { PrismaService } from '../../Prisma.service';

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

  async findOneById(
    id: string,
  ): Promise<ResultType<ProductBacklogEntity, Error>> {
    const productBacklog = await this.prisma.productBacklog.findUnique({
      where: { id: id },
    });
    if (!productBacklog) {
      return new ResultFailed(Error('not found'));
    }

    const productBacklogEntity = ProductBacklogEntity.create({
      id: productBacklog.id,
      name: productBacklog.name,
      description: productBacklog.description,
      productOwnerId: productBacklog.productOwnerId,
    });

    return productBacklogEntity;
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

    console.log(productBacklogEntity);
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

  async delete(id: string): Promise<ResultType<string, Error>> {
    const deleteResult = await this.prisma.productBacklog.delete({
      where: { id: id },
    });

    return new ResultSucceeded(deleteResult.id);
  }
}
