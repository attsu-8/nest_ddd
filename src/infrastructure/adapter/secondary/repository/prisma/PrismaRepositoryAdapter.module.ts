import { Module, Provider } from '@nestjs/common';
import { BacklogItemRepositoryPort } from 'src/core/backlogItem/port/secondary/BacklogItemRepositoryPort';
import { UserRepositoryPort } from 'src/core/user/port/secondary/UserRepositoryPort';
import { BacklogItemPrismaRepositoryAdapter } from './BacklogItemPrismaRepositoryAdapter';
import { PrismaService } from './Prisma.service';
import { UserPrismaRepositoryAdapter } from './UserPrismaRepositoryAdapter';

const repositoryProviders: Provider<
  BacklogItemPrismaRepositoryAdapter | UserPrismaRepositoryAdapter
>[] = [
  {
    provide: BacklogItemRepositoryPort,
    useClass: BacklogItemPrismaRepositoryAdapter,
  },
  {
    provide: UserRepositoryPort,
    useClass: UserPrismaRepositoryAdapter,
  },
];

@Module({
  //   imports: [PrismaService],
  providers: [...repositoryProviders, PrismaService],
  exports: [...repositoryProviders, PrismaService],
})
export class PrismaRepositoryAdapterModule {}
