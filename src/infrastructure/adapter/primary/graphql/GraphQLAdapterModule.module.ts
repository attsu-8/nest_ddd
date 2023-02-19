import { Module } from '@nestjs/common';
import { BacklogItemDomainModule } from 'src/core/backlogItem/BacklogItemDomain.module';
import { UserDomainModule } from 'src/core/user/UserDomain.module';
import { BacklogItemResolver } from './resolvers/BacklogItem.resolver';
import { UserResolver } from './resolvers/User.resolver';
// import { TaskResolver } from './resolvers/Task.resolver';

@Module({
  imports: [BacklogItemDomainModule, UserDomainModule],
  providers: [BacklogItemResolver, UserResolver],
})
export class GraphQLAdapterModule {}
