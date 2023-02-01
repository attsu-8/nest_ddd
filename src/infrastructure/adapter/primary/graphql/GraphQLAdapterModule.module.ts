import { Module } from '@nestjs/common';
import { TaskDomainModule } from 'src/core/task/TaskDomain.module';
import { TaskResolver } from './resolvers/Task.resolver';

@Module({
  imports: [TaskDomainModule],
  providers: [TaskResolver],
})
export class GraphQLAdapterModule {}
