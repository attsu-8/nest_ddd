import { Module, Provider } from '@nestjs/common';
import { BacklogItemRepositoryPort } from 'src/core/backlogItem/port/secondary/BacklogItemRepositoryPort';
import { BacklogItemInMemoryRepositoryAdapter } from './BacklogItemInMemoryRepositoryAdapter';

// import { TaskInMemoryRepositoryAdapter } from './TaskInMemoryRepositoryAdapter';

const repositoryProviders: Provider<BacklogItemInMemoryRepositoryAdapter>[] = [
  // Repository
  // {
  //   provide: TaskRepositoryPort,
  //   useClass: TaskInMemoryRepositoryAdapter,
  // },
  {
    provide: BacklogItemRepositoryPort,
    useClass: BacklogItemInMemoryRepositoryAdapter,
  },
];

@Module({
  providers: [...repositoryProviders],
  exports: [...repositoryProviders],
})
export class InMemoryRepositoryModule {}
