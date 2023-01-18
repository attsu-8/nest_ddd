import { Module } from '@nestjs/common';
import { CreateTaskUseCase } from './core/application/task/useCase/CreateTaskUseCase';
import { GetAllTasksUseCase } from './core/application/task/useCase/GetAllTasksUseCase';
import { DuplicateTaskChecker } from './core/domain/task/service/DuplicateTaskChecker';
import { ControllerModule } from './infrastructure/adapter/primary/rest/controller/ControllerModule';
import { TaskController } from './infrastructure/adapter/primary/rest/controller/Task.controller';
import { FactoryModule } from './infrastructure/adapter/secondary/factory/FactoryModule';
import { NewTaskCreatorAdapter } from './infrastructure/adapter/secondary/factory/NewTaskCreatorAdapter';
import { RepositoryModule } from './infrastructure/adapter/secondary/repository/RepositoryModule';

@Module({
  imports: [
    RepositoryModule.register(process.env.REPOSITORY_TYPE),
    FactoryModule,
    ControllerModule,
  ],
  controllers: [TaskController],
  providers: [
    NewTaskCreatorAdapter,
    DuplicateTaskChecker,
    CreateTaskUseCase,
    GetAllTasksUseCase,
  ],
})
export class AppModule {}
