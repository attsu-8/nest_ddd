import { Module, Provider } from '@nestjs/common';
import { RepositoryAdapterModule } from 'src/infrastructure/adapter/secondary/repository/RepositoryAdapter.module';
import { CreateUserUseCase } from './application/CreateUserUseCase';
import { GetUsersUseCase } from './application/GetUsersUseCase';
import { CreateUserUseCasePort } from './port/primary/CreateUserUseCasePort';
import { GetUsersUseCasePort } from './port/primary/GetUsersUseCasePort';

const useCaseProviders: Provider<CreateUserUseCase | GetUsersUseCase>[] = [
  {
    provide: CreateUserUseCasePort,
    useClass: CreateUserUseCase,
  },
  {
    provide: GetUsersUseCasePort,
    useClass: GetUsersUseCase,
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
export class UserDomainModule {}
