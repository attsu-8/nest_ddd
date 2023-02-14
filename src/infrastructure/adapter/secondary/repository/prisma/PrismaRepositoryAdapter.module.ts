import { Module, Provider } from '@nestjs/common';
import { BacklogItemRepositoryPort } from 'src/core/backlogItem/port/secondary/BacklogItemRepositoryPort';
import { BacklogItemPrismaRepositoryAdapter } from './BacklogItemPrismaRepositoryAdapter';
import { PrismaService } from './Prisma.service';

const repositoryProviders: Provider<BacklogItemPrismaRepositoryAdapter>[] = [
  {
    provide: BacklogItemRepositoryPort,
    useClass: BacklogItemPrismaRepositoryAdapter,
  },
];

@Module({
  //   imports: [PrismaService],
  providers: [...repositoryProviders, PrismaService],
  exports: [...repositoryProviders, PrismaService],
})
export class PrismaRepositoryAdapterModule {}
