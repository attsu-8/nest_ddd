import { DynamicModule, Module } from '@nestjs/common';
import { Exception } from 'src/shared/exception';
import { InMemoryRepositoryModule } from './inMemory/InMemoryRepository.module';
import { PrismaRepositoryAdapterModule } from './prisma/repository/PrismaRepositoryAdapter.module';

type RepositoryType = typeof process.env.REPOSITORY_TYPE;

@Module({})
export class RepositoryAdapterModule {
  static register(repositoryType: RepositoryType): DynamicModule {
    let repositoryModule;

    switch (repositoryType) {
      case 'in-memory':
        repositoryModule = InMemoryRepositoryModule;
        break;
      case 'mysql-prisma':
        repositoryModule = PrismaRepositoryAdapterModule;
        break;
      default:
        throw new Exception('Please provide a proper "REPOSITORY_TYPE"');
    }

    return {
      module: repositoryModule,
    };
  }
}
