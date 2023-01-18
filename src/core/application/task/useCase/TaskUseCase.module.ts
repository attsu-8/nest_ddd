import { Module, Provider } from '@nestjs/common';
import { TaskDomainServiceModule } from 'src/core/domain/task/service/TaskDomainService.module';
import { CreateTaskUseCasePort } from 'src/core/port/primary/task/useCase/CreateTaskUseCasePort';
import { DeleteTaskUseCasePort } from 'src/core/port/primary/task/useCase/DeleteTaskUseCasePort';
import { GetAllTasksUseCasePort } from 'src/core/port/primary/task/useCase/GetAllTasksUseCasePort';
import { UpdateTaskUseCasePort } from 'src/core/port/primary/task/useCase/UpdateTaskUseCasePort';
import { FactoryModule } from 'src/infrastructure/adapter/secondary/factory/Factory.module';
import { RepositoryModule } from 'src/infrastructure/adapter/secondary/repository/Repository.module';
import { CreateTaskUseCase } from './CreateTaskUseCase';
import { DeleteTaskUseCase } from './DeleteTaskUseCase';
import { GetAllTasksUseCase } from './GetAllTasksUseCase';
import { UpdateTaskUseCase } from './UpdateTaskUseCase';

const useCaseProviders: Provider[] = [
  {
    provide: CreateTaskUseCasePort,
    useClass: CreateTaskUseCase,
  },
  {
    provide: GetAllTasksUseCasePort,
    useClass: GetAllTasksUseCase,
  },
  {
    provide: UpdateTaskUseCasePort,
    useClass: UpdateTaskUseCase,
  },
  {
    provide: DeleteTaskUseCasePort,
    useClass: DeleteTaskUseCase,
  },
];

@Module({
  imports: [
    FactoryModule,
    RepositoryModule.register(process.env.REPOSITORY_TYPE),
    TaskDomainServiceModule,
  ],
  providers: [...useCaseProviders],
  exports: [...useCaseProviders],
})
export class TaskUseCaseModule {}
