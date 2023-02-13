import { Module } from '@nestjs/common';
import { BacklogItemDomainModule } from 'src/core/backlogItem/BacklogItemDomain.module';
import { BacklogItemResolver } from './resolvers/BacklogItem.resolver';
// import { TaskResolver } from './resolvers/Task.resolver';

@Module({
  imports: [BacklogItemDomainModule],
  providers: [BacklogItemResolver],
})
export class GraphQLAdapterModule {}
