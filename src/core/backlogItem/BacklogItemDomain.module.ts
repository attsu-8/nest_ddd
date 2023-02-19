import { Module, Provider } from '@nestjs/common';
import { RepositoryAdapterModule } from 'src/infrastructure/adapter/secondary/repository/RepositoryAdapter.module';
import { CreateBacklogItemUseCase } from './application/CreateBacklogItemUseCase';
import { GetBacklogItemsUseCase } from './application/GetBacklogItemsUseCase';
import { CreateBacklogItemUseCasePort } from './port/primary/CreateBacklogItemUseCasePort';
import { GetBacklogItemsUseCasePort } from './port/primary/GetBacklogItemsUseCasePort';

const useCaseProviders: Provider<
  CreateBacklogItemUseCasePort | GetBacklogItemsUseCase
>[] = [
  {
    provide: CreateBacklogItemUseCasePort,
    useClass: CreateBacklogItemUseCase,
  },
  {
    provide: GetBacklogItemsUseCasePort,
    useClass: GetBacklogItemsUseCase,
  },
  // {
  //   provide: UpdateTaskUseCasePort,
  //   useClass: UpdateTaskUseCase,
  // },
  // {
  //   provide: DeleteTaskUseCasePort,
  //   useClass: DeleteTaskUseCase,
  // },
];

@Module({
  imports: [RepositoryAdapterModule.register(process.env.REPOSITORY_TYPE)],
  providers: [...useCaseProviders],
  exports: [...useCaseProviders],
})
export class BacklogItemDomainModule {}
