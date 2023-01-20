import { Module } from '@nestjs/common';
import { TaskUseCaseModule } from './core/application/task/useCase/TaskUseCase.module';
import { TaskDomainServiceModule } from './core/domain/task/service/TaskDomainService.module';
import { TaskController } from './infrastructure/adapter/primary/rest/controller/Task.controller';
import { FactoryModule } from './infrastructure/adapter/secondary/factory/Factory.module';
import { RepositoryModule } from './infrastructure/adapter/secondary/repository/Repository.module';

@Module({
  imports: [
    RepositoryModule.register(process.env.REPOSITORY_TYPE),
    FactoryModule,
    TaskUseCaseModule,
    TaskDomainServiceModule,
  ],
  controllers: [TaskController],
})
export class AppModule {}
