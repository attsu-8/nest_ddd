import { Module, Provider } from '@nestjs/common';
import { NewTaskCreatorPort } from 'src/core/task/port/secondary/factory/NewTaskCreatorPort';
import { RepositoryAdapterModule } from '../repository/RepositoryAdapter.module';
import { NewTaskCreatorAdapter } from './NewTaskCreatorAdapter';

const factoryProviders: Provider<NewTaskCreatorAdapter>[] = [
  {
    provide: NewTaskCreatorPort,
    useClass: NewTaskCreatorAdapter,
  },
];

@Module({
  imports: [RepositoryAdapterModule.register(process.env.REPOSITORY_TYPE)],
  providers: [...factoryProviders],
  exports: [...factoryProviders],
})
export class FactoryAdapterModule {}
