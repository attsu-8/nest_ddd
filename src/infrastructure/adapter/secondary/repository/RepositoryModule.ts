import { DynamicModule, Module } from '@nestjs/common';
import { Exception } from 'src/exception';
import { InMemoryRepositoryModule } from './inMemory/Module';

type RepositoryType = typeof process.env.REPOSITORY_TYPE;

@Module({})
export class RepositoryModule {
  static register(repositoryType: RepositoryType): DynamicModule {
    let repositoryModule;

    switch (repositoryType) {
      case 'in-memory':
        repositoryModule = InMemoryRepositoryModule;
        break;
      //   case 'mysql-typeorm':
      //     repositoryModule = MysqlTypeormModule;
      //     break;
      default:
        throw new Exception('Please provide a proper "REPOSITORY_TYPE"');
    }

    return {
      module: repositoryModule,
    };
  }
}
