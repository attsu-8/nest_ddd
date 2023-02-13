import { Module, Provider } from '@nestjs/common';
import { RepositoryAdapterModule } from 'src/infrastructure/adapter/secondary/repository/RepositoryAdapter.module';
import { CreateBacklogItemUseCase } from './application/CreateBacklogItemUseCase';
import { CreateBacklogItemUseCasePort } from './port/primary/CreateBacklogItemUseCasePort';

const useCaseProviders: Provider<CreateBacklogItemUseCasePort>[] = [
  {
    provide: CreateBacklogItemUseCasePort,
    useClass: CreateBacklogItemUseCase,
  },
  // {
  //   provide: GetAllTasksUseCasePort,
  //   useClass: GetAllTasksUseCase,
  // },
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
