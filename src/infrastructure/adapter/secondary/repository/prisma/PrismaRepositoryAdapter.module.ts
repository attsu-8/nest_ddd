import { Module, Provider } from '@nestjs/common';
import { TaskRepositoryPort } from 'src/core/task/port/secondary/repository/TaskRepositoryPort';
import { PrismaService } from './Prisma.service';
import { TaskPrismaRepositoryAdapter } from './TaskPrismaRepositoryAdapter';

const repositoryProviders: Provider<TaskPrismaRepositoryAdapter>[] = [
  {
    provide: TaskRepositoryPort,
    useClass: TaskPrismaRepositoryAdapter,
  },
];

@Module({
  //   imports: [PrismaService],
  providers: [...repositoryProviders, PrismaService],
  exports: [...repositoryProviders, PrismaService],
})
export class PrismaRepositoryAdapterModule {}
