import { Module, Provider } from '@nestjs/common';
import { BacklogItemRepositoryPort } from 'src/core/backlogItem/port/secondary/BacklogItemRepositoryPort';
import { ProductBacklogRepositoryPort } from 'src/core/product/port/secondary/ProductRepositoryPort';
import { UserRepositoryPort } from 'src/core/user/port/secondary/UserRepositoryPort';
import { BacklogItemPrismaRepositoryAdapter } from './BacklogItemPrismaRepositoryAdapter';
import { PrismaService } from '../Prisma.service';
import { ProductBacklogPrismaRepositoryAdapter } from './ProductBacklogPrismaRepositoryAdapter';
import { UserPrismaRepositoryAdapter } from './UserPrismaRepositoryAdapter';

const repositoryProviders: Provider<
  | BacklogItemPrismaRepositoryAdapter
  | UserPrismaRepositoryAdapter
  | ProductBacklogPrismaRepositoryAdapter
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
  //   imports: [PrismaService],
  providers: [...repositoryProviders, PrismaService],
  exports: [...repositoryProviders, PrismaService],
})
export class PrismaRepositoryAdapterModule {}
