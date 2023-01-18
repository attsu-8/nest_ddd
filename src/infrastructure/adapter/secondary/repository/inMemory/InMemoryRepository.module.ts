import { Module } from '@nestjs/common';
import { TaskRepositoryPort } from 'src/core/port/secondary/task/repository/TaskRepositoryPort';

import { TaskInMemoryRepositoryAdapter } from './TaskInMemoryRepositoryAdapter';

const repositoryProviders = [
  // Repository
  {
    provide: TaskRepositoryPort,
    useClass: TaskInMemoryRepositoryAdapter,
  },
];

@Module({
  providers: [...repositoryProviders],
  exports: [...repositoryProviders],
})
export class InMemoryRepositoryModule {}
