import { Module } from '@nestjs/common';
import { TaskUseCaseModule } from 'src/core/application/task/useCase/TaskUseCase.module';
import { TaskResolver } from './resolvers/Task.resolver';

@Module({
  imports: [TaskUseCaseModule],
  providers: [TaskResolver],
})
export class TaskModule {}
