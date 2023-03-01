import { Module, Provider } from '@nestjs/common';
import { BacklogItemRepositoryPort } from 'src/core/backlogItem/port/secondary/BacklogItemRepositoryPort';
import { ProductBacklogRepositoryPort } from 'src/core/productBacklog/port/secondary/ProductRepositoryPort';
import { UserRepositoryPort } from 'src/core/user/port/secondary/UserRepositoryPort';
import { BacklogItemPrismaRepositoryAdapter } from './repository/backlogItem/BacklogItemPrismaRepositoryAdapter';
import { PrismaService } from './Prisma.service';
import { ProductBacklogPrismaRepositoryAdapter } from './repository/productBacklog/ProductBacklogPrismaRepositoryAdapter';
import { UserPrismaRepositoryAdapter } from './repository/user/UserPrismaRepositoryAdapter';

const repositoryProviders: Provider<
  BacklogItemRepositoryPort | UserRepositoryPort | ProductBacklogRepositoryPort
>[] = [
  {
    provide: BacklogItemRepositoryPort,
    useClass: BacklogItemPrismaRepositoryAdapter,
  },
  {
    provide: UserRepositoryPort,
    useClass: UserPrismaRepositoryAdapter,
  },
  {
    provide: ProductBacklogRepositoryPort,
    useClass: ProductBacklogPrismaRepositoryAdapter,
  },
];

@Module({
  providers: [...repositoryProviders, PrismaService],
  exports: [...repositoryProviders],
})
export class PrismaAdapterModule {}
