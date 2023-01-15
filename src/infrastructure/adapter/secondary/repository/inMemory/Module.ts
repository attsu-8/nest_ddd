import { Module } from '@nestjs/common';

import repositoryProviders from './RepositoryProviders';

@Module({
  providers: [...repositoryProviders],
  exports: [...repositoryProviders],
})
export class InMemoryRepositoryModule {}
