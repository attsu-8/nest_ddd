import { Module } from '@nestjs/common';
import { NewTaskCreatorPort } from 'src/core/port/secondary/task/factory/NewTaskCreatorPort';
import { RepositoryModule } from '../repository/Repository.module';
import { NewTaskCreatorAdapter } from './NewTaskCreatorAdapter';

const factoryProviders = [
  {
    provide: NewTaskCreatorPort,
    useClass: NewTaskCreatorAdapter,
  },
];

@Module({
  imports: [RepositoryModule.register(process.env.REPOSITORY_TYPE)],
  providers: [...factoryProviders],
  exports: [...factoryProviders],
})
export class FactoryModule {}
