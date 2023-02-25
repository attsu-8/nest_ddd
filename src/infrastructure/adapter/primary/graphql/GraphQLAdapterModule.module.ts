import { Module } from '@nestjs/common';
import { BacklogItemDomainModule } from 'src/core/backlogItem/BacklogItemDomain.module';
import { ProductBacklogModule } from 'src/core/product/ProductBacklog.module';
import { UserDomainModule } from 'src/core/user/UserDomain.module';
import { BacklogItemResolver } from './resolvers/BacklogItem.resolver';
import { ProductBacklogResolver } from './resolvers/ProductBacklog.resolver';
import { UserResolver } from './resolvers/User.resolver';
// import { TaskResolver } from './resolvers/Task.resolver';

@Module({
  imports: [BacklogItemDomainModule, UserDomainModule, ProductBacklogModule],
  providers: [BacklogItemResolver, UserResolver, ProductBacklogResolver],
})
export class GraphQLAdapterModule {}
