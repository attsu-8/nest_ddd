import { Module } from '@nestjs/common';
import { RepositoryModule } from '../repository/RepositoryModule';
import FactoryProviders from './FactoryProviders';

@Module({
  imports: [RepositoryModule.register(process.env.REPOSITORY_TYPE)],
  providers: [...FactoryProviders],
  exports: [...FactoryProviders],
})
export class FactoryModule {}
